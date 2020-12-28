import { latexParser } from "latex-utensils";
import { TextFile } from "../../interfaces";

const tokens = latexParser.parse(`
\\begin{tabular}{l|l}
OS & Windows 10 Home \\\\ \\hline
プロセッサ & AMD(R) Ryzen 5 3500 CPU \\ \\hline
実装RAM & 16.00 GB \\\\ \\hline
システム & 64 ビット オペレーティング システム
\\end{tabular}
`)

export class LatexParserWrapper{

    public static parse(text: TextFile){
        const joined = text.lines.join("\n");
        const tokens = latexParser.parse(joined)

        for(let token of tokens.value ?? []){
            token
        }
    }

    public static createToken()
}