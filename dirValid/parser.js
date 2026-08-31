/**
 * parser.js
 * Parses MCS .last.html files into structured JavaScript objects.
 *
 * The three Mcs types in the whole-part structure:
 *
 *  1) FileCnpt
 *     The file itself is a concept. Its identity is in <section id="idOverview">.
 *     - <title> holds the canonical name + version string
 *     - <section id="idOverview"> contains the file's description:: and name:: paragraphs
 *
 *  2) SectCnpt   (the main type)
 *     Every <section id="idXxx"> that contains a <p> whose text starts with "name::"
 *     and has at least one Mcs* entry is a SectCnpt. Structure:
 *     - sId                 the section's id= attribute
 *     - sSectTitle         text of the first <h1|h2|h3|h4> in the section
 *     - nHeadingLevel      1–9
 *     - nDepth              nesting nDepth (0 = top-level <section>)
 *     - sIdWhole           id of the enclosing <section>, or null
 *     - aParaObj           all <p> elements directly in this section
 *     - oParaByTitle       paragraphs indexed by their keyword (e.g. "description", "name")
 *     - aNames             parsed Mcs* entries from the name:: paragraph
 *     - aLinks             all hrefs found in this section
 *
 *  3) ParagraphMcs
 *     A <p id="idXxx"> that does NOT have a known section-keyword (description::, name::…)
 *     but contains at least one "* McsEngl." or "* McsElln." name entry.
 *     These are inline concept-anchors embedded inside a section's content.
 *     - sId, parentSectionId, text, aNames, aLinks
 *
 * Returned per file:
 * {
 *   type: 'FileCnpt',
 *   sFilePath, sFileName, sFileDir,
 *   sFileTitle,     // text from <title> (name part only)
 *   sVersion,       // e.g. "McsCor000015.1-4-0.2026-03-30"
 *   oFileMcsSect,   // the idOverview SectCnpt (= the file's own concept)
 *   aSectMcsObj,    // all SectCnpt objects
 *   aParaObj,       // all paragraph objects
 *   oSetIdAll,      // Set<string> of every id= in the file (for link checking)
 *   aLinks,         // all unique hrefs in the file (content links only)
 *   error           // set if the file could not be read
 * }
 */

import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import { type } from 'os';

const
  aVersion = [
    'parser.js.0-3-0.2026-06-25: name changes',
    'parser.js.0-2-0.2026-05-0: div-paragraph',
    'parser.js.0-1-0.2026-04-24: creation'
  ]

// ─── HTML utilities ───────────────────────────────────────────────────────────

/** Strip all HTML tags, decode basic entities, collapse whitespace.
 *  <br> tags are converted to \n FIRST so that name-entry lines stay separate.
 */
function fStripTags(html) {
  return html
    .replace(/<br\s*\/?>/gi, '\n')   // <br> → newline BEFORE stripping other tags
    .replace(/<[^>]+>/g, ' ')        // remove all other tags, replace with space to avoid word-joining
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/[ \t]{2,}/g, ' ')      // collapse only horizontal whitespace, keep \n
    .replace(/\n[ \t]+/g, '\n')      // trim leading spaces on each line
    .trim();
}

/** 
 * DOING: Extract all id= values from a block of HTML
 * OUTPUT: Set<string> of all id= values found, for link-checking against hrefs later.
*/
function fExtractId(sHtmlIn) {
  const rId = /\bid="([^"]+)"/g;
  const oSetIds = new Set();
  let aMtch;
  while ((aMtch = rId.exec(sHtmlIn)) !== null) oSetIds.add(aMtch[1]);
  return oSetIds;
}


/**
 * INPUT: a block of HTML content.
 * OUTPUT: array of all unique href=values, no clsHide links.
 */
function fExtractContentHrefs(sHtmlIn) {
  // Remove clsHide anchors entirely first
  const sCleaned = sHtmlIn.replace(/<a\s+class="clsHide"[^>]*>[\s\S]*?<\/a>/g, '');
  const rHref = /href="([^"]+)"/g;
  const aLinks = [];
  let aMtch;
  while ((aMtch = rHref.exec(sCleaned)) !== null) aLinks.push(aMtch[1]);
  return [...new Set(aLinks)]; // array unique hrefs only
}

// ─── Mcs name-entry parser ────────────────────────────────────────────────────

/**
 * DOING: find the-names of text of paragraph with lines: "* McsEngl.McshExml'att001-attribute, {2026-04-23}" 
 * OUTPUT: array of name objects.
 *   { sRaw, sBareName, sLang }
 */
