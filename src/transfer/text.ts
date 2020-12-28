import { TextVO } from "../domain/text";
import { copyArrayShallow } from "../domain/util";

export class TextDto{
    constructor(public lines: Array<string>){}
}

export class TextConverter{

    public static toFileDto(textFile: TextVO): TextDto{
        return new TextDto(copyArrayShallow(textFile.lines))
    }

    public static toTextVO(fileDto: TextDto): TextVO{
        return new TextVO(fileDto.lines)
    }

}