const vscode = require('vscode');

function activate(context) {
  const disposable = vscode.commands.registerCommand('extension.htmlLtReplace', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    const document = editor.document;
    const fullText = document.getText();

    // Start searching from the current caret position.
    // This matches:
    // - forward search
    // - no wrap-around
    // - current buffer only
    const startOffset = document.offsetAt(editor.selection.active);
    const matchOffset = fullText.indexOf('<', startOffset);

    if (matchOffset === -1) {
      vscode.window.showInformationMessage('No next "<" found.');
      return;
    }

    const start = document.positionAt(matchOffset);
    const end = document.positionAt(matchOffset + 1);
    const range = new vscode.Range(start, end);

    // Equivalent to jEdit's find(view) selecting the found text
    editor.selection = new vscode.Selection(start, end);
    editor.revealRange(range);

    // Equivalent to textArea.setSelectedText("&lt;")
    await editor.edit(editBuilder => {
      editBuilder.replace(range, '&lt;');
    });
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};