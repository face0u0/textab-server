import { SheetVO } from "../domain/sheet";
import { SheetDto } from "../transfer/sheet";
import { ITextGateway } from "./repository";

export class SheetUseCase{

    constructor(private readonly editorView: EditorView, private readonly gateway: ITextGateway){}

    reflectToView(sheet: SheetVO){
        this.gateway.save()
    }

    reflectToGateway(){

    }

}

export interface EditorView {

    update(sheet: SheetDto): void
}

