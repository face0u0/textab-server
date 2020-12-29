import { SheetDto } from "../transfer/sheet";


export interface EditorController {

    send(sheet: SheetDto): void;
}
