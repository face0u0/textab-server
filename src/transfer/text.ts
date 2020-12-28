import { TextFileVO } from "../domain/textFile";
import { copyArrayShallow } from "../domain/util";

export class TextDto{
    constructor(public lines: Array<string>){}
}

export class TextConverter{

    public static toFileDto(textFile: TextFileVO): TextDto{
        return new TextDto(copyArrayShallow(textFile.lines))
    }

    public static toTextFile(fileDto: TextDto): TextFileVO{
        return new TextFileVO(fileDto.lines)
    }

}