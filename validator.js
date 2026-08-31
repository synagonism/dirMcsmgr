#!/usr/bin/env node
/**
 * MCS Consistency Checker
 * Checks dirMcsh-knowledge-base for structural and content issues.
 * Uses Ollama (local AI) for deep semantic checks when --ai flag is used.
 *
 * Usage:
 *   node validator.js <dirMcsh-path>          # fast structural checks only
 *   node validator.js <dirMcsh-path> --ai     # + Ollama AI semantic checks
 *   node validator.js <dirMcsh-path> --file McsXxx000001.last.html  # single file
 */

import { parseFile, parseAllFiles } from './dirValid/parser.js';
import { runStructuralChecks } from './dirValid/structural.js';
import { runAiChecks } from './dirValid/ai-checks.js';
import { Reporter } from './dirValid/reporter.js';
import path from 'path';
import fs from 'fs';

const
  aVersion = [
    'validator.js.0-2-0.2026-04-27: working structural',
    'validator.js.0-1-0.2026-04-24: creation'
  ],
  args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Usage dirMcsh: node Mcsmgr/validator.js <dirMcsh-path> [--ai] [--file <filename>] [--report]');
  process.exit(1);
}

const dirMcsPath  = args[0];
const useAi       = args.includes('--ai');
const saveReport  = args.includes('--report');
const nFileIndex  = args.indexOf('--file');
const sSingleFile = nFileIndex !== -1 ? args[nFileIndex + 1] : null;

if (!fs.existsSync(dirMcsPath)) {
  console.error(`Directory not found: ${dirMcsPath}`);
  process.exit(1);
}

const reporter = new Reporter();

async function main() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  MCS Consistency Checker');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  let aFiles;
  if (sSingleFile) {
    const fp = path.isAbsolute(sSingleFile) ? sSingleFile : path.join(dirMcsPath, sSingleFile);
    console.log(`📄 Single-file mode: ${sSingleFile}`);
    aFiles = [parseFile(fp)];
  } else {
    console.log(`📂 Scanning: ${dirMcsPath}`);
    aFiles = parseAllFiles(dirMcsPath);
    console.log(`   Found ${aFiles.length} .last.html files\n`);
  }

  // ── 1. Structural checks (fast, no AI needed) ──────────────────────────────
  console.log('🔍 Running structural checks...');
  const structIssues = runStructuralChecks(aFiles, dirMcsPath);
  reporter.addAll(structIssues);

  // ── 2. AI semantic checks (requires Ollama running) ───────────────────────
  if (useAi) {
    console.log('\n🤖 Running AI semantic checks via Ollama...');
    const aiIssues = await runAiChecks(aFiles);
    reporter.addAll(aiIssues);
  }

  reporter.print();

  if (saveReport) {
    reporter.saveJson('mcs-report.json');
    reporter.saveHtml('mcs-report.html');
  }
}

main().catch(err => {
  console.error('\n❌ Fatal error:', err.message);
  process.exit(1);
});
