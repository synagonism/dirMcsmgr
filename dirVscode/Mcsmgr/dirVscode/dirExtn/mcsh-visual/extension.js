'use strict';
/*
 * Mcsh-Visual — a-visual-editor for Mcs*.last.html and Hitp*.last.html files.
 *
 * The editor is a VS Code custom editor that looks like a browser: an address bar
 * with back / forward / reload and a "..." overflow menu (File → Save; Format →
 * Bold, Color, Url), hosting an <iframe> that renders the page from the LOCAL
 * SERVER (so it looks exactly like the live site). A bridge served with the page
 * (Mcsmgr/mMcshVisual.js, loaded only when the URL carries ?mcsv=1) makes the
 * whole page editable and reports each change as (id, ordinal, text/markup).
 *
 * Editing model ("full", not surgical): every reported change is mirrored into
 * the in-memory document immediately (kept dirty, unsaved). On Save the ENTIRE
 * document is re-serialised to the canonical 2/4-space Mcsh format (format.js)
 * and written to disk; the iframe then reloads to show the canonical page.
 */

const vscode = require('vscode');
const fs = require('fs');
const model = require('./src/model');
const { format } = require('./src/format');

const VIEW_TYPE = 'mcsv.visualEditor';

/** Uris that currently have a Mcsh-Visual editor open (so we reformat on save). */
const managed = new Set();
/** Uris mid-save: the canonical-format edit is ours, so don't treat it as external. */
const savingUris = new Set();

