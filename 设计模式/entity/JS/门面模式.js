"use strict";
var Calculator = /** @class */ (function () {
    function Calculator() {
        this.sum = new Sum();
        this.minus = new Minus();
        this.mutiply = new Mutiply();
        this.divider = new Divider();
    }
    return Calculator;
}());
var Sum = /** @class */ (function () {
    function Sum() {
    }
    Sum.prototype.execute = function (a, b) {
        return a + b;
    };
    return Sum;
}());
var Minus = /** @class */ (function () {
    function Minus() {
    }
    Minus.prototype.execute = function (a, b) {
        return a - b;
    };
    return Minus;
}());
var Mutiply = /** @class */ (function () {
    function Mutiply() {
    }
    Mutiply.prototype.execute = function (a, b) {
        return a * b;
    };
    return Mutiply;
}());
var Divider = /** @class */ (function () {
    function Divider() {
    }
    Divider.prototype.execute = function (a, b) {
        return a / b;
    };
    return Divider;
}());
console.log(new Calculator().divider.execute(8, 2));
