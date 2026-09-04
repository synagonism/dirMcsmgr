/**
 * parserHitp.js
 * Parses generic Hitp (Html5.Id.Toc.Preview) *.last.html files into structured
 * JavaScript objects. Hitp is the title-content-tree book format that Mcs
 * specialises; a Hitp file has sections/headings/paragraphs carrying unique IDs,
 * a clsHide self-anchor on each heading/paragraph, and clsPreview link-preview
 * cross-references — but none of the Mcs name::/description:: concept layer.
 *
 * Reuses the generic HTML/section helpers from parser.js.
 *
 * Returned per file (oFileHitp):
 * {
 *   sType: 'fileHitp',
 *   sPathFile, sNameFile, sNameDir,
 *   sNameTitle,     // <title> text (name part only)
 *   sVersion,       // e.g. "HitpStnStd000.8-2-3.2024-05-26"
 *   nLineTitle,     // line of the <title>
 *   aoSect,         // [{ sNameId, sNameTitle, nHeadingLevel, nDepth, sIdWhole_elmt }]
 *   aoElmt,         // heading+paragraph elements of content sections:
 *                   //   [{ sType:'head'|'para', sNameId, nLevel, sHrefSelf, nLine, sIdSect }]
 *   oSetId,         // Set<string> of every id= in the file
 *   aoIdDup,        // [{ sName, nLine }] ids that appear more than once
 *   aLinks,         // content hrefs (clsHide self-anchors removed)
 *   oMapIdLine,     // Map<id, line>
 *   oMapLinkLine,   // Map<href, line>
 *   sError          // set if the file could not be read
 * }
 */

import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import {
  fStripTags,
  fExtractId,
  fBuildMapLine,
  fFindLineAt,
  fExtractContentHrefs,
  fSplit_sections,
  fFindSect_overview,
} from './parser.js';

const
  aVersion = [
    'parserHitp.js.0-1-0.2026-09-04: creation'
  ]

// sections that are infrastructure, not content (skipped for element checks)
const aoIdSectInfra = ['idMeta', 'idComment', 'idSupport'];

/**
 * DOING: scan every id="X" and return the ones appearing more than once.
 * OUTPUT: [{ sName, nLine }] (nLine = 1-based line of the FIRST occurrence).
 */
function fFindIdDuplicate(sHtmlIn) {
  const rId = /\bid="([^"]+)"/g;
  const oMapCount = new Map();   // id → count
  const oMapFirstLine = new Map(); // id → first line
  let aMatch, nLine = 1, nPos = 0;
  while ((aMatch = rId.exec(sHtmlIn)) !== null) {
    while (nPos < aMatch.index) { if (sHtmlIn.charCodeAt(nPos) === 10) nLine++; nPos++; }
    const sName = aMatch[1];
    oMapCount.set(sName, (oMapCount.get(sName) ?? 0) + 1);
    if (!oMapFirstLine.has(sName)) oMapFirstLine.set(sName, nLine);
  }
  const aoIdDup = [];
  for (const [sName, nCount] of oMapCount) {
    if (nCount > 1) aoIdDup.push({ sName, nLine: oMapFirstLine.get(sName) });
  }
  return aoIdDup;
}

/**
 * DOING: read one heading/paragraph element's HTML.
 * OUTPUT: { sNameId, sHrefSelf }
 *   sNameId   — value of the element's own id= (or null)
 *   sHrefSelf — the "#X" target of its trailing clsHide anchor, X only (or null)
 */
function fReadElmtHitp(sElmtHtml) {
  const aIdMatch = sElmtHtml.match(/^<[a-z0-9]+\b[^>]*\bid="([^"]+)"/i);
  const sNameId = aIdMatch ? aIdMatch[1] : null;
  // The element's OWN self-anchor is the LAST clsHide in it — a paragraph may embed
  // sub-elements (e.g. an equation/figure) each carrying their own clsHide first.
  const aoHide = [...sElmtHtml.matchAll(/<a\s+class="clsHide"\s+href="#([^"]*)"/gi)];
  const sHrefSelf = aoHide.length ? aoHide[aoHide.length - 1][1] : null;
  return { sNameId, sHrefSelf };
}

/**
 * INPUT: one Hitp file given its path.
 * OUTPUT: one oFileHitp object (see header).
 */