function fReadNameEntries(sTextIn) {
  const aNameObj = [];
  for (const sLine of sTextIn.split('\n')) {
    // A name entry line: "* McsEngl.McshExml'att001-attribute, {2026-04-23}" 
    const aNameMtch = sLine.match(/\* (Mcs[A-Z][^\n,]+),/);
    if (!aNameMtch) continue;
    const sRawName = aNameMtch[1]; // "McsEngl.McshExml'att001 attribute"

    const sLang = 'lag' + sRawName.substring(3, 7);

    // sBareName: everything before the operator (or full string if none)
    const sBareName = sRawName.split('!⇒')[0].substr(8).trim(); // remove McsEngl.

    aNameObj.push({ sRaw: sRawName, sBareName, sLang });
  }
  return aNameObj;
}

// ─── paragraph parser ─────────────────────────────────────────────────────────

/**
 * DOING: Parse a single <p ...>...</p> HTML string.
 * OUTPUT: one object para:
 * {
 *   sType,         // Paragraph or ParaCnpt
 *   sId,           // value of id= attribute, or null
 *   sParaTitle,    // keyword before "::" in the first text line, lowercased, or null
 *   sText,         // full plain text content
 *   aNames,        // array of object-names
 *   aLinks,        // content hrefs
 * }
 */
function fReadPMcshPara(sPHtml) {
  const aIdMtch = sPHtml.match(/<p\b[^>]*\bid="([^"]+)"/);
  const sId = aIdMtch ? aIdMtch[1] : null;
  // console.log(`Parsing paragraph id=${sId}`);

  // Remove the clsHide self-anchor at the end (always the last <a> in a <p>)
  const sInner = sPHtml
    .replace(/^<p[^>]*>/, '')
    .replace(/<\/p>\s*$/, '')
    .replace(/<a\s+class="clsHide"[^>]*>[\s\S]*?<\/a>/g, '');

  const sText = fStripTags(sInner);

  // sParaTitle: first "text::" pattern
  const aTitleMtch = sText.match(/^([^:\n]+)::/);
  const sParaTitle = aTitleMtch ? aTitleMtch[1].trim() : null;

  // hrefs (content only)
  const aLinks = fExtractContentHrefs(sInner);

  // Name entries — parse regardless of sParaTitle, so paragraph-concepts can be detected
  const aNameObj = fReadNameEntries(sText);
  const aNames = aNameObj.map(o => o.sBareName);

  // A paragraph-concept: has an id AND has Mcs* names AND is NOT a name:: paragraph
  // (name::-paragraphs belong to the SectCnpt, not a separate concept)
  const bIsParaCnpt = 
    sId !== null &&
    aNameObj.length > 0 &&
    sParaTitle !== 'name';

  if (bIsParaCnpt) {
    return { sType: 'ParaCnpt', sId, sParaTitle, sText, aNameObj, aNames, aLinks };
  } else {
    return { sType: 'Paragraph', sId, sParaTitle, sText, aNameObj, aNames, aLinks };
  }
}

/**
 * DOING: Parse a single <div ...>...</div> HTML string.
 * OUTPUT: Returns one object paragraph:
 * {
 *   stype:         // 'Paragraph | ParaCnpt',
 *   sId,           // value of id= attribute, or null
 *   sParaTitle,    // keyword before "::" in the first text line, lowercased, or null
 *   sText,         // full plain text content
 *   aNames,        // array of object-names
 *   aLinks,        // content hrefs
 * }
 */
function fReadDivMcshPara(sDivHtml) {
  const aIdMtch = sDivHtml.match(/<div\b[^>]*\bid="([^"]+)"/);
  const sId = aIdMtch ? aIdMtch[1] : null;
  // console.log(`Parsing paragraph id=${sId}`);

  // Remove the clsHide self-anchor at the end (always the last <a> in a <p>)
  const sInner = sDivHtml
    .replace(/^<div[^>]*>/, '')
    .replace(/<\/div>\s*$/, '')
    .replace(/<a\s+class="clsHide"[^>]*>[\s\S]*?<\/a>/g, '');

  const sText = fStripTags(sInner);

  // sParaTitle: first "text::" pattern
  const aTitleMtch = sText.match(/^([^:\n]+)::/);
  const sParaTitle = aTitleMtch ? aTitleMtch[1].trim() : null;

  // hrefs (content only)
  const aLinks = fExtractContentHrefs(sInner);

  // Name entries — parse regardless of sParaTitle, so paragraph-Mcs can be detected
  const aNameObj = fReadNameEntries(sText);
  const aNames = aNameObj.map(o => o.sBareName);

  // A paragraph-Mcs: has an id AND has Mcs* names AND is NOT a name:: paragraph
  // (name:: paragraphs belong to the SectCnpt, not a separate concept)
  const bIsParaMcs = 
    sId !== null &&
    aNameObj.length > 0 &&
    sParaTitle !== 'name';

  if (bIsParaMcs) {
    return { sType: 'ParaCnpt', sId, sParaTitle, sText: sText, aNameObj, aNames, aLinks };
  } else {
    return { sType: 'Paragraph', sId, sParaTitle, sText: sText, aNameObj, aNames, aLinks };
  }
}


