import * as path from 'path';
import * as vscode from 'vscode';

export class TableEditorProvider implements vscode.CustomTextEditorProvider {

    private static readonly viewType = "texTables.table"

    public static register(context: vscode.ExtensionContext): vscode.Disposable {
		const provider = new TableEditorProvider(context);
		const providerRegistration = vscode.window.registerCustomEditorProvider(TableEditorProvider.viewType, provider);
		return providerRegistration;
	}

    public async resolveCustomTextEditor(
        document: vscode.TextDocument,
        webviewPanel: vscode.WebviewPanel,
        token: vscode.CancellationToken): Promise<void> {

        webviewPanel.webview.options = {
            enableScripts: true,
        };

        throw new Error('Method not implemented.');
    }

    constructor(
		private readonly context: vscode.ExtensionContext
    ) { }
    
    private getHtmlForWebview(webview: vscode.Webview): string {
		// Local path to script and css for the webview
		const scriptUri = webview.asWebviewUri(vscode.Uri.file(
			path.join(this.context.extensionPath, 'media', 'catScratch.js')
		));
		const styleResetUri = webview.asWebviewUri(vscode.Uri.file(
			path.join(this.context.extensionPath, 'media', 'reset.css')
		));
		const styleVSCodeUri = webview.asWebviewUri(vscode.Uri.file(
			path.join(this.context.extensionPath, 'media', 'vscode.css')
		));
		const styleMainUri = webview.asWebviewUri(vscode.Uri.file(
			path.join(this.context.extensionPath, 'media', 'catScratch.css')
		));

		return /* html */`
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">

				<link href="${styleResetUri}" rel="stylesheet" />
				<link href="${styleVSCodeUri}" rel="stylesheet" />
				<link href="${styleMainUri}" rel="stylesheet" />

				<title>Cat Scratch</title>
			</head>
			<body>
				<div class="notes">
					<div class="add-button">
						<button>Scratch!</button>
					</div>
				</div>
				
				<script src="${scriptUri}"></script>
			</body>
			</html>`;
	}
}