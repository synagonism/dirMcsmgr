const vscode = require('vscode');

function activate(context) {
  const disposable = vscode.commands.registerCommand('extension.userInput', async () => {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
      vscode.window.showErrorMessage('No active editor.');
      return;
    }

    // Save the current cursor position
    const originalPosition = editor.selection.active;

    const sUserText = await vscode.window.showInputBox({
      prompt: 'Enter Text',
      placeHolder: 'Type something...'
    });

    if (!sUserText || sUserText.trim().length === 0) {
      return;
    }

    const ok = await editor.edit((editBuilder) => {
      editBuilder.insert(originalPosition, sUserText);
    });

    if (!ok) {
      vscode.window.showErrorMessage('Document is read-only or could not be edited.');
      return;
    }
        
    // After insertion, get the actual end position
    const currentPosition = editor.selection.active;
    const afterInsertText = editor.document.getText(new vscode.Range(originalPosition, currentPosition));
    const endPosition = originalPosition.translate(0, afterInsertText.length);
    editor.selection = new vscode.Selection(originalPosition, endPosition);
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};