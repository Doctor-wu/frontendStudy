"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Animal = /** @class */ (function () {
    function Animal() {
    }
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Dog;
}(Animal));
var BlackDog = /** @class */ (function (_super) {
    __extends(BlackDog, _super);
    function BlackDog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BlackDog;
}(Dog));
function exec(callback) {
}
var childToChild = function (bD) { return bD; };
var childToParent = function (bD) { return new Animal(); };
var parentToParent = function (animal) { return new Animal(); };
var parentToChild = function (animal) { return new BlackDog(); };
exec(parentToChild); // OK
// 如果关闭 "strictFunctionTypes" 选项的话，ts中的函数是双向协变的
