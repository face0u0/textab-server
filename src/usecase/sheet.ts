import { ISheetFactory, ISheetWriter, SheetVO } from "../domain/sheet";
import { SheetConverter, SheetDto } from "../transfer/sheet";
import { TextConverter } from "../transfer/text";
import { EditorView } from "./editor";
import { ITextGatewayInput, ITextGatewayOutout } from "./gateway";

export class SheetUseCase{

    constructor(
        private readonly editorView: EditorView,
        private readonly gatewayInput: ITextGatewayInput,
        private readonly gatewayOutput: ITextGatewayOutout,
        private readonly sheetFactory: ISheetFactory,
        private readonly sheetWriter: ISheetWriter){}

    reflectToView(): SheetDto{
        const text = TextConverter.toTextVO(this.gatewayInput.read())
        return SheetConverter.toSheetDto(this.sheetFactory.create(text))
    }

    reflectToGateway(){
        this.sheetWriter.write()
        this.gatewayOutput.save()
    }

}


