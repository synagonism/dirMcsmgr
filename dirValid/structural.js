/**
 * structural.js
 * Rule-based consistency checks — fast, no AI needed.
 *
 * Uses the data model from the new parser:
 *   oFileMcs → { type, sFilePath, sFileName, oFileMcsSect, aSectMcsObj, aParaObj, oSetIdAll, aLinks }
 *   oSectMcs → { type, sId, sIdWhole, sSectTitle, nHeadingLevel, nDepth, 
 *                aParaObj, oParaByTitle, aNames, aLinks }
 *   oPara → { type, sId, parentSectionId, text, aNames, aLinks }
 *
 * Checks:
 *  S01  FileCnpt missing idOverview section
 *  S02  SectCnpt missing description:: paragraph
 *  S03  SectCnpt has description:: but it is empty (only placeholder "·")
 *  S04  SectCnpt missing name:: paragraph
 *  S05  SectCnpt name:: has zero valid Mcs* entries
 *  S06  Duplicate McsEngl sBareName across entire knowledge base
 *  S07  Internal link: target file does not exist
 *  S08  Internal anchor link (#id) not found in target file's oSetIdAll
 *  S09  File missing <title> version string
 *  S10  evoluting:: dates not in YYYY-MM-DD format
 *  S11  paragraph-Mcs has no id attribute (cannot be linked to)
 *  S12  SectCnpt has no heading
 */

import path from 'path';
import fs from 'fs';

const
  aVersion = [
    'structural.js.0-2-0.2026-05-02: DATE not TeX',
    'structural.js.0-1-0.2026-04-27: creation'
  ]

// ─── helpers ──────────────────────────────────────────────────────────────────

function issue(level, code, sFileName, sectionOrNull, message, nLine = null) {
  return {
    level,
    code,
    file: sFileName,
    concept: sectionOrNull?.sSectTitle ?? null,
    conceptId: sectionOrNull?.sId ?? null,
    line: nLine,
    message,
  };
}

/** Build a map: relativeFilePath → Set<sId>,  for anchor validation */
function buildAnchorMap(files, dirPath) {
  const oMap = new Map();
  for (const f of files) {
    const rel = path.relative(dirPath, f.sFilePath).replace(/\\/g, '/');
    oMap.set(rel, f.oSetIdAll);
    oMap.set(f.sFileName, f.oSetIdAll); // also index by bare filename
  }
  return oMap;
}

/** Build a map: sBareName → [{ sFileName, sId, title }] for duplicate detection */
function buildNameMap(files) {
  const oMap = new Map();
  for (const f of files) {
    // SectCnpt names
    for (const sec of f.aSectMcsObj) {
      for (const n of sec.aNameObj) {
        if (n.sLang !== 'lagEngl') continue; // only check McsEngl for duplicates
        if (!oMap.has(n.sBareName)) oMap.set(n.sBareName, []);
        oMap.get(n.sBareName).push({ sFileName: f.sFileName, sId: sec.sId, title: sec.sSectTitle });
      }
    }
    // paragraph-Mcs names
    for (const p of f.aParaObj) {
      if (p.sParaTitle !== 'name') {
        for (const n of p.aNameObj) {
          if (n.sLang !== 'lagEngl') continue;
          if (!oMap.has(n.sBareName)) oMap.set(n.sBareName, []);
          oMap.get(n.sBareName).push({ sFileName: f.sFileName, sId: p.sId, title: p.sParaTitle });
        }
      }
    }
  }
  return oMap;
}

/** Resolve an href (relative path) to { relFile, anchor } */
function resolveHref(href, sFileDir, dirPath) {
  // Any absolute URI scheme (http:, https:, mailto:, tel:, data: …) is external.
  if (/^[a-z][a-z0-9+.-]*:/i.test(href)) return { external: true };
  // Root-relative ("/x") and protocol-relative ("//host/x") hrefs are resolved by
  // the browser against the web server document root, which the validator cannot
  // know from the scan directory. Skip them like external links to avoid false
  // "file not found" (e.g. the shared "/dirMcsmgr/mMcsh2.css" stylesheet).
  if (href.startsWith('/')) return { external: true };
  if (href.startsWith('#')) return { external: false, relFile: null, anchor: href.slice(1) };

  const [filePart, anchor] = href.split('#');
  const abs = path.resolve(sFileDir, filePart);
  const rel = path.relative(dirPath, abs).replace(/\\/g, '/');
  return { external: false, relFile: rel, anchor: anchor ?? null, absPath: abs };
}

// ─── individual checks ────────────────────────────────────────────────────────

// ❌ S01  FileCnpt missing idOverview section
function checkFileMcs(files) {
  const issues = [];
  for (const f of files) {
    if (!f.oFileMcsSect) {
      issues.push(issue('ERROR', 'S01', f.sFileName, null,
        `File has no <section id="idOverview"> — FileCnpt identity section is missing`));
    }
  }
  return issues;
}

