const vscode = require('vscode');

async function fCharInsertInt(s, editor) {
	if (!s || s.trim().length === 0) {
		return;
	}

	const n = Number.parseInt(s.trim(), 10);

	if (!Number.isInteger(n)) {
		vscode.window.showErrorMessage(`Invalid integer: "${s}"`);
		return;
	}
n
	if (n < 0 || n > 0x10FFFF) {
		vscode.window.showErrorMessage(
			`Code point out of range: ${n}. Valid range is 0 to 1114111 (0x10FFFF).`
		);
		return;
	}

	let sChar;
	try {
		sChar = String.fromCodePoint(n);
	} catch (err) {
		vscode.window.showErrorMessage(`Unable to convert code point ${n}: ${String(err)}`);
		return;
	}

	await editor.edit((editBuilder) => {
		for (const selection of editor.selections) {
			editBuilder.replace(selection, sChar);
		}
	});
}

function activate(context) {
	const disposable = vscode.commands.registerCommand(
		'extension.charInsertInt',
		async () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				vscode.window.showErrorMessage('No active editor found.');
				return;
			}

			const sTarget = await vscode.window.showInputBox({
				prompt: 'WritsTargete Character in Integer Form',
				placeHolder: 'Example: 215',
				ignoreFocusOut: true
			});

			if (sTarget !== undefined) {
				await fCharInsertInt(sTarget, editor);
			}
		}
	);

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
};