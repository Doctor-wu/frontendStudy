"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sum(A, b) {
    if (b === void 0) { b = 5; }
    return A + b;
}
function concatString(a, b) {
    if (b === void 0) { b = ""; }
    return a + b;
}
/* zero functions */
console.log(compose()(1));
console.log(compose(sum)(1));
console.log(compose(sum, sum)(1));
console.log(compose(sum, sum, concatString)(1));
console.log(compose(sum, concatString, sum, sum)(1));
console.log(compose(sum, sum, sum, sum, sum)(1));
console.log(compose(sum, sum, sum, sum, sum, sum)(1));
// export default function compose<R>(...funcs: Function[]): (...args: any[]) => R;
function compose() {
    var funcs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        funcs[_i] = arguments[_i];
    }
    if (funcs.length === 0) {
        return function (arg) { return arg; };
    }
    if (funcs.length === 1) {
        return funcs[0];
    }
    return funcs.reduce(function (a, b) { return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return a(b.apply(void 0, args));
    }; });
}
exports.default = compose;
