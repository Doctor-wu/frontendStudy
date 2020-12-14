"use strict";
// 扩展局部变量的类型
// declare var String: StringConstructor;
//
// interface StringConstructor {
//     new(value?: any): String;
//
//     (value?: any): string;
//
//     readonly prototype: String;
// }
//
// interface String {
//     toString(): string;
// }
String.prototype.double = function () {
    // @ts-ignore
    return this + this;
};
var result = "hello".double(); // hellohello
console.log(result);
