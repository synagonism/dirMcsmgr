#!/usr/bin/env node
/**
 * Mcs Consistency Checker
 * Checks dirMcsh-worldview for structural and content issues.
 * Uses the DeepSeek Cloud API for deep semantic checks when --ai flag is used.
 *
 * Usage:
 *   node validator.js <dirMcsh-path>          # fast structural checks only
 *   node validator.js <dirMcsh-path> --ai     # + DeepSeek AI semantic checks
 *   node validator.js <dirMcsh-path> --file McsXxx000001.last.html  # single file
 */

import { fParseFile, fParseFileAll } from './parser.js';
import { fRunChecksStructural } from './structural.js';
import { fRunChecksAi } from './ai-checks.js';
import { fReporter } from './reporter.js';
import path from 'path';
import fs from 'fs';

const
  aVersion = [
    'validator.js.0-3-0.2026-09-04: naming convention',
    'validator.js.0-2-0.2026-04-27: working structural',
    'validator.js.0-1-0.2026-04-24: creation'
  ],
  aArg = process.argv.slice(2);

if (aArg.length === 0) {
  console.error('Usage dirMcsmgr: node dirValid/validator <dirMcsh-path> [--ai] [--file <filename>]');
  process.exit(1);
}

const sPathDir     = aArg[0];
const bUseAi       = aArg.includes('--ai');
const bSaveReport  = true; // aArg.includes('--report');
const nIndexFile   = aArg.indexOf('--file');
const sFileSingle  = nIndexFile !== -1 ? aArg[nIndexFile + 1] : null;

if (!fs.existsSync(sPathDir)) {
  console.error(`Directory not found: ${sPathDir}`);
  process.exit(1);
}

const oReporter = fReporter();

async function fMain() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  Mcs Consistency Checker');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  let aoFile;
  if (sFileSingle) {
    const sPathFile = path.isAbsolute(sFileSingle) ? sFileSingle : path.join(sPathDir, sFileSingle);
    console.log(`📄 Single-file mode: ${sFileSingle}`);
    aoFile = [fParseFile(sPathFile)];
  } else {
    console.log(`📂 Scanning: ${sPathDir}`);
    aoFile = fParseFileAll(sPathDir);
    console.log(`   Found ${aoFile.length} .last.html files\n`);
  }

  // ── 1. Structural checks (fast, no AI needed) ──────────────────────────────
  console.log('🔍 Running structural checks...');
  const aoIssueStruct = fRunChecksStructural(aoFile, sPathDir);
  oReporter.fAddAll(aoIssueStruct);

  // ── 2. AI semantic checks (requires DeepSeek API key) ─────────────────────
  if (bUseAi) {
    console.log('\n🤖 Running AI semantic checks via DeepSeek...');
    const aoIssueAi = await fRunChecksAi(aoFile);
    oReporter.fAddAll(aoIssueAi);
  }

  oReporter.fPrint();

  if (bSaveReport) {
    oReporter.fSaveJson('./dirValid/validator-report.json');
    oReporter.fSaveHtml('./dirValid/validator-report.html');
  }
}

fMain().catch(oErr => {
  console.error('\n❌ Fatal error:', oErr.message);
  process.exit(1);
});
