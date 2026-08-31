# Mcsh-Visual — visual-editor (`Mcs*/Hitp*.last.html`)

A VSCode custom editor that looks and works like a **browser tab** for the dirMcsh
pages (`Mcs*.last.html` and the same-format `Hitp*.last.html`): an address-bar with **← → ⟳ ⋯** menu,
hosting the page rendered by your **real local server** (so it looks exactly like
the live site — ToC, previews, dark mode, `h1…h9` styling).

On **Save** the *entire* document is re-serialised to the canonical Mcsh format.

## The ⋯ menu (sits right after ⟳, like VSCode's "…" menu)

Three flyout submenus (File / Edit / Format):

- **File → Save** — writes the file, re-serialised to canonical form.
- **File → Open raw text editor** — reopen the file in VSCode's default editor.
- **Edit → Add line** — add a `<br>` marker-line below the focused line (matching
  its marker · * × …).
- **Edit → Remove line** — delete the focused `<br>` marker-line.
- **Format → Bold** — wrap the selection in `<strong>`.
- **Format → Color → Red / Green** — `<span class="clsColorRed|clsColorGreen">`.
- **Format → Url…** — wrap the selection in `<a class="clsPreview" href="…">`.

The address-bar shows `http://localhost/dirMcsh/…`; **←/→/⟳** drive the
iframe; typing a URL + Enter navigates it (editing only attaches to the file you
opened, so navigating elsewhere is safe). Add/Remove line change structure, so
they save + reload (caret and scroll are restored); text and format edits stay
unsaved until **File → Save**.

## Canonical serialization (what Save produces)

Save runs a **re-indenter** (`src/format.js`), not a re-flow — it never moves
content between lines, it only fixes each line's leading indentation:

- `<section>` / `<header>` at the top level → column 0; nested `<section>` and
  every `<h1..h9>` / `<p>` / `<div>` → **2 spaces**.
- the block's continuation lines (`<br>` segments, the trailing
  `<a class="clsHide">` tail, standalone `</p></hN></div>`) → **4 spaces**.
- `<head>` / prologue, blank lines, and anything it doesn't recognise as Mcsh
  grammar — **tables, `<pre>`/terminal dumps, wrapped inline links** — are copied
  through **byte-for-byte**, so hand-maintained (and semantically-significant)
  whitespace is never disturbed. Files with unbalanced `<section>` tags keep
  their section indentation untouched (the tool never guesses on malformed input).

It is idempotent: saving an already-canonical file changes nothing.

## How editing maps back to the file

The page is rendered by XAMPP with `?mcsv=1`, which makes `mMcsh2.js` load the
bridge `Mcsmgr/mMcshVisual.js` (never on the public site). The bridge makes each
content text run editable and reports changes as `(id, ordinal, text/markup)`.
Because the render keeps your source `id`s and text order, the extension maps
`(id, ordinal)` back to the exact byte range (via `parse5`) and mirrors the change
into the **unsaved** document. After a format command the bridge re-annotates
locally so ordinals stay in sync without a reload. Only ids that exist in your
source are editable — generated chrome (ToC, menu, search) is left alone.

## The one change to your site

`Mcsmgr/mMcsh2.js` has a second guarded loader (next to the `mcsw` one):

```js
if (new URLSearchParams(location.search).has('mcsv')) {
  import('./mMcshVisual.js?v=' + Date.now()).catch(e => console.error('mcsv bridge load failed:', e))
}
```

It only runs with `?mcsv=1` (inside this editor) — **no effect on the public
site**. Removing the editor = delete `Mcsmgr/mMcshVisual.js` and this block (and
the `mcsv` line in `Mcsmgr/.htaccess`).

## Run it (development)

1. Open this folder (`tool/mcsh-visual`) in VSCode.
2. `npm install` (installs `parse5`; a copy is already vendored in `node_modules`).
3. Press **F5** → an *Extension Development Host* opens with `dirMcsh` loaded.
4. Make sure XAMPP is running. Open any `Mcs*.last.html` or `Hitp*.last.html`, then run **Mcsh: Open in
   Mcsh-Visual** (or click the title-bar button). It opens a **vertical split**:
   the **raw source on the left** and the **visual editor on the right** (focus on
   the right). It registers as an *option*, so it never overrides the default text
   editor; **Reopen Editor With… → Mcsh-Visual** still opens single-pane.

Both panes back the same document: visual edits show in the source live; saving
either pane canonicalises the file and reloads the visual.

## Tests (offline)

- `node src/test-format.js` — safety of the canonical re-indenter across every
  `dirCor/*.last.html`: idempotent, content-preserving, and verbatim-preserving
  for tables / `<pre>` / unrecognised lines. `--diff` prints each re-indent.

## Notes / limits (v1)

- Editing covers **text** and **inline format** (Bold / Color / Url) of existing
  content, plus the whole-file canonical Save. Adding/removing paragraphs or
  sections is done in the raw editor for now.
- Edits stay **unsaved** until Save (VSCode shows the dirty dot; Ctrl+S also
  saves-and-canonicalises). Use Undo in the raw editor to revert.
- The page `<title>` and generated chrome are not editable.
