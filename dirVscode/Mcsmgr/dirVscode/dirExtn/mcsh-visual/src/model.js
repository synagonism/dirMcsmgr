'use strict';
/*
 * model.js — maps a WYSIWYG edit reported by the browser bridge back to an exact
 * byte range in the source file.
 *
 * The rendered page keeps the source `id`s and the source text-node order, so the
 * bridge can address each editable text run as (id, ordinal): the ordinal is the
 * index of that text run among all editable runs sharing the same nearest
 * id-bearing ancestor. We reproduce the SAME walk here (parse5, same whitespace
 * rule) so ordinal N here is the exact byte range the bridge's ordinal N means.
 *
 * The write itself is a plain byte-range replacement; canonical re-indentation of
 * the whole document happens separately, on Save, in format.js.
 */

const parse5 = require('parse5');

const RAW_TEXT_PARENTS = new Set(['script', 'style', 'noscript', 'title', 'textarea']);
const PLAIN_WS_LEAD = /^[\n\r\t ]*/;
const PLAIN_WS_TRAIL = /[\n\r\t ]*$/;

/**
 * Editable text cores grouped by nearest id-ancestor, in document order.
 * @param {string} text
 * @returns {{ [id:string]: Array<{s:number,e:number,dec:string}> }}
 */
function collectCoresById(text) {
  const doc = parse5.parse(text, { sourceCodeLocationInfo: true });
  /** @type {{ [id:string]: Array<{s:number,e:number,dec:string}> }} */
  const byId = {};

  (function walk(node, parentName, ancId) {
    const idAttr = (node.attrs || []).find((a) => a.name === 'id');
    const curId = idAttr ? idAttr.value : ancId;
    if (node.nodeName === '#text') {
      if (RAW_TEXT_PARENTS.has(parentName) || !ancId) return;
      const loc = node.sourceCodeLocation;
      if (!loc) return;
      const raw = text.slice(loc.startOffset, loc.endOffset);
      const lead = (raw.match(PLAIN_WS_LEAD) || [''])[0].length;
      const trail = (raw.match(PLAIN_WS_TRAIL) || [''])[0].length;
      const s = loc.startOffset + lead;
      const e = loc.endOffset - trail;
      if (e <= s) return;
      const dec = String(node.value).replace(PLAIN_WS_LEAD, '').replace(PLAIN_WS_TRAIL, '');
      (byId[ancId] = byId[ancId] || []).push({ s, e, dec });
      return;
    }
    const name = node.tagName || node.nodeName;
    for (const k of node.childNodes || []) walk(k, name, curId);
  })(doc, '#document', null);

  return byId;
}

/** Set of ids present in the source (so the bridge only trusts real ids). */
function collectIds(text) {
  return Object.keys(collectCoresById(text));
}

/** Flatten cores to a document-order list of {id, ord, s, e}. */
function flattenCores(text) {
  const byId = collectCoresById(text);
  const list = [];
  for (const id of Object.keys(byId)) byId[id].forEach((c, ord) => list.push({ id, ord, s: c.s, e: c.e }));
  list.sort((a, b) => a.s - b.s);
  return list;
}

/**
 * Which editable core a source byte `offset` falls in (or nearest), for cursor
 * sync. Pass a pre-flattened `list` (from flattenCores) to avoid re-parsing.
 * @returns {{id:string, ord:number} | null}
 */
function coreAtOffset(list, offset) {
  if (!list || !list.length) return null;
  let best = null, bestDist = Infinity;
  for (const c of list) {
    if (offset >= c.s && offset <= c.e) return { id: c.id, ord: c.ord };
    const d = Math.min(Math.abs(offset - c.s), Math.abs(offset - c.e));
    if (d < bestDist) { bestDist = d; best = c; }
  }
  return best ? { id: best.id, ord: best.ord } : null;
}

/**
 * Locate the byte range for an edit message {id, ord, oldDec?}. Returns null if
 * the pairing can't be verified (so the caller can refuse and reload).
 * @param {string} text
 * @param {{id:string, ord:number, oldDec?:string}} msg
 */
function locate(text, msg) {
  const arr = collectCoresById(text)[msg.id];
  const entry = arr && arr[msg.ord | 0];
  if (!entry) return null;
  if (msg.oldDec != null && entry.dec !== msg.oldDec) return null;
  return entry;
}

/**
 * Escape a plain-text value for writing back as an HTML text node. Only
 * HTML-significant characters are touched; ordinary spaces stay literal (so we
 * don't churn bytes or break line wrapping). A real non-breaking space (U+00A0),
 * which the browser hands back from `&nbsp;`, is re-encoded to the entity to
 * match the rest of the file's style.
 */