// ─── section splitter ─────────────────────────────────────────────────────────

/**
 * INPUT: raw HTML and extract every <section> block with its nesting info.
 * OUTPUT: array of { sId, sRawHtml, nDepth, sIdWhole } in document order,
 * ordered from outermost to innermost (i.e. whole appears before its parts).
 */
function fSplitSections(sHtmlIn) {
  const aSectionObj = [];
  const aSectStartObj = []; // { sId, start, nDepth }
  const rTagSectAtts = /<\/?section\b([^>]*)>/gi;
  let aMtch;

  while ((aMtch = rTagSectAtts.exec(sHtmlIn)) !== null) {
    const sTagSect = aMtch[0];
    const sTagSectAtts = aMtch[1] ?? '';
    const bTagSecClose = sTagSect.startsWith('</');

    if (!bTagSecClose) {
      const aIdMtch = sTagSectAtts.match(/\bid="([^"]+)"/);
      aSectStartObj.push({ sId: aIdMtch ? aIdMtch[1] : null, start: aMtch.index, nDepth: aSectStartObj.length });
    } else {
      const oSectStartLast = aSectStartObj.pop();
      if (!oSectStartLast) continue;
      const sIdWhole = aSectStartObj.length > 0 ? aSectStartObj[aSectStartObj.length - 1].sId : null;
      aSectionObj.push({
        sId: oSectStartLast.sId,
        sRawHtml: sHtmlIn.slice(oSectStartLast.start, aMtch.index + sTagSect.length),
        nDepth: oSectStartLast.nDepth,
        sIdWhole,
      });
    }
  }
  return fReverseOnlyNestedSections(aSectionObj);
}

function fReverseOnlyNestedSections(aSectionObj) {
  const aOut = [];
  let aGroup = [];

  function fFlushGroup() {
    if (aGroup.length === 0) return;

    const bHasNested = aGroup.some(o => o.nDepth > 0);

    if (bHasNested) {
      aGroup.sort((a, b) => {
        return a.nDepth - b.nDepth || a.start - b.start;
      });
    }

    aOut.push(...aGroup);
    aGroup = [];
  }

  for (const oSection of aSectionObj) {
    aGroup.push(oSection);

    // In your current closing-order output, a top-level section closes last.
    // So nDepth 0 means the current nested group is complete.
    if (oSection.nDepth === 0) {
      fFlushGroup();
    }
  }

  fFlushGroup();

  return aOut;
}

/**
 * DOING: finds only the "outer" HTML — i.e. with all DIRECT part <section>...</section> blocks
 *   replaced by empty strings.
 *   This is done iteratively (not with a greedy regex) to handle nesting correctly.
 * INPUT: the sRawHtml of a section.
 * OUTPUT: a-string of outer heading and paragraphs only.
 */
