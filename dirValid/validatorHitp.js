#!/usr/bin/env node
/**
 * Hitp Consistency Checker
 * Checks generic Hitp (Html5.Id.Toc.Preview) *.last.html files for structural and
 * link-preview issues. Hitp is the title-content-tree book format that Mcs
 * specialises; use validator.js for the Mcs concept layer, this for generic Hitp.
 *
 * Usage:
 *   node validatorHitp.js <dirHitp-path>                       # scan a directory
 *   node validatorHitp.js <dirHitp-path> --file HitpXxx000.last.html  # single file
 */

import { fParseFileHitp, fParseFileAllHitp } from './parserHitp.js';
import { fRunChecksHitp } from './structuralHitp.js';
import { fReporter } from './reporter.js';
import path from 'path';
import fs from 'fs';

const
  aVersion = [
    'validatorHitp.js.0-1-0.2026-09-04: creation'
  ],
  aArg = process.argv.slice(2);

if (aArg.length === 0) {
  console.error('Usage dirMcsmgr: node dirValid/validatorHitp <dirHitp-path> [--file <filename>]');
  process.exit(1);
}

const sPathDir     = aArg[0];
const nIndexFile   = aArg.indexOf('--file');
const sFileSingle  = nIndexFile !== -1 ? aArg[nIndexFile + 1] : null;

if (!fs.existsSync(sPathDir)) {
  console.error(`Directory not found: ${sPathDir}`);
  process.exit(1);
}

const oReporter = fReporter();

async function fMain() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  Hitp Consistency Checker');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  let aoFile;
  if (sFileSingle) {
    const sPathFile = path.isAbsolute(sFileSingle) ? sFileSingle : path.join(sPathDir, sFileSingle);
    console.log(`📄 Single-file mode: ${sFileSingle}`);
    aoFile = [fParseFileHitp(sPathFile)];
  } else {
    console.log(`📂 Scanning: ${sPathDir}`);
    aoFile = fParseFileAllHitp(sPathDir);
    console.log(`   Found ${aoFile.length} .last.html files\n`);
  }

  // ── Structural / link-preview checks (fast, no AI) ────────────────────────
  console.log('🔍 Running Hitp structural checks...');
  const aoIssue = fRunChecksHitp(aoFile, sPathDir);
  oReporter.fAddAll(aoIssue);

  oReporter.fPrint();
  oReporter.fSaveJson('./dirValid/validatorHitp-report.json');
  oReporter.fSaveHtml('./dirValid/validatorHitp-report.html');
}

fMain().catch(oErr => {
  console.error('\n❌ Fatal error:', oErr.message);
  process.exit(1);
});
