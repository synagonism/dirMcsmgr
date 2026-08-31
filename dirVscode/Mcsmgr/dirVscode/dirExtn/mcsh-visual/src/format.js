'use strict';
/*
 * format.js — canonical serializer ("full" reformat) for Mcsh *.last.html docs.
 *
 * Re-indents the body to two levels (leading whitespace only — never content):
 *   • col 0     — document skeleton: <!doctype> <html> <head> <body> + closes
 *   • 2 spaces  — block elements: every <section> <header> <footer> <h1..9> <p>
 *                 <div>, block comments <!-- -->, and body-level <script> tags
 *   • 4 spaces  — EVERYTHING ELSE (<br> segments, clsHide tails, standalone
 *                 </p></hN></div></span>, table rows, wrapped inline links, ...)
 *   • <script> body — shifted so its outermost JS line sits at 4 spaces, with the
 *                 relative nesting preserved
 *   • <pre> elements and <ul class="clsTreeUl"> trees — kept BYTE-FOR-BYTE verbatim
 *                 (leading whitespace is semantic / shows the tree structure)
 *   • the <head>/prologue (before <body>) and blank lines — left as authored
 *
 * Because it only ever rewrites leading whitespace it is idempotent and, outside
 * <pre>, render-safe (HTML collapses inter-tag whitespace; the corpus has no
 * multi-line JS template literals, so shifting script indentation is safe too).
 */

/** Detect the dominant line ending so we round-trip CRLF files unchanged. */
function detectEol(text) {
  const crlf = (text.match(/\r\n/g) || []).length;
  const lf = (text.match(/(^|[^\r])\n/g) || []).length;
  return crlf > lf ? '\r\n' : '\n';
}

/**
 * Canonical indent for a normal body line — NOT `<script>`/`<pre>` (those, and
 * in-script/in-pre lines, are handled by the state machine in format()).
 * @param {string} lower lower-cased, left-trimmed line
 * @returns {0|2|4}
 */
function classify(lower) {
  // 2-space block elements — checked first because '<head' is a prefix of '<header'.
  if (lower.startsWith('<section') || lower.startsWith('</section')) return 2;
  if (lower.startsWith('<header') || lower.startsWith('</header')) return 2;
  if (lower.startsWith('<footer') || lower.startsWith('</footer')) return 2;

  // Document skeleton — column 0.
  if (
    lower.startsWith('<!doctype') || lower.startsWith('<html') || lower.startsWith('</html') ||
    lower.startsWith('<head') || lower.startsWith('</head') ||
    lower.startsWith('<body') || lower.startsWith('</body')
  ) return 0;

  // Block openers: <h1..9> <p> <div> (real tag, not just a prefix) + block comment.
  if (/^<(h[1-9]|p|div)[\s>]/.test(lower) || /^<(h[1-9]|p|div)$/.test(lower)) return 2;
  if (lower.startsWith('<!--')) return 2;

  // Everything else → 4 spaces.
  return 4;
}

const leadLen = (s) => (s.match(/^[ \t]*/) || [''])[0].length;
/** Net <ul> nesting change on a line: opens − closes (for clsTreeUl trees). */
const ulDelta = (lower) => (lower.match(/<ul[\s>]/g) || []).length - (lower.match(/<\/ul\s*>/g) || []).length;

/**
 * Re-indent one Mcsh document to canonical form.
 * @param {string} source raw file contents
 * @returns {string}
 */
function format(source) {
  const eol = detectEol(source);
  const hadTrailingNl = /\n$/.test(source);
  const lines = source.split(/\r?\n/);
  if (hadTrailingNl && lines.length && lines[lines.length - 1] === '') lines.pop();

  let inHead = true;      // up to and including the <body ...> line: verbatim
  let inPre = false;      // inside a <pre>…</pre>: verbatim
  let treeDepth = 0;      // >0 while inside a <ul class="clsTreeUl"> tree: verbatim
  let scriptBuf = null;   // collecting a <script> body (array of raw lines) or null

  const out = [];

  // Emit a collected <script> body shifted so its shallowest line sits at 4 spaces,
  // preserving relative nesting; blank lines stay blank.
  const flushScript = () => {
    let min = Infinity;
    for (const l of scriptBuf) { if (l.trim() !== '') min = Math.min(min, leadLen(l)); }
    if (min === Infinity) min = 0;
    const delta = 4 - min;
    for (const l of scriptBuf) {
      if (l.trim() === '') { out.push(''); continue; }
      const lead = leadLen(l);
      out.push(' '.repeat(Math.max(0, lead + delta)) + l.slice(lead));
    }
    scriptBuf = null;
  };

  for (const line of lines) {
    const stripped = line.replace(/^[ \t]+/, '');
    const lower = stripped.toLowerCase();

    if (inHead) {
      out.push(line);
      if (lower.startsWith('<body')) inHead = false;
      continue;
    }

    if (inPre) {                                   // verbatim until </pre>
      out.push(line);
      if (lower.includes('</pre>')) inPre = false;
      continue;
    }

    if (treeDepth > 0) {                           // preserve clsTreeUl tree verbatim
      out.push(line);
      treeDepth += ulDelta(lower);
      continue;
    }

    if (scriptBuf) {                               // collecting a <script> body
      if (lower.startsWith('</script')) { flushScript(); out.push('  ' + stripped); }
      else scriptBuf.push(line);
      continue;
    }

    if (stripped === '') { out.push(''); continue; }

    if (lower.startsWith('<pre')) {                // <pre> element: verbatim
      out.push(line);
      if (!lower.includes('</pre>')) inPre = true;
      continue;
    }

    if (lower.startsWith('<ul') && lower.includes('clstreeul')) {  // tree → verbatim
      out.push(line);
      treeDepth = ulDelta(lower);
      continue;
    }

    if (lower.startsWith('<script')) {
      // A <script> sitting in inline content (e.g. the counter inside a <p>, at
      // source-indent ≥4) stays at 4; a body-level <script> tag → 2 and its body
      // is collected. Source indent distinguishes them and stays idempotent.
      if (leadLen(line) >= 4) {
        out.push('    ' + stripped);
      } else {
        out.push('  ' + stripped);
        if (!lower.includes('</script>')) scriptBuf = [];
      }
      continue;
    }

    const ind = classify(lower);
    out.push((ind ? ' '.repeat(ind) : '') + stripped);
  }

  if (scriptBuf) flushScript();                    // unterminated <script> (defensive)

  let result = out.join(eol);
  if (hadTrailingNl) result += eol;
  return result;
}

module.exports = { format, detectEol, classify };
