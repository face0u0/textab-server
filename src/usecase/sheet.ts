import { ISheetFactory, ISheetWriter, SheetVO } from "../domain/sheet";
import { SheetConverter, SheetDto } from "../transfer/sheet";
import { TextConverter, TextDto } from "../transfer/text";
import { EditorController } from "./editor";
import { ITextGatewayInput, ITextGatewayOutout } from "./gateway";

export class SheetUseCase {

    constructor(
        private readonly sheetFactory: ISheetFactory,
        private readonly sheetWriter: ISheetWriter){}

    createSheetDto(textDto: TextDto): SheetDto{
        const text = TextConverter.toTextVO(textDto)
        const sheet = this.sheetFactory.create(text)
        return SheetConverter.toSheetDto(sheet)
    }

    createTextDto(sheetDto: SheetDto): TextDto{
        const sheet = SheetConverter.toSheetVO(sheetDto)  
        const text = this.sheetWriter.write(sheet)
        return TextConverter.toFileDto(text)
    }
}


