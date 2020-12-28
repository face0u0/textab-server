import { TextFile } from "../../interfaces";
import { Sheet, TableVO } from "../../tableWindow";



// s

// export class LatexFactory {

//     public static build(text: TextFile){
//         const trimed = text.lines.map(line => {
//             return line.trim()
//         }).filter(line => {
//             return line !== ""
//         })
//     }

//     public static parseLine(text: string): Array<Token>{
//         const tokens: Array<Token> = [new TexStart()]
        
//         for(let s of text){
            
//             if (s === "\\"){
//                 const prev = this.lastOf(tokens)
//                 if((prev instanceof TexCommand) && prev.isEmpty()){
//                     tokens.pop()
//                     tokens.push(new )
//                 }
//                 tokens.push(new TexCommand(""))
//             } else if (s === "{"){
//                 tokens.push(new TexBlacket(""))
//             } else if (s === "}"){
//                 const token = this.lastOf(tokens)
//                 if(!(token instanceof TexBlacket)) throw new Error("lexer error!")
//             } else if (s === "\\"){
                
//             } else {
//                 const token = this.popTextable(tokens)
//                 token.append(s)
//                 tokens.push(token)
//             }
//         }
//         return tokens;
//     }

//     private static pop(tokens: Array<Token>): Token {
//         return to
//     }

//     private static popTextable(tokens: Array<Token>): Textable{
//         const token = tokens.pop()
//         if(token === undefined){
//             return new TexText("")
//         } else if (!isTextable(token)){
//             tokens.push(token)
//             return new TexText("")
//         } else {
//             return token
//         }
//     }

//     private static lastOf<T> (array: Array<T>): T|undefined{
//         return array[array.length-1]
//     }

// }

// class TexCommand implements Textable {
//     constructor(public readonly text: string) {}
//     append(str: string): TexCommand{
//         return new TexCommand(this.text+str)
//     }
//     isEmpty(): boolean {
//         return this.text === ""
//     }
// }

// class TexBlacket implements Textable {
//     constructor(public readonly text: string) {}
//     append(str: string): TexBlacket{
//         return new TexBlacket(this.text+str)
//     }
//     isEmpty(): boolean {
//         return this.text === ""
//     }
// }

// class TexText implements Textable {
//     public readonly type = "s"
//     constructor(public readonly text: string) {}
//     append(str: string): TexText{
//         return new TexText(this.text+str)
//     }
//     isEmpty(): boolean {
//         return this.text === ""
//     }
// }

// class TexBreak {
//     constructor() {}
// }

// class TexStart {
//     constructor() {}
// }

// interface Textable {
//     text: string,
//     append: (str: string) => Textable,
//     isEmpty: () => boolean
// }

// export type Token = TexCommand|TexBlacket|TexText|TexBreak

// const isTextable = (arg: any): arg is Textable => {
//     return typeof arg.text === "string" 
// }