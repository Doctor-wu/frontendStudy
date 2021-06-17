export declare namespace JSXTokenizer {
    interface ITokenizerConstructor {
        new (input: TokenizerParamter): ITokenizer;
    }
    type TokenizerParamter = string;
    interface IToken {
        type: Symbol | null;
        value: string;
    }
    interface IStateExcutor {
        (char: string): IStateExcutor | undefined;
    }
    type REType = {
        [props: string]: RegExp;
    };
    interface ITokenizer {
        currentToken: IToken;
        tokens: IToken[];
        RE: REType;
        run(): void;
        searchBeginTagStart: IStateExcutor;
        searchJSXIdentifier: IStateExcutor;
    }
    const TagStartType: unique symbol;
    const JSXIdentifierType: unique symbol;
    const JSXAttributeKey: unique symbol;
    const Equator: unique symbol;
    const JSXAttributeValue: unique symbol;
    const TagEndType: unique symbol;
    const BackFlash: unique symbol;
    const Text: unique symbol;
}
export declare class Tokenizer implements JSXTokenizer.ITokenizer {
    input: JSXTokenizer.TokenizerParamter;
    tokens: JSXTokenizer.IToken[];
    currentQuote: string | undefined;
    currentToken: JSXTokenizer.IToken;
    RE: JSXTokenizer.REType;
    constructor(input: JSXTokenizer.TokenizerParamter);
    run(): void;
    searchBeginTagStart(char: string): JSXTokenizer.IStateExcutor;
    searchJSXIdentifier(char: string): JSXTokenizer.IStateExcutor;
    searchJSXAttributeKey(char: string): JSXTokenizer.IStateExcutor;
    searchJSXAttributeValue(char: string): JSXTokenizer.IStateExcutor;
    foundAttributeQuote(char: string): JSXTokenizer.IStateExcutor;
    foundJSXBeginTagEnd(char: string): JSXTokenizer.IStateExcutor;
    resetCurrentToken(): void;
    emit(token: JSXTokenizer.IToken): void;
}
export declare function createTokenizer(Tokenizer: JSXTokenizer.ITokenizerConstructor, input: JSXTokenizer.TokenizerParamter): JSXTokenizer.ITokenizer;
