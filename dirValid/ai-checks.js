/**
 * ai-checks.js
 * Semantic consistency checks powered by DeepSeek Cloud API.
 *
 * Requires DeepSeek API key: https://platform.deepseek.com/api_keys
 * Model: deepseek-chat (or deepseek-coder as needed)
 *
 * AI checks performed:
 *  A01  Description doesn't match the concept's heading/names (semantic drift)
 *  A02  Description contains undefined terms (uses names not defined in name:: section)
 *  A03  Suggest missing name aliases the AI notices from the description
 *  A04  Detect concepts whose description is copy-pasted / suspiciously similar
 *        to another concept (potential duplicates)
 * 
 * Set environment variable:
 * 
 * bash
 * set|export DEEPSEEK_API_KEY="your-api-key-here"
 * 
 * Optional: Choose different model:
 * bash
 * export MCS_MODEL="deepseek-coder"  # or keep as "deepseek-chat"
 */

const
  aVersion = [
    'ai-checks-deepseek.js.0-1-0.2026-04-28: creation'
  ];

// DeepSeek API configuration
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const MODEL = process.env.MCS_MODEL ?? 'deepseek-chat';

// How many concepts to AI-check per run (keep low for speed, raise as needed)
const MAX_AI_CONCEPTS = 50;

// ─── helpers ──────────────────────────────────────────────────────────────────

