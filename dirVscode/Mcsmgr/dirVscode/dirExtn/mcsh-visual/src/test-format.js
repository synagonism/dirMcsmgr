// @ts-check
'use strict';
/*
 * test-format.js — prove the canonical re-indenter is safe.
 *
 *   node src/test-format.js            → summary across all dirCor/*.last.html
 *   node src/test-format.js --diff     → also print each changed line (before→after)
 *
 * Safety properties checked:
 *   1. Idempotent: format(format(x)) === format(x).
 *   2. Content-preserving: stripping leading indentation from every line yields
 *      the SAME sequence for input and output (we only ever change indentation).
 */

const fs = require('fs');
const path = require('path');
const { format } = require('./format');

const showDiff = process.argv.includes('--diff');
const dirCor = path.resolve(__dirname, '../../../dirCor');

const files = fs.readdirSync(dirCor).filter((f) => f.endsWith('.last.html'));
let totalChanged = 0;
let failures = 0;

const stripLead = (s) => s.split(/\r?\n/).map((l) => l.replace(/^[ \t]+/, ''));

for (const f of files) {
  const p = path.join(dirCor, f);
  const src = fs.readFileSync(p, 'utf8');
  const out = format(src);

  // 1. idempotent
  const twice = format(out);
  const idem = twice === out;

  // 2. content-preserving (same lines ignoring leading indent)
  const a = stripLead(src);
  const b = stripLead(out);
  const contentSame = a.length === b.length && a.every((l, i) => l === b[i]);

  // 3. pre-preserving: <pre> elements (and their opener line) carry SEMANTIC
  //    leading whitespace, so they must come through byte-for-byte. This is the
  //    one place where re-indenting would actually change meaning.
  let preOk = true;
  {
    const sl = src.split(/\r?\n/), ol = out.split(/\r?\n/);
    let head = true, inPre = false;
    for (let i = 0; i < sl.length; i++) {
      const lower = sl[i].replace(/^[ \t]+/, '').toLowerCase();
      if (head) { if (lower.startsWith('<body')) head = false; continue; }
      if (inPre) {
        if (sl[i] !== ol[i]) { preOk = false; break; }
        if (lower.includes('</pre>')) inPre = false;
        continue;
      }
      if (lower.startsWith('<pre')) {
        if (sl[i] !== ol[i]) { preOk = false; break; }
        if (!lower.includes('</pre>')) inPre = true;
      }
    }
  }

  // 4. tree-preserving: <ul class="clsTreeUl"> trees are verbatim (semantic indent).
  let treeOk = true;
  {
    const sl = src.split(/\r?\n/), ol = out.split(/\r?\n/);
    let head = true, depth = 0;
    for (let i = 0; i < sl.length; i++) {
      const lower = sl[i].replace(/^[ \t]+/, '').toLowerCase();
      if (head) { if (lower.startsWith('<body')) head = false; continue; }
      const d = (lower.match(/<ul[\s>]/g) || []).length - (lower.match(/<\/ul\s*>/g) || []).length;
      if (depth > 0) {
        if (sl[i] !== ol[i]) { treeOk = false; break; }
        depth += d; continue;
      }
      if (lower.startsWith('<ul') && lower.includes('clstreeul')) {
        if (sl[i] !== ol[i]) { treeOk = false; break; }
        depth = d;
      }
    }
  }

  // count re-indented lines
  const srcLines = src.split(/\r?\n/);
  const outLines = out.split(/\r?\n/);
  let changed = 0;
  const diffs = [];
  for (let i = 0; i < Math.max(srcLines.length, outLines.length); i++) {
    if (srcLines[i] !== outLines[i]) {
      changed++;
      if (showDiff) diffs.push(`  L${i + 1}\n    - ${JSON.stringify(srcLines[i])}\n    + ${JSON.stringify(outLines[i])}`);
    }
  }
  totalChanged += changed;

  const ok = idem && contentSame && preOk && treeOk;
  if (!ok) failures++;
  const flag = ok ? (changed ? '~' : '=') : '✗';
  console.log(`${flag} ${f}  (reindented ${changed} line${changed === 1 ? '' : 's'}${idem ? '' : ', NOT idempotent'}${contentSame ? '' : ', CONTENT CHANGED!'}${preOk ? '' : ', PRE BROKEN!'}${treeOk ? '' : ', TREE BROKEN!'})`);
  if (showDiff && diffs.length) console.log(diffs.join('\n'));
}

console.log(`\n${files.length} files · ${totalChanged} lines re-indented · ${failures} unsafe`);
process.exit(failures ? 1 : 0);
