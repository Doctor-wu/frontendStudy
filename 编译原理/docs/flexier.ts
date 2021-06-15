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

export type TokenizerParmas = string;

export interface Token {
  type: Symbol;
  value: string;
}

export type IStateExcutor = (char: string) => IStateExcutor;

const NumRE = /[0-9]/;

class Tokenizer implements ITokenizer {
  tokens: Token[] = [];
  currentToken: Token | null = null;
  constructor(input: TokenizerParmas) {
    this.start(input);
  }

  start(this: ITokenizer, input: TokenizerParmas) {
    let start: IStateExcutor = this.number;
    for (let char of input) {
      start = start.call(this, char);
    }
    if (this.currentToken !== null) {
      this.emit(this.currentToken);
    }
    return this.start;
  }

  number(char: string): IStateExcutor {
    if (NumRE.test(char)) {
      if (this.currentToken !== null) {
        this.currentToken.value += char;
      } else {
        this.currentToken = {
          type: Symbol("Numeric"),
          value: char,
        };
      }
      return this.number;
    } else if (char === "+" || char === "-") {
      if (this.currentToken !== null) {
        this.emit(this.currentToken);
      }
      this.emit({
        type: Symbol("symbol"),
        value: char,
      });
      this.currentToken = null;
      return this.number;
    }
    return this.start;
  }

  emit(token: Token) {
    this.tokens.push(token);
  }
}

function createTokenizer(
  Tokenizer: ITokenizerConstructor,
  input: TokenizerParmas
): ITokenizer {
  return new Tokenizer(input);
}

let tokenizer = createTokenizer(Tokenizer, "10+20-30+5-6000");
console.log(tokenizer.tokens);
