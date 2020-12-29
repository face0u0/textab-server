import { TextDto } from "./transfer/text";
import { ITextGatewayInput, ITextGatewayOutout } from "./usecase/gateway";
import * as vscode from 'vscode';

export class CodeGatewayInput implements ITextGatewayInput{
    constructor(private readonly document: vscode.TextDocument){}

    read(): TextDto {
        const text = this.document.getText()
        return new TextDto(text.split("\n"))
    }
}

export class CodeGatewayOutput implements ITextGatewayOutout{
    constructor(private readonly document: vscode.TextDocument){}

    save(text: TextDto): void {
        const edit = new vscode.WorkspaceEdit();

		var firstLine = this.document.lineAt(0);
        var lastLine = this.document.lineAt(this.document.lineCount - 1); 
        
        edit.replace(
			this.document.uri,
			new vscode.Range(firstLine.range.start, lastLine.range.end),
            text.lines.join("\n"))
        
        vscode.workspace.applyEdit(edit)
    }    
}