// ⚠️ [S02] SectCnpt  has no description:: paragraph
// ⚠️ [S03] SectCnpt  has an empty/placeholder description:: (only "·" or "×")
function checkSectionMcsDescription(files) {
  const issues = [];
  for (const f of files) {
    for (const sec of f.aSectMcsObj) {
      if (sec.sSectTitle.indexOf('( link )') > 1) continue;
      const descParas = sec.oParaByTitle['description'] ?? [];
      if (descParas.length === 0) {
        issues.push(issue('WARN', 'S02', f.sFileName, sec,
          `SectCnpt "${sec.sSectTitle}" (${sec.sId}) has no description:: paragraph`,
          f.oIdLineMap.get(sec.sId) ?? null));
        continue;
      }
      // Check for empty/placeholder description (just "·" or whitespace)
      for (const p of descParas) {
        const content = p.sText
          .replace(/^description::\s*/i, '')
          .replace(/[·\s×]/g, '')
          .trim();
        if (content.length === 0) {
          issues.push(issue('WARN', 'S03', f.sFileName, sec,
            `SectCnpt "${sec.sSectTitle}" (${sec.sId}) has an empty/placeholder description:: (only "·" or "×")`,
            f.oIdLineMap.get(p.sId) ?? f.oIdLineMap.get(sec.sId) ?? null));
        }
      }
    }
  }
  return issues;
}

// ⚠️ [S04] SectCnpt  has no name:: paragraph
//⚠️  [S05] SectCnpt  name:: paragraph has no valid Mcs* entries
function checkSectionMcsName(files) {
  const issues = [];
  for (const f of files) {
    for (const sec of f.aSectMcsObj) {
      if (sec.sSectTitle.indexOf('( link )') > 1) continue;
      if (!sec.oParaByTitle['name']) {
        // This shouldn't happen (SectCnpt requires names), but guard anyway
        issues.push(issue('WARN', 'S04', f.sFileName, sec,
          `SectCnpt "${sec.sSectTitle}" (${sec.sId}) has no name:: paragraph`,
          f.oIdLineMap.get(sec.sId) ?? null));
      } else if (sec.aNames.length === 0) {
        issues.push(issue('WARN', 'S05', f.sFileName, sec,
          `SectCnpt "${sec.sSectTitle}" (${sec.sId}) name:: paragraph has no valid Mcs* entries`,
          f.oIdLineMap.get(sec.sId) ?? null));
      }
    }
  }
  return issues;
}

// ⚠️  [S12] SectCnpt  has no TITLE
function checkSectionMcsTitle(files) {
  const issues = [];
  for (const f of files) {
    for (const sec of f.aSectMcsObj) {
      if (!sec.sSectTitle || sec.sSectTitle.trim() === '') {
        issues.push(issue('WARN', 'S12', f.sFileName, sec,
          `SectCnpt (${sec.sId}) has no TITLE`,
          f.oIdLineMap.get(sec.sId) ?? null));
      }
    }
  }
  return issues;
}

// ❌ [S06] Duplicate McsEngl-name "exmlMcsh" appears in: McsCorTest.last.html#idName, McsCorTest.last.html#idName
function checkDuplicateNames(files) {
  const issues = [];
  const nameMap = buildNameMap(files);
  const oFileByName = new Map(files.map(f => [f.sFileName, f]));
  for (const [sBareName, occurrences] of nameMap) {
    if (occurrences.length > 1) {
      const locs = occurrences.map(o => `${o.sFileName}#${o.sId}`).join(', ');
      // Report once per duplicate group, at the second occurrence's line
      const oOcc = occurrences[1];
      const nLine = oFileByName.get(oOcc.sFileName)?.oIdLineMap.get(oOcc.sId) ?? null;
      issues.push(issue('ERROR', 'S06', oOcc.sFileName, null,
        `Duplicate McsEngl-name "${sBareName}" appears in: ${locs}`, nLine));
    }
  }
  return issues;
}

function checkBrokenLinks(files, dirPath) {
  const issues = [];
  const anchorMap = buildAnchorMap(files, dirPath);
  const existingRels = new Set(
    files.map(f => path.relative(dirPath, f.sFilePath).replace(/\\/g, '/'))
  );

  // ❌ [S07] Broken link: FILE not found "Mcs0000008.last.html" (from "McsCorTest.last.html/../Mcs0000008.last.html#idMwsvvvv")
  // external anchors NOT ditected.
  // ⚠️ [S08] Same-file anchor #idMcshExmlprcc not found in "McsCorTest.last.html"
  // clsHide anchors NOT detected.
  for (const f of files) {
    const sFileDir = path.dirname(f.sFilePath);
    // Check all links in the file (already deduplicated by parser)
    for (const href of f.aLinks) {
      if (!href || href === '#') continue;
      const resolved = resolveHref(href, sFileDir, dirPath);
      if (resolved.external) continue;
      const nLine = f.oLinkLineMap.get(href) ?? null;

      if (resolved.relFile) {
        // File existence check
        const exists = existingRels.has(resolved.relFile) || fs.existsSync(resolved.absPath);
        if (!exists) {
          issues.push(issue('ERROR', 'S07', f.sFileName, null,
            `Broken link: FILE not found "${resolved.relFile}" (from "${f.sFileName}/${href}")`, nLine));
          continue;
        }
        // Anchor check
        if (resolved.anchor) {
          const targetIds = anchorMap.get(resolved.relFile)
            ?? anchorMap.get(path.basename(resolved.relFile));
          if (targetIds && !targetIds.has(resolved.anchor)) {
            issues.push(issue('WARN', 'S08', f.sFileName, null,
              `Possibly broken anchor: #${resolved.anchor} not found in "${resolved.relFile}"`, nLine));
          }
        }
      } else if (resolved.anchor) {
        // Same-file anchor
        if (!f.oSetIdAll.has(resolved.anchor)) {
          issues.push(issue('WARN', 'S08', f.sFileName, null,
            `Same-file anchor #${resolved.anchor} not found in "${f.sFileName}"`, nLine));
        }
      }
    }
  }
  return issues;
}

