var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var JSXTokenizer;
(function (JSXTokenizer) {
    JSXTokenizer.TagStartType = Symbol("TagStartType");
    JSXTokenizer.JSXIdentifierType = Symbol("JSXIdentifier");
    JSXTokenizer.JSXAttributeKey = Symbol("JSXAttributeKey");
    JSXTokenizer.Equator = Symbol("Equator");
    JSXTokenizer.JSXAttributeValue = Symbol("JSXAttributeValue");
    JSXTokenizer.TagEndType = Symbol("TagEndType");
    JSXTokenizer.BackFlash = Symbol("BackFlash");
    JSXTokenizer.Text = Symbol("Text");
})(JSXTokenizer || (JSXTokenizer = {}));
var Tokenizer = /** @class */ (function () {
    function Tokenizer(input) {
        this.tokens = [];
        this.currentToken = {
            type: Symbol("INIT"),
            value: ""
        };
        this.RE = {
            LETTERS: /[a-zA-z0-9]/
        };
        this.input = input;
    }
    Tokenizer.prototype.run = function () {
        var state = this.searchBeginTagStart;
        for (var _i = 0, _a = this.input; _i < _a.length; _i++) {
            var char = _a[_i];
            if (state !== undefined) {
                state = state.call(this, char);
            }
            else
                return;
        }
    };
    Tokenizer.prototype.searchBeginTagStart = function (char) {
        if (char === "<") {
            this.emit(this.currentToken);
            this.emit({
                type: JSXTokenizer.TagStartType,
                value: char
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
    };
    Tokenizer.prototype.searchJSXIdentifier = function (char) {
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
                value: char
            });
            return this.searchJSXIdentifier;
        }
        if (char === ">") {
            this.emit(this.currentToken);
            this.resetCurrentToken();
            this.emit({
                type: JSXTokenizer.TagEndType,
                value: char
            });
            return this.searchBeginTagStart;
        }
        throw TypeError("UnExcepted Error");
    };
    Tokenizer.prototype.searchJSXAttributeKey = function (char) {
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
                value: char
            });
            return this.searchJSXAttributeValue;
        }
        if (char === ">") {
            this.emit({
                type: JSXTokenizer.TagEndType,
                value: char
            });
            return this.foundJSXBeginTagEnd;
        }
        throw TypeError("UnExcepted Error");
    };
    Tokenizer.prototype.searchJSXAttributeValue = function (char) {
        if (char === '"') {
            this.currentToken.type = JSXTokenizer.JSXAttributeValue;
            this.currentToken.value += char;
            return this.foundAttributeQuote;
        }
        throw TypeError("UnExcepted Error");
    };
    Tokenizer.prototype.foundAttributeQuote = function (char) {
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
    };
    Tokenizer.prototype.foundJSXBeginTagEnd = function (char) {
        if (char === "<") {
            this.currentToken = {
                type: JSXTokenizer.TagStartType,
                value: char
            };
            this.emit(this.currentToken);
            this.resetCurrentToken();
            return this.searchJSXIdentifier;
        }
        throw TypeError("UnExcepted Error");
    };
    Tokenizer.prototype.resetCurrentToken = function () {
        if (this.currentToken === null)
            return;
        this.currentToken = {
            type: Symbol("INIT"),
            value: ""
        };
    };
    Tokenizer.prototype.emit = function (token) {
        if (!token.value)
            return;
        this.tokens.push(token);
    };
    __decorate([
        jumpSpace
    ], Tokenizer.prototype, "searchBeginTagStart");
    __decorate([
        jumpSpace
    ], Tokenizer.prototype, "searchJSXAttributeKey");
    __decorate([
        jumpSpace
    ], Tokenizer.prototype, "searchJSXAttributeValue");
    return Tokenizer;
}());
function jumpSpace(target, propertyKey, descriptor) {
    var method = descriptor.value;
    var jumpSpaceFunc = function (char) {
        if (char === " ")
            return jumpSpaceFunc;
        return method.call(this, char);
    };
    descriptor.value = jumpSpaceFunc;
}
function createTokenizer(Tokenizer, input) {
    return new Tokenizer(input);
}
var input = '   <h1 id="title"><span>hello</span>world</h1>';
var tokenizer = createTokenizer(Tokenizer, input);
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
