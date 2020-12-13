"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sum;
function f1(a, b) {
}
sum = f1; // OK
function f2(a) {
}
sum = f2; // OK 参数可以少
function f3(a, b, c) {
}
// sum = f3; // Error 参数不能多
