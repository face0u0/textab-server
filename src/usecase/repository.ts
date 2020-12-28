import { TextVO } from "../domain/text";
import { TextDto } from "../transfer/text";

export interface ITextGateway{
    read(): TextDto,
    save(text: TextDto): void,
}


