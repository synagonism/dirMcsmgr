/**
 * ai-checks.js
 * Semantic consistency checks powered by Ollama (local LLM).
 *
 * Requires Ollama running locally: https://ollama.com
 * Model: llama3.2 (or whatever you have — configurable below)
 *
 * AI checks performed:
 *  A01  Description doesn't match the concept's heading/names (semantic drift)
 *  A02  Description contains undefined terms (uses names not defined in name:: section)
 *  A03  Suggest missing name aliases the AI notices from the description
 *  A04  Detect concepts whose description is copy-pasted / suspiciously similar
 *        to another concept (potential duplicates)
 */

import { Ollama } from 'ollama';

const
  aVersion = [
    'ai-checks.js.0-1-0.2026-04-28: creation'
  ]


const ollama = new Ollama({ host: 'http://localhost:11434' });
const MODEL = process.env.MCS_MODEL ?? 'llama3.2';

// How many concepts to AI-check per run (keep low for speed, raise as needed)
const MAX_AI_CONCEPTS = 50;

// ─── helpers ──────────────────────────────────────────────────────────────────

async function ask(prompt, maxTokens = 300) {
  try {
    const res = await ollama.chat({
      model: MODEL,
      options: { num_predict: maxTokens, temperature: 0.1 },
      messages: [{ role: 'user', content: prompt }],
    });
    return res.message.content.trim();
  } catch (e) {
    throw new Error(`Ollama error (is it running?): ${e.message}`);
  }
}

function conceptSummary(sec) {
  const descParas = sec.oParaByTitle?.['description'] ?? [];
  const desc = descParas.map(p => p.sText.replace(/^description::\s*/i, '')).join('\n').slice(0, 600);
  const names = (sec.aNameObj ?? []).slice(0, 5).map(n => n.sRaw).join(', ');
  return `Heading: "${sec.sSectTitle}"\nNames: ${names || 'none'}\nDescription:\n${desc}`;
}

// ─── A01: semantic drift ───────────────────────────────────────────────────────

async function checkSemanticDrift(sec, fileName) {
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
      level: 'WARN', code: 'A01', file: fileName, concept: sec.sSectTitle,
      message: `Semantic drift in "${sec.sSectTitle}": ${reply.replace('DRIFT:', '').trim()}`,
    };
  }
  return null;
}

// ─── A02: undefined terms ─────────────────────────────────────────────────────

async function checkUndefinedTerms(sec, fileName) {
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
      level: 'INFO', code: 'A02', file: fileName, concept: sec.sSectTitle,
      message: `Possibly undefined terms in "${sec.sSectTitle}": ${terms}`,
    };
  }
  return null;
}

// ─── A03: suggest missing name aliases ───────────────────────────────────────

async function checkMissingAliases(sec, fileName) {
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
      level: 'INFO', code: 'A03', file: fileName, concept: sec.sSectTitle,
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

  // Flatten all SectCnpt with file reference; filter to those with descriptions
  const allSections = [];
  for (const f of files) {
    for (const sec of f.aSectMcsObj) {
      allSections.push([sec, f.fileName]);
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
  console.log(`   Model: ${MODEL}  (set MCS_MODEL env var to change)\n`);

  for (let i = 0; i < sample.length; i++) {
    const [sec, fileName] = sample[i];
    process.stdout.write(`   [${String(i+1).padStart(3)}/${total}] ${sec.sSectTitle.slice(0,45).padEnd(45)} `);

    try {
      const drift = await checkSemanticDrift(sec, fileName);
      const undef = await checkUndefinedTerms(sec, fileName);
      const alias = await checkMissingAliases(sec, fileName);

      const found = [drift, undef, alias].filter(Boolean);
      issues.push(...found);
      console.log(found.length > 0 ? `⚠  ${found.length} issue(s)` : '✓');
    } catch (e) {
      console.log(`✗ error: ${e.message}`);
      if (e.message.includes('Ollama error')) {
        console.error('\n   ⚠  Could not reach Ollama. Make sure it is running: ollama serve');
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