function fFindOuterSection(sRawSect) {
  // We strip sections that are direct parts only.
  // Strategy: track nDepth manually and blank out nested sections.
  const aResult = [];
  let nDepth = 0;
  let bInOwnSection = false; // have we passed the opening tag of rawHtml itself?
  const rSectTag = /<\/?section\b[^>]*>/gi;
  let nLast = 0;
  let aSectTagMtch;

  // The rawHtml starts with the opening <section> of the section itself.
  // nDepth 0 = inside this section's own content
  // nDepth 1 = inside a direct child <section>
  // We want to include text at nDepth 0, exclude nDepth >= 1.

  rSectTag.lastIndex = 0;
  while ((aSectTagMtch = rSectTag.exec(sRawSect)) !== null) {
    const sSectTag = aSectTagMtch[0];
    const bIsClose = sSectTag.startsWith('</');

    if (!bInOwnSection) {
      // First tag is the opening of the section itself — skip it
      bInOwnSection = true;
      nLast = aSectTagMtch.index + sSectTag.length;
      continue;
    }

    if (!bIsClose) {
      if (nDepth === 0) {
        // About to enter a child section: include text before it
        aResult.push(sRawSect.slice(nLast, aSectTagMtch.index));
        nLast = aSectTagMtch.index;
      }
      nDepth++;
    } else {
      nDepth--;
      if (nDepth === 0) {
        // Just closed a child section: skip its content
        nLast = aSectTagMtch.index + sSectTag.length;
      } else if (nDepth < 0) {
        // Closing our own section
        aResult.push(sRawSect.slice(nLast, aSectTagMtch.index));
        nLast = aSectTagMtch.index + sSectTag.length;
        break;
      }
    }
  }

  // Anything remaining at nDepth 0
  if (nLast < sRawSect.length && nDepth === 0) {
    aResult.push(sRawSect.slice(nLast));
  }

  // returns a-string of outer heading and paragraphs only, with all nested sections removed
  return aResult.join('');
}

// ─── section parser ───────────────────────────────────────────────────────────

/**
 * INPUT: one RawSect-object.
 * OUTPUT: one Sect-object.
 * We only parse McshParagraphs that are DIRECTLY in this section, not inside
 * nested part <section> elements, to avoid double-counting.
 */
function fReadSection({ sId, sRawHtml, nDepth, sIdWhole }) {
  //console.log(`   Parsing section: sId=${sId} nDepth=${nDepth} sIdWhole=${sIdWhole}`);
  // "Outer HTML": the section's own content with nested <section>...</section>
  // blocks removed, so paragraph parsing only hits direct-child <p> elements.
  const sOuterSect = fFindOuterSection(sRawHtml);  // "<h? id=... <p ...</a></p>"
  // console.log(`     Outer: ${sOuterSect}`);

  // Heading: first <h1|h2|h3|..|h9> in outer
  const aHeadMtch = sOuterSect.match(/<h([1-9])\b[^>]*>([\s\S]*?)<\/h\1>/i);
  const sSectTitle  = aHeadMtch ? fStripTags(aHeadMtch[2]) : '';
  const nHeadingLevel = aHeadMtch ? parseInt(aHeadMtch[1]) : 1;

  // All direct-child McshParagraphs
  const aSectPara = [];
  const rP = /<p\b[^>]*>[\s\S]*?<\/p>/gi;
  // McshParagraphs could-be and div with p|table|ol|ul members
  const rDiv = /<div\b[^>]*>[\s\S]*?<\/div>/gi;
  let aParaMtch;
  while ((aParaMtch = rP.exec(sOuterSect)) !== null) {
    const p = fReadPMcshPara(aParaMtch[0]);
    aSectPara.push(p);
  }
  while ((aParaMtch = rDiv.exec(sOuterSect)) !== null) {
    const p = fReadDivMcshPara(aParaMtch[0]);
    aSectPara.push(p);
  }

  // Index paragraphs by title for quick lookup
  const oParaByTitle = {};
  for (const p of aSectPara) {
    if (p.sParaTitle) {
      if (!oParaByTitle[p.sParaTitle]) oParaByTitle[p.sParaTitle] = [];
      oParaByTitle[p.sParaTitle].push(p);
    }
  }

  // Name entries — from the name:: paragraph(s) only
  const aNames = (oParaByTitle['name'] ?? []).flatMap(p => p.aNames);
  const aNameObj = (oParaByTitle['name'] ?? []).flatMap(p => p.aNameObj);

  // All content hrefs across the entire section (including nested children)
  const aLinks = fExtractContentHrefs(sRawHtml);

  return {
    type: 'SectCnpt',
    sId,
    sSectTitle,
    nHeadingLevel,
    nDepth,
    sIdWhole,
    aParaObj: aSectPara,
    oParaByTitle,
    aNameObj,
    aNames,
    aLinks,
  };
}

// ─── public file parser ───────────────────────────────────────────────────────
/**
 * INPUT: one McsFile given its path.
 * OUTPUT: one FileCnpt-object:
 * {
 *   sType: 'FileCnpt',
 *   sFilePath, sFileName, sFileDir,
 *   sFileTitle,     // text from <title> (name part only)
 *   sVersion,        // e.g. "McsCor000015.1-4-0.2026-03-30"
 *   oFileMcsSect,   // the file's own concept (usually the idOverview section)
 *   aSectMcsObj,    // array of all SectCnpt objects in the file
 *   aParaObj,       // array of all paragraph objects in the file
 *   oSetIdAll,      // Set<string> of every id= in the file (for link checking)
 *   aLinks,         // array of all content hrefs in the file
 * }
 */
