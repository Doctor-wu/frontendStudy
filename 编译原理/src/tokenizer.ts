namespace JSXTokenizer {
  export interface ITokenizerConstructor {
    new (input: TokenizerParamter): ITokenizer;
  }

  export type TokenizerParamter = string;

  export interface IToken {
    type: Symbol | null;
    value: string;
  }

  export interface IStateExcutor {
    (char: string): IStateExcutor | undefined;
  }

  export type REType = {
    [props: string]: RegExp;
  };

  export interface ITokenizer {
    currentToken: IToken;
    tokens: IToken[];
    RE: REType;
    run(): void;
    searchBeginTagStart: IStateExcutor;
    searchJSXIdentifier: IStateExcutor;
  }

  export const TagStartType = Symbol("TagStartType");
  export const JSXIdentifierType = Symbol("JSXIdentifier");
  export const JSXAttributeKey = Symbol("JSXAttributeKey");
  export const Equator = Symbol("Equator");
  export const JSXAttributeValue = Symbol("JSXAttributeValue");
  export const TagEndType = Symbol("TagEndType");
  export const BackFlash = Symbol("BackFlash");
  export const Text = Symbol("Text");
}
class Tokenizer implements JSXTokenizer.ITokenizer {
  input: JSXTokenizer.TokenizerParamter;
  tokens: JSXTokenizer.IToken[] = [];
  currentQuote: string | undefined;
  currentToken: JSXTokenizer.IToken = {
    type: Symbol("INIT"),
    value: "",
  };
  RE: JSXTokenizer.REType = {
    LETTERS: /[a-zA-z0-9]/,
  };

  constructor(input: JSXTokenizer.TokenizerParamter) {
    this.input = input;
  }

  run() {
    let state: JSXTokenizer.IStateExcutor | void = this.searchBeginTagStart;
    for (const char of this.input) {
      if (state !== undefined) {
        state = state.call(this, char);
      } else return;
    }
  }

  @jumpSpace
  searchBeginTagStart(char: string): JSXTokenizer.IStateExcutor {
    if (char === "<") {
      this.emit(this.currentToken);
      this.emit({
        type: JSXTokenizer.TagStartType,
        value: char,
      });
      this.resetCurrentToken();
      return this.searchJSXIdentifier;
    }

    if (this.RE.LETTERS.test(char)) {
      this.currentToken.type = JSXTokenizer.Text;
      this.currentToken.value += char;
      return this.searchBeginTagStart;
    }

    throw TypeError("UnExcepted Error");
  }

  searchJSXIdentifier(char: string): JSXTokenizer.IStateExcutor {
    if (this.RE.LETTERS.test(char)) {
      this.currentToken.type = JSXTokenizer.JSXIdentifierType;
      this.currentToken.value += char;
      return this.searchJSXIdentifier;
    }
    if (char === " ") {
      this.emit(this.currentToken);
      this.resetCurrentToken();
      return this.searchJSXAttributeKey;
    }
    if (char === "/") {
      this.emit({
        type: JSXTokenizer.BackFlash,
        value: char,
      });
      return this.searchJSXIdentifier;
    }
    if (char === ">") {
      this.emit(this.currentToken);
      this.resetCurrentToken();
      this.emit({
        type: JSXTokenizer.TagEndType,
        value: char,
      });
      return this.searchBeginTagStart;
    }

    throw TypeError("UnExcepted Error");
  }

  @jumpSpace
  searchJSXAttributeKey(char: string): JSXTokenizer.IStateExcutor {
    if (this.RE.LETTERS.test(char)) {
      this.currentToken.type = JSXTokenizer.JSXAttributeKey;
      this.currentToken.value += char;
      return this.searchJSXAttributeKey;
    }

    if (char === "=") {
      this.emit(this.currentToken);
      this.resetCurrentToken();
      this.emit({
        type: JSXTokenizer.Equator,
        value: char,
      });
      return this.searchJSXAttributeValue;
    }

    if (char === ">") {
      this.emit({
        type: JSXTokenizer.TagEndType,
        value: char,
      });
      return this.foundJSXBeginTagEnd;
    }
    throw TypeError("UnExcepted Error");
  }

  @jumpSpace
  searchJSXAttributeValue(char: string): JSXTokenizer.IStateExcutor {
    if (char === '"') {
      this.currentToken.type = JSXTokenizer.JSXAttributeValue;
      this.currentToken.value += char;
      return this.foundAttributeQuote;
    }

    throw TypeError("UnExcepted Error");
  }

  foundAttributeQuote(char: string): JSXTokenizer.IStateExcutor {
    if (this.RE.LETTERS.test(char)) {
      this.currentToken.type = JSXTokenizer.JSXAttributeValue;
      this.currentToken.value += char;
      return this.foundAttributeQuote;
    }

    if (char === '"') {
      this.currentToken.type = JSXTokenizer.JSXAttributeValue;
      this.currentToken.value += char;
      this.emit(this.currentToken);
      this.resetCurrentToken();
      return this.searchJSXAttributeKey;
    }
    throw TypeError("UnExcepted Error");
  }

  foundJSXBeginTagEnd(char: string): JSXTokenizer.IStateExcutor {
    if (char === "<") {
      this.currentToken = {
        type: JSXTokenizer.TagStartType,
        value: char,
      };
      this.emit(this.currentToken);
      this.resetCurrentToken();
      return this.searchJSXIdentifier;
    }

    throw TypeError("UnExcepted Error");
  }

  resetCurrentToken() {
    if (this.currentToken === null) return;
    this.currentToken = {
      type: Symbol("INIT"),
      value: "",
    };
  }

  emit(token: JSXTokenizer.IToken) {
    if (!token.value) return;
    this.tokens.push(token);
  }
}

function jumpSpace(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  let method = descriptor.value;
  let jumpSpaceFunc = function (this: JSXTokenizer.ITokenizer, char: string) {
    if (char === " ") return jumpSpaceFunc;
    return method.call(this, char);
  };
  descriptor.value = jumpSpaceFunc;
}

function createTokenizer(
  Tokenizer: JSXTokenizer.ITokenizerConstructor,
  input: JSXTokenizer.TokenizerParamter
): JSXTokenizer.ITokenizer {
  return new Tokenizer(input);
}

let input = '   <h1 id="title"><span>hello</span>world</h1>';
let tokenizer = createTokenizer(Tokenizer, input);
tokenizer.run();
console.log(tokenizer.tokens);

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
