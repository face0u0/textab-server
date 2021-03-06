import { copyArrayShallow } from "./util";


export class TextVO {

    public readonly lines: ReadonlyArray<string>;

    constructor(lines: Array<string>) {
        this.lines = copyArrayShallow(lines);
    }

    getSource(): string {
        return this.lines.join("\n");
    }
}
