import { TextFile } from "../domain/textFile";

export interface ITextGateway{
    read(): TextFile,
    save(text: TextFile): void,
}


