import { AlignType, SheetVO } from "../domain/sheet";
import { copyArrayShallow } from "../domain/util";

export class SheetSerialize{
    constructor(public readonly table: Array<Array<string>>, public readonly align: Array<string>){}
}

export class SheetConverter{

    public static toSheetVO(SheetSerialize: SheetSerialize): SheetVO{
        return SheetVO.fromStringArray(SheetSerialize.table, SheetSerialize.align.map(align => {
            switch(align){
                case 'r':
                    return AlignType.RIGHT
                case 'c':
                    return AlignType.CENTER
                case 'l':
                    return AlignType.LEFT
                default:
                    throw new Error("align not defined")
            }
        }))
    }

    public static toSheetSerialize(sheet: SheetVO): SheetSerialize{
        return new SheetSerialize(sheet.table.rows.map(row => {
            return copyArrayShallow(row.values)
        }), sheet.colAlign.map(align => {
            switch(align){
                case AlignType.RIGHT:
                    return 'r'
                case AlignType.CENTER:
                    return 'c'
                case AlignType.LEFT:
                    return 'l'
            }
        }))
    }
}