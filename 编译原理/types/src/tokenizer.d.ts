declare namespace JSXTokenizer {
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
declare class Tokenizer implements JSXTokenizer.ITokenizer {
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
declare function jumpSpace(target: any, propertyKey: string, descriptor: PropertyDescriptor): void;
declare function createTokenizer(Tokenizer: JSXTokenizer.ITokenizerConstructor, input: JSXTokenizer.TokenizerParamter): JSXTokenizer.ITokenizer;
declare let input: string;
declare let tokenizer: JSXTokenizer.ITokenizer;
/**
 * expected
   [
    { type: 'Punctuator', value: '<' },
    { type: 'JSXIdentifier', value: 'h1' },
    { type: 'JSXIdentifier', value: 'id' },
    { type: 'Punctuator', value: '=' },
    { type: 'String', value: '"title"' },
    { type: 'Punctuator', value: '>' },
    { type: 'Punctuator', value: '<' },
    { type: 'JSXIdentifier', value: 'span' },
    { type: 'Punctuator', value: '>' },
    { type: 'JSXText', value: 'hello' },
    { type: 'Punctuator', value: '<' },
    { type: 'Punctuator', value: '/' },
    { type: 'JSXIdentifier', value: 'span' },
    { type: 'Punctuator', value: '>' },
    { type: 'JSXText', value: 'world' },
    { type: 'Punctuator', value: '<' },
    { type: 'Punctuator', value: '/' },
    { type: 'JSXIdentifier', value: 'h1' },
    { type: 'Punctuator', value: '>' }
  ]

  my output
  [
    { type: Symbol(TagStartType), value: '<' },
    { type: Symbol(JSXIdentifier), value: 'h1' },
    { type: Symbol(JSXAttributeKey), value: 'id' },
    { type: Symbol(Equator), value: '=' },
    { type: Symbol(JSXAttributeValue), value: '"title"' },
    { type: Symbol(TagEndType), value: '>' },
    { type: Symbol(TagStartType), value: '<' },
    { type: Symbol(JSXIdentifier), value: 'span' },
    { type: Symbol(TagEndType), value: '>' },
    { type: Symbol(Text), value: 'hello' },
    { type: Symbol(TagStartType), value: '<' },
    { type: Symbol(BackFlash), value: '/' },
    { type: Symbol(JSXIdentifier), value: 'span' },
    { type: Symbol(TagEndType), value: '>' },
    { type: Symbol(Text), value: 'world' },
    { type: Symbol(TagStartType), value: '<' },
    { type: Symbol(BackFlash), value: '/' },
    { type: Symbol(JSXIdentifier), value: 'h1' },
    { type: Symbol(TagEndType), value: '>' }
  ]
 */
