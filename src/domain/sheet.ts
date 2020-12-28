import { TextVO } from "./text";
import { copyArrayShallow } from "./util";


export interface ISheetFactory{
    create(text: TextVO): SheetVO
}

export class SheetVO {
    public readonly colAlign: ReadonlyArray<AlignType>
    public readonly table: TableVO

    constructor(table: TableVO, align: Array<AlignType>) {
        if(align.length !== table.colNum) throw new Error("align col num not eqal")
        this.colAlign = copyArrayShallow(align)
        this.table = table
    }

    public static fromStringArray(arrays: Array<Array<string>>, align: Array<AlignType>) {
        const rows = arrays.map(array => {
            return new RowVO(array);
        })
        const table = new TableVO(rows)
        return new SheetVO(table, align)
    }
}

export enum AlignType {
    RIGHT,
    CENTER,
    LEFT,
}

export class TableVO {
    public readonly rows: ReadonlyArray<RowVO>;
    public readonly rowNum: Number;
    public readonly colNum: Number;

    constructor(rows: Array<RowVO>) {
        if(rows.length === 0){
            this.rowNum = 0
            this.colNum = 0
            this.rows = []
        } else {
            const firstColNum = rows[0].len
            for(let row of rows){
                if(row.len !== firstColNum){
                    throw new Error("each row not eqal")
                }
            }
            this.colNum = firstColNum
            this.rowNum = rows.length
            this.rows = copyArrayShallow(rows)
        }
    }
}

export class RowVO {
    public readonly cells: ReadonlyArray<CellVO>;
    public readonly len: Number;

    constructor(values: Array<string>) {
        this.cells = values.map(val => new CellVO(val));
        this.len = values.length
    }
}

export class CellVO {
    constructor(public readonly value: string) {}
}