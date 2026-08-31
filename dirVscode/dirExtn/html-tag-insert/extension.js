const vscode = require('vscode');

function activate(context) {
  const disposable = vscode.commands.registerCommand('extension.htmlTagInsert', async () => {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
      vscode.window.showErrorMessage('No active editor.');
      return;
    }

    const tag = await vscode.window.showInputBox({
      prompt: 'Enter name of tag'
    });

    if (!tag || tag.trim().length === 0) {
      return;
    }

    const selection = editor.selection;
    const selectedText = editor.document.getText(selection);
    const hasSelection = !selection.isEmpty;

    const closingTag = tag.includes(' ')
      ? tag.substring(0, tag.indexOf(' '))
      : tag;

    const replacement = `<${tag}>${selectedText}</${closingTag}>`;

    const ok = await editor.edit((editBuilder) => {
      editBuilder.replace(selection, replacement);
    });

    if (!ok) {
      vscode.window.showErrorMessage('Document is read-only or could not be edited.');
      return;
    }

    // If there was no selected text, place caret between opening and closing tag
    if (!hasSelection) {
      const start = selection.start;
      const caretPos = start.translate(0, tag.length + 2); // after `<tag>`
      editor.selection = new vscode.Selection(caretPos, caretPos);
    }
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};