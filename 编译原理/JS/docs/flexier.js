"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NumRE = /[0-9]/;
var Tokenizer = /** @class */ (function () {
    function Tokenizer(input) {
        this.tokens = [];
        this.currentToken = null;
        this.start(input);
    }
    Tokenizer.prototype.start = function (input) {
        var start = this.number;
        for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
            var char = input_1[_i];
            start = start.call(this, char);
        }
        if (this.currentToken !== null) {
            this.emit(this.currentToken);
        }
        return this.start;
    };
    Tokenizer.prototype.number = function (char) {
        if (NumRE.test(char)) {
            if (this.currentToken !== null) {
                this.currentToken.value += char;
            }
            else {
                this.currentToken = {
                    type: Symbol("Numeric"),
                    value: char,
                };
            }
            return this.number;
        }
        else if (char === "+" || char === "-") {
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
    };
    Tokenizer.prototype.emit = function (token) {
        this.tokens.push(token);
    };
    return Tokenizer;
}());
function createTokenizer(Tokenizer, input) {
    return new Tokenizer(input);
}
var tokenizer = createTokenizer(Tokenizer, "10+20-30+5-6000");
console.log(tokenizer.tokens);
