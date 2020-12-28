import { TextVO } from "../domain/text";
import { TextDto } from "../transfer/text";

export interface ITextGatewayInput{
    read(): TextDto,
}

export interface ITextGatewayOutout{
    save(text: TextDto): void,
}


