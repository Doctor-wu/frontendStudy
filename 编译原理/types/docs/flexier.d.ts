export interface ITokenizerConstructor {
    new (input: string): ITokenizer;
}
export interface ITokenizer {
    tokens: Token[];
    currentToken: Token | null;
    start: IStateExcutor;
    number: IStateExcutor;
    emit: (token: Token) => void;
}
export declare type TokenizerParmas = string;
export interface Token {
    type: Symbol;
    value: string;
}
export declare type IStateExcutor = (char: string) => IStateExcutor;
