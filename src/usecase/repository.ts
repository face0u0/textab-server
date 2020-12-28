import { TextFileVO } from "../domain/textFile";
import { TextDto } from "../transfer/text";

export interface ITextGateway{
    read(): TextDto,
    save(text: TextDto): void,
}


