const vscode = require('vscode')
const path = require('path')

/**
 * Maps a file under the web root (…\htdocs\) to its local-server URL and
 * opens it in VS Code's integrated browser (Simple Browser).
 *   C:\xampp\htdocs\dirMcsh\dirCor\McsCor000015.last.html
 *   -> http://localhost/dirMcsh/dirCor/McsCor000015.last.html
 */
function activate(context) {
  const disposable = vscode.commands.registerCommand('mcs.openInLocalServer', async () => {
    const editor = vscode.window.activeTextEditor
    if (!editor) {
      vscode.window.showWarningMessage('Mcs: no active file to open.')
      return
    }

    const sFsPath = editor.document.uri.fsPath
    // find the web root marker: \htdocs\
    const sMarker = path.sep + 'htdocs' + path.sep
    const nIdx = sFsPath.toLowerCase().indexOf(sMarker.toLowerCase())
    if (nIdx === -1) {
      vscode.window.showWarningMessage('Mcs: file is not under an htdocs web root.')
      return
    }

    const sRel = sFsPath.substring(nIdx + sMarker.length).split(path.sep).join('/')
    const sUrl = 'http://localhost/' + sRel

    try {
      // integrated browser (Simple Browser)
      await vscode.commands.executeCommand('simpleBrowser.show', sUrl)
    } catch (e) {
      // fallback: let VS Code route it (integrated if openLocalhostLinks is on)
      await vscode.env.openExternal(vscode.Uri.parse(sUrl))
    }
  })

  context.subscriptions.push(disposable)
}

function deactivate() {}

module.exports = { activate, deactivate }
