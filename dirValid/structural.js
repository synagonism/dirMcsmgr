/**
 * structural.js
 * Rule-based consistency checks — fast, no AI needed.
 *
 * Uses the data model from parser.js:
 *   oFile → { sType, sPathFile, sNameFile, oSectOverview, aoCnptSect, aoPara,
 *             oSetId, aLinks, oMapIdLine, oMapLinkLine, nLineTitle }
 *   oSect → { sType, sNameId, sIdWhole_elmt, sNameTitle, nHeadingLevel, nDepth,
 *             aoPara, oParaByTitle, aName, aoName, aLinks }
 *   oPara → { sType, sNameId, sNameTitle, sText, aoName, aName, aLinks }
 *
 * Checks:
 *  S01  cnptFile missing idOverview section
 *  S02  cnptSect missing description:: paragraph
 *  S03  cnptSect has description:: but it is empty (only placeholder "·")
 *  S04  cnptSect missing name:: paragraph
 *  S05  cnptSect name:: has zero valid Mcs* entries
 *  S06  Duplicate McsEngl sName across entire knowledge base
 *  S07  Internal link: target file does not exist
 *  S08  Internal anchor link (#id) not found in target file's oSetId
 *  S09  File missing <title> version string
 *  S10  evoluting:: dates not in YYYY-MM-DD format
 *  S12  cnptSect has no heading
 */

import path from 'path';
import fs from 'fs';

const
  aVersion = [
    'structural.js.0-3-0.2026-09-04: naming convention',
    'structural.js.0-2-0.2026-05-02: DATE not TeX',
    'structural.js.0-1-0.2026-04-27: creation'
  ]

// ─── helpers ──────────────────────────────────────────────────────────────────

function fIssue(sLevel, sCode, sNameFile, oSectOrNull, sMessage, nLine = null) {
  return {
    sLevel,
    sCode,
    sNameFile,
    sConcept: oSectOrNull?.sNameTitle ?? null,
    sIdConcept: oSectOrNull?.sNameId ?? null,
    nLine,
    sMessage,
  };
}

/** Build a map: relativeFilePath → Set<sNameId>,  for anchor validation */
function fBuildMapAnchor(aoFile, sPathDir) {
  const oMap = new Map();
  for (const oFile of aoFile) {
    const sRel = path.relative(sPathDir, oFile.sPathFile).replace(/\\/g, '/');
    oMap.set(sRel, oFile.oSetId);
    oMap.set(oFile.sNameFile, oFile.oSetId); // also index by bare filename
  }
  return oMap;
}

/** Build a map: sName → [{ sNameFile, sNameId, sTitle }] for duplicate detection */
function fBuildMapName(aoFile) {
  const oMap = new Map();
  for (const oFile of aoFile) {
    // cnptSect names
    for (const oSect of oFile.aoCnptSect) {
      for (const oName of oSect.aoName) {
        if (oName.sLago !== 'lagEngl') continue; // only check McsEngl for duplicates
        if (!oMap.has(oName.sName)) oMap.set(oName.sName, []);
        oMap.get(oName.sName).push({ sNameFile: oFile.sNameFile, sNameId: oSect.sNameId, sTitle: oSect.sNameTitle });
      }
    }
    // paragraph-Mcs names
    for (const oPara of oFile.aoPara) {
      if (oPara.sNameTitle !== 'name') {
        for (const oName of oPara.aoName) {
          if (oName.sLago !== 'lagEngl') continue;
          if (!oMap.has(oName.sName)) oMap.set(oName.sName, []);
          oMap.get(oName.sName).push({ sNameFile: oFile.sNameFile, sNameId: oPara.sNameId, sTitle: oPara.sNameTitle });
        }
      }
    }
  }
  return oMap;
}