function activate(context) {
  const provider = new McsVisualProvider(context);
  context.subscriptions.push(
    vscode.window.registerCustomEditorProvider(VIEW_TYPE, provider, {
      webviewOptions: { retainContextWhenHidden: true },
      supportsMultipleEditorsPerDocument: false,
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand('mcsv.open', async (uri) => {
      const target = uri || (vscode.window.activeTextEditor && vscode.window.activeTextEditor.document.uri);
      if (!target) return;
      // Left column: the raw source text editor.
      await vscode.window.showTextDocument(target, { viewColumn: vscode.ViewColumn.One, preview: false });
      // Right column: the visual custom editor, which receives focus (default).
      await vscode.commands.executeCommand('vscode.openWith', target, VIEW_TYPE, {
        viewColumn: vscode.ViewColumn.Beside,
      });
      // Give the visual (right) 60% of the width, source (left) 40%.
      try {
        await vscode.commands.executeCommand('vscode.setEditorLayout', {
          orientation: 0, // side-by-side columns
          groups: [{ size: 0.39 }, { size: 0.61 }],
        });
      } catch (e) { /* layout is best-effort */ }
    })
  );
  // Canonicalise on EVERY save (File → Save, Ctrl+S, or programmatic) of a doc
  // that has a Mcsh-Visual editor open.
  context.subscriptions.push(
    vscode.workspace.onWillSaveTextDocument((e) => {
      const uri = e.document.uri.toString();
      if (!managed.has(uri)) return;
      savingUris.add(uri);                     // the format edit below is ours, not external
      const src = e.document.getText();
      const out = format(src);
      if (out === src) return;
      const full = new vscode.Range(e.document.positionAt(0), e.document.positionAt(src.length));
      e.waitUntil(Promise.resolve([vscode.TextEdit.replace(full, out)]));
    })
  );
}

class McsVisualProvider {
  constructor(context) {
    this.context = context;
  }

  /**
   * @param {vscode.TextDocument} document
   * @param {vscode.WebviewPanel} panel
   */
  async resolveCustomTextEditor(document, panel, _token) {
    const webview = panel.webview;
    webview.options = { enableScripts: true, localResourceRoots: [this.context.extensionUri] };

    const key = document.uri.toString();
    managed.add(key);

    // The file currently being edited. Starts as the opened document, but the
    // visual is a browser: navigating (link-icon / URL bar) retargets this to the
    // page now shown, so edits/saves follow. `null` = a view-only page.
    let activeDoc = document;
    const addedKeys = new Set();                 // docs we added to `managed` (cleanup on dispose)
    const docRootBase = this._docRootBase(document);

    const url = this._localhostUrl(document);
    webview.html = this._buildShell(webview, url);

    let selfEditing = false;

    const toChrome = (m) => webview.postMessage(Object.assign({ source: 'mcsv-host' }, m));
    const sendIds = () => toChrome({ type: 'ids', ids: activeDoc ? model.collectIds(activeDoc.getText()) : [] });
    const status = (m) => toChrome({ type: 'status', message: m });
    const reloadFrame = () => toChrome({ type: 'reload' });

    // --- source <-> visual cursor sync ----------------------------------------
    // Flattened cores, cached per document version so cursor-move sync doesn't
    // re-parse the whole file each time.
    let coresCache = { version: -1, list: [] };
    const coresList = () => {
      if (activeDoc && coresCache.version !== activeDoc.version) {
        coresCache = { version: activeDoc.version, list: model.flattenCores(activeDoc.getText()) };
      }
      return coresCache.list;
    };
    // The left source is a real TextEditor (the custom editor isn't in this list).
    const sourceEditor = () => vscode.window.visibleTextEditors.find(
      (ed) => activeDoc && ed.document.uri.toString() === activeDoc.uri.toString());
    let suppressSourceSyncUntil = 0;   // ignore selection events we cause ourselves
    let syncTimer = null;

    // The webview panel is bound to the ORIGINAL document, but after navigation we
    // edit a different `activeDoc`. So drive the tab title ourselves: show the file
    // now being edited, and — since the bound doc stays clean for navigated files —
    // prefix an unsaved marker when the navigated activeDoc is dirty. (For the
    // original file VS Code's own dirty dot still shows.)
    let navDirty = false;   // deterministic unsaved flag for the navigated activeDoc
    const baseName = (doc) => (doc ? doc.uri.path.split('/').pop() : '');
    const isNavigated = () => !!activeDoc && activeDoc.uri.toString() !== document.uri.toString();
    const updateTitle = () => {
      panel.title = ((isNavigated() && navDirty) ? '● ' : '') + baseName(activeDoc || document);
    };

    // Mirror a bridge-reported change into the active document (unsaved). Returns ok.
    const applyReplace = async (msg, newText) => {
      if (!activeDoc) return false;
      const loc = model.locate(activeDoc.getText(), msg);
      if (!loc) return false;
      if (newText === activeDoc.getText().slice(loc.s, loc.e)) return true;
      const range = new vscode.Range(activeDoc.positionAt(loc.s), activeDoc.positionAt(loc.e));
      const we = new vscode.WorkspaceEdit();
      we.replace(activeDoc.uri, range, newText);
      selfEditing = true;
      const ok = await vscode.workspace.applyEdit(we);
      selfEditing = false;
      if (ok && isNavigated()) { navDirty = true; updateTitle(); }   // mark visual tab unsaved
      return ok;
    };

    // Retarget the edit file when the page navigates (bridge `nav` message).
    const onNavigate = async (href) => {
      toChrome({ type: 'setUrl', url: href });               // address bar
      const uri = this._pathFromUrl(href, docRootBase);
      if (uri && fs.existsSync(uri.fsPath)) {
        try {
          const doc = await vscode.workspace.openTextDocument(uri);
          activeDoc = doc;
          navDirty = !!doc.isDirty;                             // fresh file's unsaved state
          const k = uri.toString();
          managed.add(k); addedKeys.add(k);
          // Switch the LEFT source pane to the navigated file (keep focus on the visual).
          await vscode.window.showTextDocument(uri, { viewColumn: vscode.ViewColumn.One, preserveFocus: true, preview: false });
          sendIds();
          updateTitle();                                      // visual tab → navigated file name
          status('editing ' + uri.path.split('/').pop());
          return;
        } catch (e) { /* fall through to view-only */ }
      }
      activeDoc = null;                                       // external / not an editable Mcs page
      navDirty = false;
      toChrome({ type: 'ids', ids: [] });
      updateTitle();
      status('view-only');
    };

    // Add / remove a <br> marker-line. Structural changes shift ordinals, so we
    // apply the surgical edit then save — canonicalising and reloading the frame
    // (via onDidSave) re-renders and re-annotates from one source of truth.
    const applyStructure = async (msg) => {
      if (!activeDoc) return false;
      const text = activeDoc.getText();
      const off = model.coreStart(text, msg);
      if (off == null) return false;
      let edit = null;
      if (msg.op === 'lineAfter') {
        const r = model.buildLineAfter(text, off, msg.placeholder);
        if (r) edit = { s: r.insertAt, e: r.insertAt, text: r.text };
      } else if (msg.op === 'lineDelete') {
        const r = model.buildLineDelete(text, off);
        if (r) edit = { s: r.removeS, e: r.removeE, text: '' };
      }
      if (!edit) return false;
      const range = new vscode.Range(activeDoc.positionAt(edit.s), activeDoc.positionAt(edit.e));
      const we = new vscode.WorkspaceEdit();
      we.replace(activeDoc.uri, range, edit.text);
      selfEditing = true;
      const ok = await vscode.workspace.applyEdit(we);
      selfEditing = false;
      if (ok && isNavigated()) { navDirty = true; updateTitle(); }
      return ok;
    };

    const changeSub = vscode.workspace.onDidChangeTextDocument((e) => {
      if (!activeDoc || e.document.uri.toString() !== activeDoc.uri.toString()) return;
      updateTitle();                         // reflect dirty on the visual tab (navigated files)
      if (selfEditing) return;               // our own live edit — iframe already shows it
      if (savingUris.has(e.document.uri.toString())) return; // our canonical-format-on-save edit
      if (e.contentChanges.length === 0) return;
      // Changed elsewhere (e.g. the raw editor). Refresh the id list; the iframe
      // still renders from disk, so only reload after it is saved.
      sendIds();
    });

    const saveSub = vscode.workspace.onDidSaveTextDocument((doc) => {
      if (!activeDoc || doc.uri.toString() !== activeDoc.uri.toString()) return;
      savingUris.delete(doc.uri.toString());
      navDirty = false; updateTitle();        // clear the unsaved marker on the visual tab
      status('saved · ' + new Date().toLocaleTimeString());
      reloadFrame();                          // reload re-renders + re-annotates from the written file
    });

    // Source -> visual: a cursor move in the source scrolls the visual to that core.
    const selSub = vscode.window.onDidChangeTextEditorSelection((e) => {
      if (!activeDoc || e.textEditor.document.uri.toString() !== activeDoc.uri.toString()) return;
      if (Date.now() < suppressSourceSyncUntil) return;              // our own programmatic move
      if (e.kind === vscode.TextEditorSelectionChangeKind.Command) return;
      const off = activeDoc.offsetAt(e.selections[0].active);
      if (syncTimer) clearTimeout(syncTimer);
      syncTimer = setTimeout(() => {
        const hit = model.coreAtOffset(coresList(), off);
        if (hit) toChrome({ type: 'syncTo', id: hit.id, ord: hit.ord });
      }, 100);
    });

    const msgSub = webview.onDidReceiveMessage(async (msg) => {
      if (!msg) return;
      try {
        // --- messages from the browser chrome (address bar / ... menu) --------
        if (msg.source === 'mcsv-chrome') {
          switch (msg.type) {
            case 'ready': toChrome({ type: 'setUrl', url: this._displayUrl(document) }); break; // ids come from bridge `nav`
            case 'save': if (activeDoc) await activeDoc.save(); break;
            case 'cmd': toChrome({ type: 'cmd', cmd: msg.cmd }); break; // relay to bridge
            case 'openRaw': vscode.commands.executeCommand('vscode.openWith', (activeDoc || document).uri, 'default'); break;
          }
          return;
        }
        // --- messages from the page bridge -----------------------------------
        if (msg.source !== 'mcsv') return;
        switch (msg.type) {
          case 'ready': break;                       // ids are sent from `nav` (below)
          case 'save': if (activeDoc) await activeDoc.save(); break; // Ctrl+S from the iframe
          case 'nav': await onNavigate(msg.href); break;
          case 'url': toChrome({ type: 'setUrl', url: msg.href }); break; // hash jump: address bar only

          case 'edit': {
            const plain = String(msg.text == null ? '' : msg.text).replace(/\r?\n/g, ' ');
            const ok = await applyReplace(msg, model.escapeText(plain));
            if (!ok) { status('edit out of sync — reloading'); reloadFrame(); }
            else status('edited · unsaved');
            break;
          }
          case 'replace': {
            const ok = await applyReplace(msg, String(msg.text == null ? '' : msg.text));
            if (!ok) { status('format out of sync — reloading'); reloadFrame(); }
            else status('formatted · unsaved');
            break;
          }
          case 'structure': {
            const ok = await applyStructure(msg);
            if (ok) await document.save(); // format + write + reload via onDidSave
            else { status('line op out of sync — reloading'); reloadFrame(); }
            break;
          }
          case 'sync': {                       // visual click -> move source caret + select line
            const loc = activeDoc && model.locate(activeDoc.getText(), msg);
            if (!loc) break;
            let ed = sourceEditor();
            if (!ed) ed = await vscode.window.showTextDocument(activeDoc.uri, { viewColumn: vscode.ViewColumn.One, preserveFocus: true, preview: false });
            const start = ed.document.positionAt(loc.s), end = ed.document.positionAt(loc.e);
            suppressSourceSyncUntil = Date.now() + 250;   // don't bounce back as source->visual
            ed.selection = new vscode.Selection(start, end);
            ed.revealRange(new vscode.Range(start, end), vscode.TextEditorRevealType.InCenterIfOutsideViewport);
            break;
          }
          case 'status': status(msg.message); break;
          case 'openRaw': vscode.commands.executeCommand('vscode.openWith', (activeDoc || document).uri, 'default'); break;
          case 'bridgeError': console.error('[mcsv bridge]', msg.message); break;
        }
      } catch (err) {
        selfEditing = false;
        console.error('[mcsv]', err);
      }
    });

    panel.onDidDispose(() => {
      managed.delete(key); savingUris.delete(key);
      addedKeys.forEach((k) => { managed.delete(k); savingUris.delete(k); }); // files we retargeted to while browsing
      if (syncTimer) clearTimeout(syncTimer);
      changeSub.dispose(); saveSub.dispose(); selSub.dispose(); msgSub.dispose();
    });
  }

  // --- url helpers -----------------------------------------------------------

  _relPath(document) {
    const cfg = vscode.workspace.getConfiguration('mcsv');
    const marker = String(cfg.get('docRootFolder') || 'htdocs');
    const fsPath = document.uri.fsPath.replace(/\\/g, '/');
    const needle = '/' + marker.replace(/^\/+|\/+$/g, '') + '/';
    const i = fsPath.toLowerCase().indexOf(needle.toLowerCase());
    if (i < 0) return null;
    return fsPath.slice(i + needle.length);
  }

  _origin() {
    const cfg = vscode.workspace.getConfiguration('mcsv');
    return String(cfg.get('serverOrigin') || 'http://localhost').replace(/\/+$/, '');
  }

  /** Absolute fs path of the server document-root (up to and incl. the marker). */
  _docRootBase(document) {
    const cfg = vscode.workspace.getConfiguration('mcsv');
    const marker = String(cfg.get('docRootFolder') || 'htdocs');
    const fsPath = document.uri.fsPath.replace(/\\/g, '/');
    const needle = '/' + marker.replace(/^\/+|\/+$/g, '') + '/';
    const i = fsPath.toLowerCase().indexOf(needle.toLowerCase());
    if (i < 0) return null;
    return fsPath.slice(0, i + needle.length); // e.g. "C:/xampp/htdocs/"
  }

  /**
   * Reverse of _displayUrl: map a page URL back to the workspace file, but only
   * when it is a real, in-doc-root, editable Mcs*.last.html or Hitp*.last.html. Returns a Uri or null
   * (null → treat the page as view-only). Guards origin, path-traversal, pattern.
   */
  _pathFromUrl(href, docRootBase) {
    if (!href || !docRootBase) return null;
    const origin = this._origin();
    if (href.slice(0, origin.length + 1) !== origin + '/') return null; // external
    let rel = href.slice(origin.length + 1).split('#')[0].split('?')[0];
    try { rel = decodeURIComponent(rel); } catch (e) { return null; }
    rel = rel.replace(/\\/g, '/');
    if (/(^|\/)\.\.(\/|$)/.test(rel)) return null;            // reject .. path traversal
    const fsPath = docRootBase + rel;
    if (fsPath.toLowerCase().indexOf(docRootBase.toLowerCase()) !== 0) return null;
    const base = fsPath.split('/').pop();
    if (!/^(Mcs|Hitp).*\.last\.html$/i.test(base)) return null; // only editable Mcs/Hitp pages
    return vscode.Uri.file(fsPath);
  }

  /** Clean URL shown in the address bar (no editor flag). */
  _displayUrl(document) {
    const rel = this._relPath(document);
    if (!rel) return '';
    return `${this._origin()}/${rel.split('/').map(encodeURIComponent).join('/')}`;
  }

  /** URL actually loaded in the iframe (carries ?mcsv=1 so the bridge loads). */
  _localhostUrl(document) {
    const disp = this._displayUrl(document);
    return disp ? disp + '?mcsv=1' : null;
  }

  // --- webview shell: the browser chrome + iframe ----------------------------

  _buildShell(webview, url) {
    const nonce = makeNonce();
    const origin = this._origin();
    const frameSrc = [origin, 'http://localhost', 'http://127.0.0.1', 'https://localhost'].join(' ');

    if (!url) {
      return `<!DOCTYPE html><html><head><meta charset="utf-8">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'nonce-${nonce}';">
<style>body{font:13px system-ui;padding:20px;color:#ddd;background:#1e1e1e}code{background:#333;padding:1px 5px;border-radius:3px}button{margin-top:8px}</style>
</head><body>
<h3>Mcsh-Visual</h3>
<p>This file isn't under your server document-root, so the live view can't load.</p>
<p>Expected the path to contain <code>/htdocs/</code> (configurable via <code>mcsv.docRootFolder</code> / <code>mcsv.serverOrigin</code>).</p>
<button id="raw">Open the raw text editor</button>
<script nonce="${nonce}">const v=acquireVsCodeApi();document.getElementById('raw').onclick=()=>v.postMessage({source:'mcsv-chrome',type:'openRaw'});</script>
</body></html>`;
    }

    return `<!DOCTYPE html><html><head><meta charset="utf-8">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; frame-src ${frameSrc}; style-src 'unsafe-inline'; script-src 'nonce-${nonce}';">
<style>
  :root{--bar:#2d2d2d;--bar2:#3a3a3a;--line:#1a1a1a;--fg:#ddd;--accent:#2b6cb0}
  html,body{margin:0 !important;padding:0 !important;height:100%;background:#1e1e1e;overflow:hidden;font:13px system-ui}
  #chrome{display:flex;align-items:stretch;gap:1px;height:26px;padding:2px 0;background:var(--bar);border-bottom:1px solid var(--line);box-sizing:border-box}
  .navbtn{width:22px;border:0;border-radius:4px;background:transparent;color:var(--fg);cursor:pointer;font-size:13px;line-height:1;display:flex;align-items:center;justify-content:center}
  .navbtn:hover{background:var(--bar2)}
  .navbtn:disabled{opacity:.35;cursor:default;background:transparent}
  /* URL bar: compact (≈ VS Code tab height), grows to fill all remaining width */
  #url{flex:1 1 auto;min-width:120px;align-self:stretch;box-sizing:border-box;border:1px solid var(--line);border-radius:4px;background:#1e1e1e;color:var(--fg);padding:0 8px;font:12px ui-monospace,monospace;outline:none}
  #url:focus{border-color:var(--accent)}
  #menuWrap{position:relative;display:flex}
  #menu{position:absolute;left:0;top:calc(100% + 2px);min-width:150px;background:#252526;border:1px solid var(--line);border-radius:6px;box-shadow:0 6px 20px rgba(0,0,0,.5);padding:4px;display:none;z-index:20}
  #menu.open{display:block}
  .grp{font:600 10px system-ui;text-transform:uppercase;letter-spacing:.04em;opacity:.55;padding:6px 10px 2px}
  .item{position:relative;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:6px 10px;border-radius:4px;color:var(--fg);cursor:pointer;white-space:nowrap}
  .item:hover{background:var(--accent);color:#fff}
  .item .kbd{opacity:.5;font:11px ui-monospace,monospace}
  .item.has-sub>.caret{opacity:.6}
  .submenu{position:absolute;left:100%;top:-5px;min-width:120px;background:#252526;border:1px solid var(--line);border-radius:6px;box-shadow:0 6px 20px rgba(0,0,0,.5);padding:4px;display:none}
  .item.has-sub:hover>.submenu{display:block}
  .sep{height:1px;background:var(--line);margin:4px 2px}
  #status{position:absolute;left:8px;bottom:6px;font:11px system-ui;color:#bbb;background:rgba(0,0,0,.45);padding:3px 8px;border-radius:10px;z-index:15;pointer-events:none;opacity:0;transition:opacity .2s}
  #status.show{opacity:1}
  #hint{position:absolute;left:0;right:0;bottom:0;font:12px system-ui;color:#eee;background:#5a1e1e;padding:8px 12px;display:none;z-index:16}
  #hint button{color:#fff;background:#333;border:1px solid #555;border-radius:3px;padding:2px 8px;cursor:pointer}
  #frameWrap{position:absolute;left:0;right:0;top:26px;bottom:0;background:#1e1e1e}
  iframe{border:0;width:100%;height:100%;display:block}
</style>
</head><body>
<div id="chrome">
  <button class="navbtn" id="back" title="Back">&#8592;</button>
  <button class="navbtn" id="fwd" title="Forward">&#8594;</button>
  <button class="navbtn" id="reload" title="Reload">&#8635;</button>
  <div id="menuWrap">
    <button class="navbtn" id="more" title="Commands">&#8943;</button>
    <div id="menu">
      <div class="item has-sub">File<span class="caret">&#9656;</span>
        <div class="submenu">
          <div class="item" data-cmd="save">Save<span class="kbd">&#8984;S</span></div>
          <div class="item" data-cmd="openRaw">Open raw text editor</div>
        </div>
      </div>
      <div class="item has-sub">Edit<span class="caret">&#9656;</span>
        <div class="submenu">
          <div class="item" data-cmd="addLine">Add line</div>
          <div class="item" data-cmd="removeLine">Remove line</div>
        </div>
      </div>
      <div class="item has-sub">Format<span class="caret">&#9656;</span>
        <div class="submenu">
          <div class="item" data-cmd="bold"><b>Bold</b></div>
          <div class="item has-sub">Color<span class="caret">&#9656;</span>
            <div class="submenu">
              <div class="item" data-cmd="red"><span style="color:#e06">Red</span></div>
              <div class="item" data-cmd="green"><span style="color:#3c3">Green</span></div>
            </div>
          </div>
          <div class="item" data-cmd="url">Url&#8230;</div>
        </div>
      </div>
    </div>
  </div>
  <input id="url" spellcheck="false" value="">
</div>
<div id="frameWrap"><iframe id="f" src="${escapeAttr(url)}" allow="clipboard-read; clipboard-write"></iframe></div>
<div id="status"></div>
<div id="hint"></div>

<script nonce="${nonce}">
  const vscode = acquireVsCodeApi();
  const f = document.getElementById('f');
  const url = document.getElementById('url');
  const menu = document.getElementById('menu');
  const statusEl = document.getElementById('status');
  const hint = document.getElementById('hint');
  const back = document.getElementById('back');
  const fwd = document.getElementById('fwd');
  let ready = false, statusT = null;
  const EDIT_FLAG = '?mcsv=1';

  function toChrome(m){ m.source='mcsv-chrome'; vscode.postMessage(m); }
  function showStatus(m){ statusEl.textContent=m||''; statusEl.classList.add('show'); if(statusT)clearTimeout(statusT); statusT=setTimeout(()=>statusEl.classList.remove('show'),2600); }
  function loadUrl(u){ if(!u)return; if(!/[?&]mcsv=/.test(u)) u += (u.indexOf('?')<0?'?':'&')+'mcsv=1'; f.src=u; }
  // The iframe is cross-origin (localhost), so contentWindow.location.reload()
  // throws AND f.src=f.src is served from the webview's cache. Refetch with a
  // fresh cache-buster. Strip ALL existing _r (global) and insert before the
  // #hash so reloads never accumulate ...&_r=..&_r=..
  function bust(url){ var hash='',h=url.indexOf('#'); if(h>=0){hash=url.slice(h);url=url.slice(0,h);} url=url.replace(/[?&]_r=\d+/g,''); url+=(url.indexOf('?')<0?'?':'&')+'_r='+Date.now(); return url+hash; }
  function hardReload(){ f.src = bust(f.src); }

  // history.back()/forward() are cross-origin from here (they throw), so relay to
  // the bridge inside the iframe, which is same-origin and can drive its history.
  function toFrame(type){ try{ f.contentWindow.postMessage({source:'mcsv-host', type}, '*'); }catch(_){} }

  // address bar
  url.addEventListener('keydown', e => { if(e.key==='Enter'){ e.preventDefault(); loadUrl(url.value.trim()); } });
  // Ctrl+S / Cmd+S from the chrome (address bar / toolbar) → save via the host.
  window.addEventListener('keydown', e => { if((e.ctrlKey||e.metaKey) && (e.key==='s'||e.key==='S')){ e.preventDefault(); toChrome({type:'save'}); } });
  document.getElementById('reload').onclick = hardReload;
  back.onclick = () => toFrame('histBack');
  fwd.onclick  = () => toFrame('histFwd');

  // ... menu — never steal focus/selection from the iframe (preventDefault on
  // mousedown), so Format commands still see the caret when the menu is clicked.
  const more = document.getElementById('more');
  more.addEventListener('mousedown', e => e.preventDefault());
  menu.addEventListener('mousedown', e => e.preventDefault());
  more.onclick = (e) => { e.stopPropagation(); menu.classList.toggle('open'); };
  document.addEventListener('click', () => menu.classList.remove('open'));
  menu.addEventListener('click', (e) => {
    const item = e.target.closest('.item[data-cmd]');
    if(!item) return;
    e.stopPropagation();
    const cmd = item.getAttribute('data-cmd');
    menu.classList.remove('open');
    if(cmd==='save') toChrome({type:'save'});
    else if(cmd==='openRaw') toChrome({type:'openRaw'});
    else toChrome({type:'cmd', cmd});      // bold / red / green / url -> bridge
  });

  // relay: iframe(bridge) <-> extension
  window.addEventListener('message', (e) => {
    const d = e.data || {};
    if (d.source === 'mcsv') { if(d.type==='ready') ready=true; vscode.postMessage(d); return; }
    if (d.source === 'mcsv-host') {
      // Post-save reload: do it inside the bridge (location.replace → no new
      // history entry, so Back still steps through pages, not reload-states). The
      // bridge is always present here (we only reload after editing a loaded page).
      if (d.type === 'reload') { toFrame('reloadPage'); return; }
      if (d.type === 'setUrl') { url.value = d.url || ''; return; }
      if (d.type === 'status') { showStatus(d.message); return; }
      try { f.contentWindow.postMessage(d, '*'); } catch(_){}
    }
  });

  toChrome({type:'ready'});

  // If the bridge never announces itself, the local server is probably off.
  setTimeout(() => {
    if (ready) return;
    hint.style.display='block';
    hint.innerHTML='The live view did not load. Is your local server (XAMPP) running? <button id="rawb">Open raw editor</button>';
    const b=document.getElementById('rawb'); if(b) b.onclick=()=>toChrome({type:'openRaw'});
  }, 6000);
</script>
</body></html>`;
  }
}

function escapeAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}
function makeNonce() {
  let s = '';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 24; i++) s += chars.charAt(Math.floor(Math.random() * chars.length));
  return s;
}

function deactivate() {}

module.exports = { activate, deactivate };
