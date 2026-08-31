/**
 * reporter.js
 * Collects issues and prints a summary report.
 * Can also write JSON and HTML reports.
 */

import fs from 'fs';
import path from 'path';

const LEVEL_ICON = { ERROR: '❌', WARN: '⚠️ ', INFO: 'ℹ️ ' };
const LEVEL_ORDER = { ERROR: 0, WARN: 1, INFO: 2 };

export class Reporter {
  constructor() {
    this.issues = [];
  }

  add(issue) {
    if (issue) this.issues.push(issue);
  }

  addAll(issues) {
    for (const i of issues) this.add(i);
  }

  get errors()   { return this.issues.filter(i => i.level === 'ERROR'); }
  get warnings() { return this.issues.filter(i => i.level === 'WARN'); }
  get infos()    { return this.issues.filter(i => i.level === 'INFO'); }

  print() {
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  Results');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    if (this.issues.length === 0) {
      console.log('✅  No issues found!\n');
      return;
    }

    // Group by file
    const byFile = new Map();
    for (const issue of this.issues) {
      const mkey = issue.file ?? '(global)';
      if (!byFile.has(mkey)) byFile.set(mkey, []);
      byFile.get(mkey).push(issue);
    }

    // Print sorted: errors first, then warnings, then info
    const sortedFiles = [...byFile.keys()].sort();
    for (const file of sortedFiles) {
      const fileIssues = byFile.get(file).sort(
        (a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level]
      );
      console.log(`📄 ${file}`);
      for (const iss of fileIssues) {
        const loc = iss.line ? `:${iss.line}` : '';
        const icon = LEVEL_ICON[iss.level];
        const code = `[${iss.code}]`.padEnd(6);
        console.log(`   ${icon} ${code}  ${iss.message}${loc ? `  (line ${iss.line})` : ''}`);
      }
      console.log();
    }

    // Summary
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`  SUMMARY: ${this.errors.length} errors  |  ${this.warnings.length} warnings  |  ${this.infos.length} info`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Hint about report files
    console.log('💡 Run with --report to save mcs-report.json and mcs-report.html\n');
  }

  saveJson(outPath) {
    const data = {
      generated: new Date().toISOString(),
      summary: {
        total: this.issues.length,
        errors: this.errors.length,
        warnings: this.warnings.length,
        infos: this.infos.length,
      },
      issues: this.issues.map(i => ({
        level: i.level,
        code: i.code,
        file: i.file,
        concept: i.concept?.heading ?? null,
        line: i.line ?? null,
        message: i.message,
      })),
    };
    fs.writeFileSync(outPath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`📊 JSON report saved: ${outPath}`);
  }

  saveHtml(outPath) {
    const rows = this.issues.map(i => {
      const level = i.level;
      const rowClass = level === 'ERROR' ? 'err' : level === 'WARN' ? 'wrn' : 'inf';
      return `<tr class="${rowClass}">
        <td>${level}</td>
        <td>${i.code}</td>
        <td>${esc(i.file ?? '')}</td>
        <td>${esc(i.concept?.heading ?? '')}</td>
        <td>${i.line ?? ''}</td>
        <td>${esc(i.message)}</td>
      </tr>`;
    }).join('\n');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>MCS Consistency Report</title>
<style>
  body { font-family: system-ui, sans-serif; margin: 2rem; color: #222; }
  h1 { font-size: 1.4rem; }
  .summary { display: flex; gap: 2rem; margin: 1rem 0; font-size: 1.1rem; }
  .summary span { font-weight: bold; }
  table { border-collapse: collapse; width: 100%; font-size: 0.85rem; }
  th { background: #f0f0f0; text-align: left; padding: 6px 10px; }
  td { padding: 5px 10px; border-bottom: 1px solid #e5e5e5; vertical-align: top; }
  tr.err td:first-child { color: #c00; font-weight: bold; }
  tr.wrn td:first-child { color: #c60; font-weight: bold; }
  tr.inf td:first-child { color: #069; }
  td:last-child { max-width: 500px; }
  input { padding: 6px; width: 300px; margin-bottom: 1rem; }
</style>
</head>
<body>
<h1>MCS Consistency Report</h1>
<p>Generated: ${new Date().toLocaleString()}</p>
<div class="summary">
  <span style="color:#c00">❌ ${this.errors.length} errors</span>
  <span style="color:#c60">⚠️ ${this.warnings.length} warnings</span>
  <span style="color:#069">ℹ️ ${this.infos.length} info</span>
</div>
<input type="text" id="filter" placeholder="Filter by file or message..." oninput="filterRows(this.value)">
<table>
  <thead>
    <tr><th>Level</th><th>Code</th><th>File</th><th>Concept</th><th>Line</th><th>Message</th></tr>
  </thead>
  <tbody id="tbody">
    ${rows}
  </tbody>
</table>
<script>
function filterRows(q) {
  q = q.toLowerCase();
  document.querySelectorAll('#tbody tr').forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
}
</script>
</body>
</html>`;
    fs.writeFileSync(outPath, html, 'utf8');
    console.log(`🌐 HTML report saved: ${outPath}`);
  }
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