/** Resolve an href (relative path) to { bExternal, sRelFile, sAnchor, sPathAbs } */
function fResolveHref(sHref, sDirFile, sPathDir) {
  // Any absolute URI scheme (http:, https:, mailto:, tel:, data: …) is external.
  if (/^[a-z][a-z0-9+.-]*:/i.test(sHref)) return { bExternal: true };
  // Root-relative ("/x") and protocol-relative ("//host/x") hrefs are resolved by
  // the browser against the web server document root, which the validator cannot
  // know from the scan directory. Skip them like external links to avoid false
  // "file not found" (e.g. the shared "/dirMcsmgr/mMcsh2.css" stylesheet).
  if (sHref.startsWith('/')) return { bExternal: true };
  if (sHref.startsWith('#')) return { bExternal: false, sRelFile: null, sAnchor: sHref.slice(1) };

  const [sFilePart, sAnchor] = sHref.split('#');
  const sPathAbs = path.resolve(sDirFile, sFilePart);
  const sRel = path.relative(sPathDir, sPathAbs).replace(/\\/g, '/');
  return { bExternal: false, sRelFile: sRel, sAnchor: sAnchor ?? null, sPathAbs };
}

// ─── individual checks ────────────────────────────────────────────────────────

// ❌ S01  cnptFile missing idOverview section
function fCheckCnptFile(aoFile) {
  const aoIssue = [];
  for (const oFile of aoFile) {
    if (!oFile.oSectOverview) {
      aoIssue.push(fIssue('ERROR', 'S01', oFile.sNameFile, null,
        `File has no <section id="idOverview"> — cnptFile identity section is missing`));
    }
  }
  return aoIssue;
}

// ⚠️ [S02] cnptSect  has no description:: paragraph
// ⚠️ [S03] cnptSect  has an empty/placeholder description:: (only "·" or "×")
function fCheckDescription(aoFile) {
  const aoIssue = [];
  for (const oFile of aoFile) {
    for (const oSect of oFile.aoCnptSect) {
      if (oSect.sNameTitle.indexOf('( link )') > 1) continue;
      const aoParaDesc = oSect.oParaByTitle['description'] ?? [];
      if (aoParaDesc.length === 0) {
        aoIssue.push(fIssue('WARN', 'S02', oFile.sNameFile, oSect,
          `cnptSect "${oSect.sNameTitle}" (${oSect.sNameId}) has no description:: paragraph`,
          oFile.oMapIdLine.get(oSect.sNameId) ?? null));
        continue;
      }
      // Check for empty/placeholder description (just "·" or whitespace)
      for (const oPara of aoParaDesc) {
        const sContent = oPara.sText
          .replace(/^description::\s*/i, '')
          .replace(/[·\s×]/g, '')
          .trim();
        if (sContent.length === 0) {
          aoIssue.push(fIssue('WARN', 'S03', oFile.sNameFile, oSect,
            `cnptSect "${oSect.sNameTitle}" (${oSect.sNameId}) has an empty/placeholder description:: (only "·" or "×")`,
            oFile.oMapIdLine.get(oPara.sNameId) ?? oFile.oMapIdLine.get(oSect.sNameId) ?? null));
        }
      }
    }
  }
  return aoIssue;
}

// ⚠️ [S04] cnptSect  has no name:: paragraph
//⚠️  [S05] cnptSect  name:: paragraph has no valid Mcs* entries
function fCheckName(aoFile) {
  const aoIssue = [];
  for (const oFile of aoFile) {
    for (const oSect of oFile.aoCnptSect) {
      if (oSect.sNameTitle.indexOf('( link )') > 1) continue;
      if (!oSect.oParaByTitle['name']) {
        // This shouldn't happen (cnptSect requires names), but guard anyway
        aoIssue.push(fIssue('WARN', 'S04', oFile.sNameFile, oSect,
          `cnptSect "${oSect.sNameTitle}" (${oSect.sNameId}) has no name:: paragraph`,
          oFile.oMapIdLine.get(oSect.sNameId) ?? null));
      } else if (oSect.aName.length === 0) {
        aoIssue.push(fIssue('WARN', 'S05', oFile.sNameFile, oSect,
          `cnptSect "${oSect.sNameTitle}" (${oSect.sNameId}) name:: paragraph has no valid Mcs* entries`,
          oFile.oMapIdLine.get(oSect.sNameId) ?? null));
      }
    }
  }
  return aoIssue;
}

