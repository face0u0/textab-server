import { SheetDto } from "../transfer/sheet";


export interface EditorView {

    send(sheet: SheetDto): void;
}
