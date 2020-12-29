import * as path from 'path';
import * as vscode from 'vscode';
import { ISheetFactory, ISheetWriter } from './domain/sheet';
import { CodeGatewayInput, CodeGatewayOutput } from './gatewayCode';
import { LatexSheetFactory, LatexSheetWriter } from './presenter/latex';
import { SheetDto } from './transfer/sheet';
import { ITextGatewayInput, ITextGatewayOutout } from './usecase/gateway';
import { SheetUseCase } from './usecase/sheet';

export class TableEditorProvider implements vscode.CustomTextEditorProvider {

    private static readonly viewType = "textab.table"

    public static register(context: vscode.ExtensionContext): vscode.Disposable {
		const provider = new TableEditorProvider(context);
		const providerRegistration = vscode.window.registerCustomEditorProvider(TableEditorProvider.viewType, provider);
		return providerRegistration;
	}

    public async resolveCustomTextEditor(
        document: vscode.TextDocument,
        webviewPanel: vscode.WebviewPanel,
        token: vscode.CancellationToken): Promise<void> {

		const gatewayInput: ITextGatewayInput = new CodeGatewayInput(document)
		const gatewayOutput: ITextGatewayOutout = new CodeGatewayOutput(document)
		const sheetWriter: ISheetWriter = new LatexSheetWriter()
		const sheetFactory: ISheetFactory = new LatexSheetFactory()
		const sheetUseCase = new SheetUseCase(sheetFactory, sheetWriter)

        webviewPanel.webview.options = {
            enableScripts: true,
        };

		webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview);

		function updateWebview() {
			webviewPanel.webview.postMessage(sheetUseCase.createSheetDto(gatewayInput.read()));
		}

		// Hook up event handlers so that we can synchronize the webview with the text document.
		//
		// The text document acts as our model, so we have to sync change in the document to our
		// editor and sync changes in the editor back to the document.
		// 
		// Remember that a single text document can also be shared between multiple custom
		// editors (this happens for example when you split a custom editor)

		const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument(e => {
			if (e.document.uri.toString() === document.uri.toString()) {
				updateWebview();
			}
		});

		// Make sure we get rid of the listener when our editor is closed.
		webviewPanel.onDidDispose(() => {
			changeDocumentSubscription.dispose();
		});

		// Receive message from the webview.
		webviewPanel.webview.onDidReceiveMessage(e => {
			const sheetDto = e as SheetDto
			gatewayOutput.save(sheetUseCase.createTextDto(sheetDto))
		});

		updateWebview();
	}

    constructor(
		private readonly context: vscode.ExtensionContext
    ) { }
    
    private getHtmlForWebview(webview: vscode.Webview): string {
		// Local path to script and css for the webview
		const scriptUri = webview.asWebviewUri(vscode.Uri.file(
			path.join(this.context.extensionPath, 'media', 'bundle.js')
		));

		return /* html */`
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>textab</title>
			</head>
			<body>
				<div id="table"></div>
				<script src="${scriptUri}"></script>
			</body>
			</html>`;
	}
}