export function parseFile(sFilePath) {
  // sFilePath: C:\xampp\htdocs\dirMcsh\dirCor\McsCor000015.last.html
  let sFileRaw;
  try {
    sFileRaw = fs.readFileSync(sFilePath, 'utf8');
  } catch (e) {
    return {
      sType: 'FileCnpt',
      sFilePath,
      sFileName: path.basename(sFilePath), // McsCor000015.last.html
      sFileDir: path.basename(path.dirname(sFilePath)), // dirCor
      error: e.message,
      oFileMcsSect: null,
      aSectMcsObj: [],
      aParaObj: [],
      oSetIdAll: new Set(),
      aLinks: [],
    };
  }

  // ── <title> ──────────────────────────────────────────────────────────────
  const aTitleMach = sFileRaw.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const titleRaw = aTitleMach ? fStripTags(aTitleMach[1]) : '';
  const versionM = titleRaw.match(/\(([^)]+)\)/);
  const sVersion  = versionM ? versionM[1].trim() : null; //McsCor000015.1-7-0.2026-06-22
  const sFileTitle = titleRaw.replace(/\s*\([^)]*\)\s*/g, '').trim(); //Mcs.McshExml!=example-McsHitp

  // ── all id= values (for broken-anchor checking) ───────────────────────────
  const oSetIdAll = fExtractId(sFileRaw);

  // ── all content hrefs in the file ────────────────────────────────────────
  const aLinks = fExtractContentHrefs(sFileRaw);

  // ── split into sections ───────────────────────────────────────────────────
  const aRawSectObj = fSplitSections(sFileRaw);

  const aSectionMcs    = [];
  const aParaObj  = [];
  // file-Mcs = the idOverview section (always the file's own concept)
  let oFileMcsSect = null;

  for (const oRawSec of aRawSectObj) {
    // Skip infrastructure sections
    if (oRawSec.sId === 'idMeta' || oRawSec.sId === 'idHeader'
       || oRawSec.sId === 'idSupport' || oRawSec.sId === 'idComment') continue;

    // Parse as a SectCnpt candidate
    const oSec = fReadSection(oRawSec);
    // console.log(`Parsed section id=${sec.sId} title="${sec.sSectTitle}" with ${sec.aNames.length} names and ${sec.aParaObj.length} paragraphs.`);
    if (oSec.sType === 'SectCnpt') aSectionMcs.push(oSec);
    if (oSec.sId === 'idOverview') oFileMcsSect = oSec;

    // Collect paragraph-Mcs from this section's direct paragraphs
    const outer2 = fFindOuterSection(oRawSec.sRawHtml);
    const rP2 = /<p\b[^>]*>[\s\S]*?<\/p>/gi;
    // paragraphs could-be and div with p|table|ol|ul members
    const rDiv2 = /<div\b[^>]*>[\s\S]*?<\/div>/gi;
    let aParaMtch;
    while ((aParaMtch = rP2.exec(outer2)) !== null) {
      aParaObj.push(fReadPMcshPara(aParaMtch[0]));
    }
    while ((aParaMtch = rDiv2.exec(outer2)) !== null) {
      aParaObj.push(fReadDivMcshPara(aParaMtch[0]));
    }
  }

  return {
    sType: 'FileCnpt',
    sFilePath,
    sFileName: path.basename(sFilePath),
    sFileDir: path.basename(path.dirname(sFilePath)),
    sFileTitle,
    sVersion,
    oFileMcsSect,
    aSectMcsObj: aSectionMcs,
    aParaObj,
    oSetIdAll,
    aLinks,
  };
}

// ─── directory scanner ────────────────────────────────────────────────────────

export function parseAllFiles(dirPath) {
  let aFilePaths;
  try {
    const pattern = path.join(dirPath, '**/*.last.html').replace(/\\/g, '/');
    aFilePaths = globSync(pattern, { ignore: '**/node_modules/**' });
  } catch {
    aFilePaths = walkDir(dirPath);
  }
  // returns array of FileCnpt-objects
  return aFilePaths.map(fp => parseFile(fp));
}

function walkDir(dir) {
  let results = [];
  for (const item of fs.readdirSync(dir)) {
    if (item === 'node_modules') continue;
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      results = results.concat(walkDir(full));
    } else if (item.endsWith('.last.html')) {
      results.push(full);
    }
  }
  return results;
}
