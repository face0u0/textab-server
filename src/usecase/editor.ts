import { SheetVO } from "../domain/sheet";
import { SheetConverter, SheetDto } from "../transfer/sheet";
import { TextConverter } from "../transfer/text";
import { ITextGateway } from "./repository";

export class SheetUseCase{

    constructor(private readonly editorView: EditorView, private readonly gateway: ITextGateway){}

    reflectToView(sheet: SheetVO){
        const text = TextConverter.toTextVO(this.gateway.read())
    }

    reflectToGateway(){

    }

}

export interface EditorView {

    update(sheet: SheetDto): void
}

