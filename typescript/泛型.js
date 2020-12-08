"use strict";
// 泛型工厂
function factory(Cstr) {
    return new Cstr();
}
var sum = function (a, b) {
    return (a + b);
};
console.log(sum(1, 2));
// 多泛型
function swap(tuple) {
    return [tuple[1], tuple[0]];
}
console.log(swap(["doctorwu", 123456]));
function logger(val) {
    console.log(val.length);
}
var obj = {
    length: 10
};
logger("doctorwu"); // 传入的参数需要满足Lengthwise