export function fParseFileHitp(sPathFile) {
  let sFileRaw;
  try {
    sFileRaw = fs.readFileSync(sPathFile, 'utf8');
  } catch (e) {
    return {
      sType: 'fileHitp',
      sPathFile,
      sNameFile: path.basename(sPathFile),
      sNameDir: path.basename(path.dirname(sPathFile)),
      sError: e.message,
      sNameTitle: '',
      sVersion: null,
      nLineTitle: null,
      aoSect: [],
      aoElmt: [],
      oSetId: new Set(),
      aoIdDup: [],
      aLinks: [],
      oMapIdLine: new Map(),
      oMapLinkLine: new Map(),
    };
  }

  // ── line maps + id set + duplicate ids ────────────────────────────────────
  const oMapIdLine   = fBuildMapLine(sFileRaw, /\bid="([^"]+)"/g);
  const oMapLinkLine = fBuildMapLine(sFileRaw, /href="([^"]+)"/g);
  const oSetId  = fExtractId(sFileRaw);
  const aoIdDup = fFindIdDuplicate(sFileRaw);

  // ── <title> + version ─────────────────────────────────────────────────────
  const aTitleMatch = sFileRaw.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const nLineTitle = aTitleMatch ? fFindLineAt(sFileRaw, aTitleMatch.index) : null;
  const sTitleRaw = aTitleMatch ? fStripTags(aTitleMatch[1]) : '';
  const aVersionMatch = sTitleRaw.match(/\(([^)]+)\)/);
  const sVersion  = aVersionMatch ? aVersionMatch[1].trim() : null; // HitpStnStd000.8-2-3.2024-05-26
  const sNameTitle = sTitleRaw.replace(/\s*\([^)]*\)\s*/g, '').trim();

  // ── all content hrefs in the file ─────────────────────────────────────────
  const aLinks = fExtractContentHrefs(sFileRaw);

  // ── sections → aoSect + aoElmt ────────────────────────────────────────────
  const aoRawSect = fSplit_sections(sFileRaw);
  const aoSect = [];
  const aoElmt = [];

  for (const oRawSect of aoRawSect) {
    const sOverview = fFindSect_overview(oRawSect.sRawHtml);

    // heading of this section: first <h1..6> in the overview
    const aHeadMatch = sOverview.match(/<h([1-9])\b[^>]*>([\s\S]*?)<\/h\1>/i);
    const nHeadingLevel = aHeadMatch ? parseInt(aHeadMatch[1]) : null;
    const sNameTitleSect = aHeadMatch ? fStripTags(aHeadMatch[2]) : '';

    aoSect.push({
      sNameId: oRawSect.sNameId,
      sNameTitle: sNameTitleSect,
      nHeadingLevel,
      nDepth: oRawSect.nDepth,
      sIdWhole_elmt: oRawSect.sIdWhole_elmt,
    });

    // element-level checks skip infrastructure sections (idMeta/idComment/idSupport);
    // header/footer are <header>/<footer>, not <section>, so already excluded.
    if (aoIdSectInfra.includes(oRawSect.sNameId)) continue;

    const sIdSect = oRawSect.sNameId;

    // headings (h1..6) directly in this section's overview
    const rHead = /<h([1-6])\b[^>]*>[\s\S]*?<\/h\1>/gi;
    let aMatch;
    while ((aMatch = rHead.exec(sOverview)) !== null) {
      const { sNameId, sHrefSelf } = fReadElmtHitp(aMatch[0]);
      aoElmt.push({
        sType: 'head', sSubtype: 'h' + aMatch[1], sNameId, nLevel: parseInt(aMatch[1]),
        sHrefSelf, nLine: oMapIdLine.get(sNameId) ?? oMapIdLine.get(sIdSect) ?? null, sIdSect,
      });
    }

    // paragraphs (<p>) directly in this section's overview
    const rP = /<p\b[^>]*>[\s\S]*?<\/p>/gi;
    while ((aMatch = rP.exec(sOverview)) !== null) {
      const { sNameId, sHrefSelf } = fReadElmtHitp(aMatch[0]);
      aoElmt.push({
        sType: 'para', sSubtype: 'p', sNameId, nLevel: null,
        sHrefSelf, nLine: oMapIdLine.get(sNameId) ?? oMapIdLine.get(sIdSect) ?? null, sIdSect,
      });
    }
  }

  return {
    sType: 'fileHitp',
    sPathFile,
    sNameFile: path.basename(sPathFile),
    sNameDir: path.basename(path.dirname(sPathFile)),
    sNameTitle,
    sVersion,
    nLineTitle,
    aoSect,
    aoElmt,
    oSetId,
    aoIdDup,
    aLinks,
    oMapIdLine,
    oMapLinkLine,
  };
}

// ─── directory scanner ────────────────────────────────────────────────────────

export function fParseFileAllHitp(sPathDir) {
  let aPathFile;
  try {
    const sPattern = path.join(sPathDir, '**/*.last.html').replace(/\\/g, '/');
    aPathFile = globSync(sPattern, { ignore: '**/node_modules/**' });
  } catch {
    aPathFile = fWalkDir(sPathDir);
  }
  return aPathFile.map(sPath => fParseFileHitp(sPath));
}

function fWalkDir(sDir) {
  let aPathFile = [];
  for (const sItem of fs.readdirSync(sDir)) {
    if (sItem === 'node_modules') continue;
    const sPathFull = path.join(sDir, sItem);
    if (fs.statSync(sPathFull).isDirectory()) {
      aPathFile = aPathFile.concat(fWalkDir(sPathFull));
    } else if (sItem.endsWith('.last.html')) {
      aPathFile.push(sPathFull);
    }
  }
  return aPathFile;
}