// ⚠️ [S09] File "McsCorTest.last.html" has no version string in <title> (expected e.g. McsXxx.1-2-3.2026-01-01)
// ℹ️ [S09] File "McsCorTest.last.html" version "McsCorTest.1-0.2026-04-22" does not match pattern McsXxx.N-N-N.YYYY-MM-DD
function checkVersionString(files) {
  const issues = [];
  for (const f of files) {
    if (!f.sVersion) {
      issues.push(issue('WARN', 'S09', f.sFileName, null,
        `File "${f.sFileName}" has no version string in <title> (expected e.g. McsXxx.1-2-3.2026-01-01)`,
        f.nTitleLine ?? null));
    } else if (!f.sVersion.match(/Mcs\w+\.\d+-\d+-\d+\.\d{4}-\d{2}-\d{2}/)) {
      issues.push(issue('INFO', 'S09', f.sFileName, null,
        `File "${f.sFileName}" version "${f.sVersion}" does not match pattern McsXxx.N-N-N.YYYY-MM-DD`,
        f.nTitleLine ?? null));
    }
  }
  return issues;
}

// ⚠️ [S10] DATE has NO {YYYY-MM-DD} format in line: "· {2022-4-27} evoluting ..."
// in file: "McsCorTest.last.html"
function checkDates(files) {
  const issues = [];
  const goodDate1 = /\{\d{4}-\d{2}-\d{2}\}/;
  const goodDate2 = /\{\d{4}-\d{2}\}/;
  const goodDate3 = /\{\d{4}\}/;
  for (const f of files) {
    for (const sec of f.aSectMcsObj) {
      for (const p of sec.aParaObj) {
        for (const line of p.sText.split('\n')) {
          // contains {d-} not Tex not goodDates
          if (/\{[\d-]+\}/.test(line) && !/\\\(\s*(.*?)\s*\\\)/.test(line) &&
             !goodDate1.test(line) && !goodDate2.test(line) && !goodDate3.test(line)) {
            issues.push(issue('WARN', 'S10', f.sFileName, sec,
              `DATE has NO {YYYY-MM-DD} format in line: "${line.trim()}" in file: "${f.sFileName}"`,
              f.oIdLineMap.get(p.sId) ?? f.oIdLineMap.get(sec.sId) ?? null));
          }
        }
      }
    }
  }
  return issues;
}

// ─── main export ──────────────────────────────────────────────────────────────

export function runStructuralChecks(files, dirPath) {
  const all = [];

  process.stdout.write('   S01    File-Mcs (idOverview)... ');
  const fm = checkFileMcs(files);
  all.push(...fm);
  console.log(`${fm.length} issues`);

  process.stdout.write('   S02/S03 Section descriptions... ');
  const sd = checkSectionMcsDescription(files);
  all.push(...sd);
  console.log(`${sd.length} issues`);

  process.stdout.write('   S04/S05 Section names... ');
  const sn = checkSectionMcsName(files);
  all.push(...sn);
  console.log(`${sn.length} issues`);

  process.stdout.write('   S12    Section headings... ');
  const sh = checkSectionMcsTitle(files);
  all.push(...sh);
  console.log(`${sh.length} issues`);

  process.stdout.write('   S06    Duplicate McsEngl names... ');
  const dn = checkDuplicateNames(files);
  all.push(...dn);
  console.log(`${dn.length} issues`);

  process.stdout.write('   S07/S08 Broken links & anchors... ');
  const bl = checkBrokenLinks(files, dirPath);
  all.push(...bl);
  console.log(`${bl.length} issues`);

  process.stdout.write('   S09    Version strings... ');
  const vs = checkVersionString(files);
  all.push(...vs);
  console.log(`${vs.length} issues`);

  process.stdout.write('   S10    Evoluting dates... ');
  const ev = checkDates(files);
  all.push(...ev);
  console.log(`${ev.length} issues`);

  return all;
}
