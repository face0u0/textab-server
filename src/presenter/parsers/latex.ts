import { latexParser } from "latex-utensils";
import { TextFileVO } from "../../domain/textFile";
import { TableVO, SheetVO, AlignType, RowVO, ISheetFactory } from "../../domain/sheet";

export class LatexSheetFactory implements ISheetFactory {
    public create(text: TextFileVO): SheetVO{
        return LatexParser.parse(text)
    }
}

class LatexParser{

    public static parse(text: TextFileVO): SheetVO{
        const joined = text.getSource();
        const tokens = latexParser.parse(joined)
                
        for(let token of tokens.content ?? []){
            if(this.isTable(token)){
                const table = this.parseTableBody(token)
                const align = this.parseAlign(token)
                return new SheetVO(table, align)
            }
        }

        throw new Error("tablur not found on global")
    }

    private static isTable(token: latexParser.Node): token is latexParser.Environment{
        return token.kind === "env" && token.name === "tablur"
    }

    private static splitTokenWithBreak(tokens: latexParser.Node[]): Array<Array<latexParser.Node>>{
        const result: Array<Array<latexParser.Node>> = []
        let currentRow: Array<latexParser.Node> = []
        result.push(currentRow)
        tokens.forEach(token => {
            if(token.kind === "command" && token.name === "\\\\"){
                currentRow = []
                result.push(currentRow)
            } else {
                currentRow.push(token)
            }
        })
        return result
    }

    private static parseTableBody(token: latexParser.Environment): TableVO {
        const rows = this.splitTokenWithBreak(token.content).map(row => {
            const rowMember: Array<string> = []
            let currentContent: Array<string> = []
            row.forEach(content => {
                if(content.kind === "text.string"){
                    currentContent.push(content.content)
                } else if(content.kind === "alignmentTab"){
                    rowMember.push(currentContent.join(" "))
                    currentContent = []
                }
            })
            rowMember.push(currentContent.join(" "))
            return new RowVO(rowMember)
        })
        return new TableVO(rows)
    }

    private static parseAlign(token: latexParser.Environment): Array<AlignType> {

        const arg = token.args[0]?.content[0]
        if(arg === undefined || arg.kind !== "text.string") throw new Error("arg invalid")
        return arg.content.split("|").map(s => {
            switch(s){
                case "r":
                    return AlignType.RIGHT
                case "l":
                    return AlignType.LEFT
                case "c":
                    return AlignType.CENTER
                default:
                    throw new Error("align invalid")            
            }
        })
    }
}