// ⚠️  [S12] cnptSect  has no TITLE
function fCheckTitle(aoFile) {
  const aoIssue = [];
  for (const oFile of aoFile) {
    for (const oSect of oFile.aoCnptSect) {
      if (!oSect.sNameTitle || oSect.sNameTitle.trim() === '') {
        aoIssue.push(fIssue('WARN', 'S12', oFile.sNameFile, oSect,
          `cnptSect (${oSect.sNameId}) has no TITLE`,
          oFile.oMapIdLine.get(oSect.sNameId) ?? null));
      }
    }
  }
  return aoIssue;
}

// ❌ [S06] Duplicate McsEngl-name "exmlMcsh" appears in: McsCorTest.last.html#idName, McsCorTest.last.html#idName
function fCheckDuplicateName(aoFile) {
  const aoIssue = [];
  const oMapName = fBuildMapName(aoFile);
  const oMapFileByName = new Map(aoFile.map(oFile => [oFile.sNameFile, oFile]));
  for (const [sName, aoOccur] of oMapName) {
    if (aoOccur.length > 1) {
      const sLoc = aoOccur.map(oOccur => `${oOccur.sNameFile}#${oOccur.sNameId}`).join(', ');
      // Report once per duplicate group, at the second occurrence's line
      const oOcc = aoOccur[1];
      const nLine = oMapFileByName.get(oOcc.sNameFile)?.oMapIdLine.get(oOcc.sNameId) ?? null;
      aoIssue.push(fIssue('ERROR', 'S06', oOcc.sNameFile, null,
        `Duplicate McsEngl-name "${sName}" appears in: ${sLoc}`, nLine));
    }
  }
  return aoIssue;
}

function fCheckLinkBroken(aoFile, sPathDir) {
  const aoIssue = [];
  const oMapAnchor = fBuildMapAnchor(aoFile, sPathDir);
  const oSetRel = new Set(
    aoFile.map(oFile => path.relative(sPathDir, oFile.sPathFile).replace(/\\/g, '/'))
  );

  // ❌ [S07] Broken link: FILE not found "Mcs0000008.last.html" (from "McsCorTest.last.html/../Mcs0000008.last.html#idMwsvvvv")
  // external anchors NOT ditected.
  // ⚠️ [S08] Same-file anchor #idMcshExmlprcc not found in "McsCorTest.last.html"
  // clsHide anchors NOT detected.
  for (const oFile of aoFile) {
    const sDirFile = path.dirname(oFile.sPathFile);
    // Check all links in the file (already deduplicated by parser)
    for (const sHref of oFile.aLinks) {
      if (!sHref || sHref === '#') continue;
      const oResolved = fResolveHref(sHref, sDirFile, sPathDir);
      if (oResolved.bExternal) continue;
      const nLine = oFile.oMapLinkLine.get(sHref) ?? null;

      if (oResolved.sRelFile) {
        // File existence check
        const bExists = oSetRel.has(oResolved.sRelFile) || fs.existsSync(oResolved.sPathAbs);
        if (!bExists) {
          aoIssue.push(fIssue('ERROR', 'S07', oFile.sNameFile, null,
            `Broken link: FILE not found "${oResolved.sRelFile}" (from "${oFile.sNameFile}/${sHref}")`, nLine));
          continue;
        }
        // Anchor check
        if (oResolved.sAnchor) {
          const oSetIdTarget = oMapAnchor.get(oResolved.sRelFile)
            ?? oMapAnchor.get(path.basename(oResolved.sRelFile));
          if (oSetIdTarget && !oSetIdTarget.has(oResolved.sAnchor)) {
            aoIssue.push(fIssue('WARN', 'S08', oFile.sNameFile, null,
              `Possibly broken anchor: #${oResolved.sAnchor} not found in "${oResolved.sRelFile}"`, nLine));
          }
        }
      } else if (oResolved.sAnchor) {
        // Same-file anchor
        if (!oFile.oSetId.has(oResolved.sAnchor)) {
          aoIssue.push(fIssue('WARN', 'S08', oFile.sNameFile, null,
            `Same-file anchor #${oResolved.sAnchor} not found in "${oFile.sNameFile}"`, nLine));
        }
      }
    }
  }
  return aoIssue;
}

