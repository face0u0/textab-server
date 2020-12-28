import { copyArrayShallow } from "./util";

export interface IOPort{
    read(): TextFile,
    save(text: TextFile): void,
}

export class TextFile {

    public readonly lines: ReadonlyArray<string>;

    constructor(lines: Array<string>) {
        this.lines = copyArrayShallow(lines)
    }

    getSource(): string {
        return this.lines.join("\n")
    }
}
