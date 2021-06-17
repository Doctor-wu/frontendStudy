"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTokenizer = exports.Tokenizer = exports.JSXTokenizer = void 0;
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
})(JSXTokenizer = exports.JSXTokenizer || (exports.JSXTokenizer = {}));
var Tokenizer = /** @class */ (function () {
    function Tokenizer(input) {
        this.tokens = [];
        this.currentToken = {
            type: Symbol("INIT"),
            value: "",
        };
        this.RE = {
            LETTERS: /[a-zA-z0-9]/,
        };
        this.input = input;
    }
    Tokenizer.prototype.run = function () {
        var state = this.searchBeginTagStart;
        for (var _i = 0, _a = this.input; _i < _a.length; _i++) {
            var char = _a[_i];
            if (state !== undefined) {
                // 忽略换行
                if (/\r\n|\r|\n/.test(char))
                    continue;
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
                value: char,
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
            value: "",
        };
    };
    Tokenizer.prototype.emit = function (token) {
        if (!token.value)
            return;
        console.log(token.value);
        this.tokens.push(token);
    };
    __decorate([
        jumpSpace,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Function)
    ], Tokenizer.prototype, "searchBeginTagStart", null);
    __decorate([
        jumpSpace,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Function)
    ], Tokenizer.prototype, "searchJSXAttributeKey", null);
    __decorate([
        jumpSpace,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Function)
    ], Tokenizer.prototype, "searchJSXAttributeValue", null);
    return Tokenizer;
}());
exports.Tokenizer = Tokenizer;
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
exports.createTokenizer = createTokenizer;