// ⚠️ [S09] File "McsCorTest.last.html" has no version string in <title> (expected e.g. McsXxx.1-2-3.2026-01-01)
// ℹ️ [S09] File "McsCorTest.last.html" version "McsCorTest.1-0.2026-04-22" does not match pattern McsXxx.N-N-N.YYYY-MM-DD
function fCheckVersion(aoFile) {
  const aoIssue = [];
  for (const oFile of aoFile) {
    if (!oFile.sVersion) {
      aoIssue.push(fIssue('WARN', 'S09', oFile.sNameFile, null,
        `File "${oFile.sNameFile}" has no version string in <title> (expected e.g. McsXxx.1-2-3.2026-01-01)`,
        oFile.nLineTitle ?? null));
    } else if (!oFile.sVersion.match(/Mcs\w+\.\d+-\d+-\d+\.\d{4}-\d{2}-\d{2}/)) {
      aoIssue.push(fIssue('INFO', 'S09', oFile.sNameFile, null,
        `File "${oFile.sNameFile}" version "${oFile.sVersion}" does not match pattern McsXxx.N-N-N.YYYY-MM-DD`,
        oFile.nLineTitle ?? null));
    }
  }
  return aoIssue;
}

// ⚠️ [S10] DATE has NO {YYYY-MM-DD} format in line: "· {2022-4-27} evoluting ..."
// in file: "McsCorTest.last.html"
function fCheckDate(aoFile) {
  const aoIssue = [];
  const rDate1 = /\{\d{4}-\d{2}-\d{2}\}/;
  const rDate2 = /\{\d{4}-\d{2}\}/;
  const rDate3 = /\{\d{4}\}/;
  for (const oFile of aoFile) {
    for (const oSect of oFile.aoCnptSect) {
      for (const oPara of oSect.aoPara) {
        for (const sLine of oPara.sText.split('\n')) {
          // contains {d-} not Tex not goodDates
          if (/\{[\d-]+\}/.test(sLine) && !/\\\(\s*(.*?)\s*\\\)/.test(sLine) &&
             !rDate1.test(sLine) && !rDate2.test(sLine) && !rDate3.test(sLine)) {
            aoIssue.push(fIssue('WARN', 'S10', oFile.sNameFile, oSect,
              `DATE has NO {YYYY-MM-DD} format in line: "${sLine.trim()}" in file: "${oFile.sNameFile}"`,
              oFile.oMapIdLine.get(oPara.sNameId) ?? oFile.oMapIdLine.get(oSect.sNameId) ?? null));
          }
        }
      }
    }
  }
  return aoIssue;
}

// ─── main export ──────────────────────────────────────────────────────────────

export function fRunChecksStructural(aoFile, sPathDir) {
  const aoAll = [];

  process.stdout.write('   S01    File-Mcs (idOverview)... ');
  const aoFileMcs = fCheckCnptFile(aoFile);
  aoAll.push(...aoFileMcs);
  console.log(`${aoFileMcs.length} issues`);

  process.stdout.write('   S02/S03 Section descriptions... ');
  const aoDesc = fCheckDescription(aoFile);
  aoAll.push(...aoDesc);
  console.log(`${aoDesc.length} issues`);

  process.stdout.write('   S04/S05 Section names... ');
  const aoName = fCheckName(aoFile);
  aoAll.push(...aoName);
  console.log(`${aoName.length} issues`);

  process.stdout.write('   S12    Section headings... ');
  const aoTitle = fCheckTitle(aoFile);
  aoAll.push(...aoTitle);
  console.log(`${aoTitle.length} issues`);

  process.stdout.write('   S06    Duplicate McsEngl names... ');
  const aoDup = fCheckDuplicateName(aoFile);
  aoAll.push(...aoDup);
  console.log(`${aoDup.length} issues`);

  process.stdout.write('   S07/S08 Broken links & anchors... ');
  const aoLink = fCheckLinkBroken(aoFile, sPathDir);
  aoAll.push(...aoLink);
  console.log(`${aoLink.length} issues`);

  process.stdout.write('   S09    Version strings... ');
  const aoVersion = fCheckVersion(aoFile);
  aoAll.push(...aoVersion);
  console.log(`${aoVersion.length} issues`);

  process.stdout.write('   S10    Evoluting dates... ');
  const aoDate = fCheckDate(aoFile);
  aoAll.push(...aoDate);
  console.log(`${aoDate.length} issues`);

  return aoAll;
}