function escapeText(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .split(' ').join('&nbsp;');
}

// ---------------------------------------------------------------------------
// Structure editing: add / delete a `<br>` marker-line inside a block element.
// Pure functions returning surgical {insertAt} / {removeS,removeE} edits. The
// whole file is canonicalised on Save anyway, so these only need to be correct,
// not perfectly indented.
// ---------------------------------------------------------------------------

const MARKER_RE = /^([×·*•∇⇔])[ \t]?/;

/** Line context around `offset`: the text node, its block, and neighbouring <br>. */
function getLineContext(text, offset) {
  const doc = parse5.parse(text, { sourceCodeLocationInfo: true });
  let found = null;
  (function walk(node, parent) {
    if (found) return;
    if (node.nodeName === '#text') {
      const loc = node.sourceCodeLocation;
      if (loc && offset >= loc.startOffset && offset <= loc.endOffset && parent) found = { node, parent };
      return;
    }
    for (const k of node.childNodes || []) walk(k, node);
  })(doc, null);
  if (!found) return null;

  const { node, parent } = found;
  const loc = node.sourceCodeLocation;
  const raw = text.slice(loc.startOffset, loc.endOffset);
  const lead = (raw.match(PLAIN_WS_LEAD) || [''])[0].length;
  const trail = (raw.match(PLAIN_WS_TRAIL) || [''])[0].length;
  const coreS = loc.startOffset + lead;
  const coreE = loc.endOffset - trail;
  const sep = text.slice(coreE, loc.endOffset); // trailing "\n    " separator
  const mk = text.slice(coreS, loc.endOffset).match(MARKER_RE);

  const kids = parent.childNodes || [];
  const idx = kids.indexOf(node);
  const brLoc = (n) => (n && n.tagName === 'br' && n.sourceCodeLocation)
    ? { s: n.sourceCodeLocation.startOffset, e: n.sourceCodeLocation.endOffset } : null;
  const prevBr = brLoc(kids[idx - 1]);

  let nextBr = null, nextBoundary = null;
  for (let i = idx + 1; i < kids.length; i++) {
    if (kids[i].tagName === 'br') { nextBr = brLoc(kids[i]); nextBoundary = nextBr.s; break; }
  }
  if (nextBoundary == null) {
    const et = parent.sourceCodeLocation && parent.sourceCodeLocation.endTag;
    let b = et ? et.startOffset : loc.endOffset;
    for (let i = idx + 1; i < kids.length; i++) {
      if (kids[i].sourceCodeLocation) { b = kids[i].sourceCodeLocation.startOffset; break; }
    }
    nextBoundary = b;
  }

  return { block: parent, node: { s: loc.startOffset, e: loc.endOffset }, coreS, coreE, sep, marker: mk ? mk[1] : null, prevBr, nextBr, nextBoundary };
}

/** Separator (`\n` + indentation) for a block, inferred from an existing line. */
function inferSeparator(text, ctx) {
  if (/\n[ \t]*$/.test(ctx.sep)) return ctx.sep;
  const m = text.slice(ctx.block.sourceCodeLocation.startOffset, ctx.node.e).match(/\n([ \t]*)<br/i);
  return m ? '\n' + m[1] : '\n    ';
}

/** Insert a new `<br>` marker-line after the line at `offset`. */
function buildLineAfter(text, offset, placeholder) {
  const ctx = getLineContext(text, offset);
  if (!ctx) return null;
  const sep = inferSeparator(text, ctx);
  const marker = ctx.marker || '·';
  const body = placeholder == null ? 'new-line' : placeholder;
  return { insertAt: ctx.coreE, text: `${sep}<br>${marker} ${body}` };
}

/** Delete the `<br>` marker-line at `offset` (never the first/header line). */
function buildLineDelete(text, offset) {
  const ctx = getLineContext(text, offset);
  if (!ctx || !ctx.prevBr) return null;
  return { removeS: ctx.prevBr.s, removeE: ctx.nextBoundary };
}

/** Byte offset of the START of the (id, ord) core, for structural ops. */
function coreStart(text, msg) {
  const loc = locate(text, msg);
  return loc ? loc.s : null;
}

module.exports = {
  collectCoresById, collectIds, locate, escapeText,
  getLineContext, buildLineAfter, buildLineDelete, coreStart,
  flattenCores, coreAtOffset,
};