async function ask(prompt, maxTokens = 300) {
  if (!DEEPSEEK_API_KEY) {
    throw new Error('DEEPSEEK_API_KEY environment variable is not set. Please set it to your DeepSeek API key.');
  }

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: maxTokens,
        temperature: 0.1
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`DeepSeek API error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (e) {
    throw new Error(`DeepSeek API error (check API key and network): ${e.message}`);
  }
}

function conceptSummary(sec) {
  const descParas = sec.oParaByTitle?.['description'] ?? [];
  const desc = descParas.map(p => p.sText.replace(/^description::\s*/i, '')).join('\n').slice(0, 600);
  const names = (sec.aNameObj ?? []).slice(0, 5).map(n => n.sRaw).join(', ');
  return `Heading: "${sec.sSectTitle}"\nNames: ${names || 'none'}\nDescription:\n${desc}`;
}

// ─── A01: semantic drift ───────────────────────────────────────────────────────

async function checkSemanticDrift(sec, sFileName) {
  const summary = conceptSummary(sec);
  const prompt = `You are checking a structured knowledge base called MCS.
Each concept has a heading and a description. They should be semantically consistent.

${summary}

Question: Does the description accurately describe what the heading says?
Answer ONLY with one of:
- OK
- DRIFT: <one-sentence explanation of the mismatch>

Answer:`;

  const reply = await ask(prompt, 100);
  if (reply.startsWith('DRIFT:')) {
    return {
      level: 'WARN', code: 'A01', file: sFileName, concept: sec.sSectTitle,
      message: `Semantic drift in "${sec.sSectTitle}": ${reply.replace('DRIFT:', '').trim()}`,
    };
  }
  return null;
}

// ─── A02: undefined terms ─────────────────────────────────────────────────────

async function checkUndefinedTerms(sec, sFileName) {
  const descParas = sec.oParaByTitle?.['description'] ?? [];
  const desc = descParas.map(p => p.sText.replace(/^description::\s*/i, '')).join('\n').slice(0, 800);
  const names = (sec.aNameObj ?? []).map(n => n.sRaw).join(', ');
  if (!desc.trim()) return null;

  const prompt = `You are reviewing a concept in a knowledge base that aims to be fully monosemantic.
Every technical or domain-specific term used in a description should either be defined in the 
concept's own name:: section or be a standard English word.

Concept heading: "${sec.sSectTitle}"
Defined names: ${names || 'none'}
Description:
${desc}

List any terms/names in the description that appear to be undefined jargon or knowledge-base-specific
terms that are NOT in the defined names list above.
If none, respond: NONE
If some, respond: UNDEFINED: term1, term2, term3 (max 5)

Answer:`;

  const reply = await ask(prompt, 80);
  if (reply.startsWith('UNDEFINED:')) {
    const terms = reply.replace('UNDEFINED:', '').trim();
    return {
      level: 'INFO', code: 'A02', file: sFileName, concept: sec.sSectTitle,
      message: `Possibly undefined terms in "${sec.sSectTitle}": ${terms}`,
    };
  }
  return null;
}

// ─── A03: suggest missing name aliases ───────────────────────────────────────

async function checkMissingAliases(sec, sFileName) {
  const descParas = sec.oParaByTitle?.['description'] ?? [];
  const desc = descParas.map(p => p.sText.replace(/^description::\s*/i, '')).join('\n').slice(0, 500);
  const names = (sec.aNameObj ?? []).map(n => n.sRaw).join('\n');
  if (!desc.trim() || !sec.aNames?.length) return null;

  const prompt = `You are helping manage a structured knowledge base with strict naming conventions.
McsEngl names follow patterns like: McsEngl.Domain.Subdomain, McsEngl.ConceptName, McsEngl.concept-with-hyphens

Existing names for concept "${sec.sSectTitle}":
${names}

Description: ${desc}

Suggest up to 3 ADDITIONAL McsEngl name entries that would be natural aliases 
based on the description but are NOT already in the list above.
Only suggest if you are confident. If none needed, say: NONE
Format: SUGGEST: McsEngl.Name1, McsEngl.Name2

Answer:`;

  const reply = await ask(prompt, 100);
  if (reply.startsWith('SUGGEST:')) {
    const suggestions = reply.replace('SUGGEST:', '').trim();
    return {
      level: 'INFO', code: 'A03', file: sFileName, concept: sec.sSectTitle,
      message: `Possible missing aliases for "${sec.sSectTitle}": ${suggestions}`,
    };
  }
  return null;
}

// ─── A04: duplicate description detection ────────────────────────────────────
// Compare concept descriptions in small batches to find suspicious similarity

async function checkNearDuplicates(samples) {
  const issues = [];
  const SAMPLE = 20;
  const sampled = samples.slice(0, SAMPLE);

  for (let i = 0; i < sampled.length; i++) {
    for (let j = i + 1; j < sampled.length; j++) {
      const [s1, f1] = sampled[i];
      const [s2, f2] = sampled[j];
      const descOf = s => (s.oParaByTitle?.['description'] ?? [])
        .map(p => p.sText.replace(/^description::\s*/i, '')).join(' ').slice(0, 300);
      const d1 = descOf(s1);
      const d2 = descOf(s2);
      if (!d1 || !d2) continue;

      const prompt = `Compare these two concept descriptions from a knowledge base.
Are they describing the same concept (potential duplicate)?

Concept A (${s1.sSectTitle}): ${d1}
Concept B (${s2.sSectTitle}): ${d2}

Answer ONLY:
- DIFFERENT
- SIMILAR: <one-line reason>

Answer:`;

      const reply = await ask(prompt, 60);
      if (reply.startsWith('SIMILAR:')) {
        issues.push({
          level: 'WARN', code: 'A04',
          file: f1,
          concept: s1.sSectTitle,
          message: `Possible duplicate: "${s1.sSectTitle}" (${f1}) and "${s2.sSectTitle}" (${f2}): ${reply.replace('SIMILAR:', '').trim()}`,
        });
      }
    }
  }
  return issues;
}

// ─── main export ──────────────────────────────────────────────────────────────

export async function runAiChecks(files) {
  const issues = [];

  // Validate API key early
  if (!DEEPSEEK_API_KEY) {
    console.error('\n   ❌ ERROR: DEEPSEEK_API_KEY environment variable is not set.');
    console.error('   Please set it with: export DEEPSEEK_API_KEY="your-api-key-here"');
    console.error('   Get your API key from: https://platform.deepseek.com/api_keys\n');
    return issues;
  }

  // Flatten all SectCnpt with file reference; filter to those with descriptions
  const allSections = [];
  for (const f of files) {
    for (const sec of f.aSectMcsObj) {
      allSections.push([sec, f.sFileName]);
    }
  }

  const sample = allSections
    .filter(([s]) => {
      const hasDesc = (s.oParaByTitle?.['description'] ?? []).length > 0;
      return hasDesc && s.aNames.length > 0;
    })
    .slice(0, MAX_AI_CONCEPTS);

  const total = sample.length;
  console.log(`   Checking ${total} SectCnpt (of ${allSections.length} total)`);
  console.log(`   Model: ${MODEL}  (DeepSeek Cloud API)`);
  console.log(`   API Key: ${DEEPSEEK_API_KEY ? '✓ Set' : '✗ Missing'}\n`);

  for (let i = 0; i < sample.length; i++) {
    const [sec, sFileName] = sample[i];
    process.stdout.write(`   [${String(i+1).padStart(3)}/${total}] ${sec.sSectTitle.slice(0,45).padEnd(45)} `);

    try {
      const drift = await checkSemanticDrift(sec, sFileName);
      const undef = await checkUndefinedTerms(sec, sFileName);
      const alias = await checkMissingAliases(sec, sFileName);

      const found = [drift, undef, alias].filter(Boolean);
      issues.push(...found);
      console.log(found.length > 0 ? `⚠  ${found.length} issue(s)` : '✓');
    } catch (e) {
      console.log(`✗ error: ${e.message}`);
      if (e.message.includes('DeepSeek API error')) {
        console.error('\n   ⚠  Could not reach DeepSeek API. Check your API key and network connection.');
        break;
      }
    }
  }

  if (sample.length >= 4) {
    console.log('\n   Running near-duplicate check on sample...');
    try {
      const dupes = await checkNearDuplicates(sample);
      issues.push(...dupes);
      console.log(`   Found ${dupes.length} potential duplicates`);
    } catch (e) {
      console.log(`   Skipped: ${e.message}`);
    }
  }

  return issues;
}