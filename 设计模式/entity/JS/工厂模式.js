"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Fruit = /** @class */ (function () {
    function Fruit(name) {
        this.name = name;
    }
    Fruit.prototype.log = function () {
        console.log(this);
    };
    return Fruit;
}());
var Apple = /** @class */ (function (_super) {
    __extends(Apple, _super);
    function Apple(flavour) {
        var _this = _super.call(this, "苹果") || this;
        _this.flavour = flavour;
        return _this;
    }
    return Apple;
}(Fruit));
var Orange = /** @class */ (function (_super) {
    __extends(Orange, _super);
    function Orange(flavour) {
        var _this = _super.call(this, "橘子") || this;
        _this.flavour = flavour;
        return _this;
    }
    return Orange;
}(Fruit));
// **直接new的缺点**
// 1. 耦合
// 2. 依赖具体实现
// new Apple("甜").log();
// new Orange("酸").log();
var Factory = /** @class */ (function () {
    function Factory() {
    }
    Factory.prototype.create = function (type) {
        switch (type) {
            case "apple":
                return new Apple("甜");
            case "orange":
                return new Apple("酸");
            default:
                throw new Error("没有想要的产品");
        }
    };
    return Factory;
}());
new Factory().create("orange").log();
new Factory().create("apple").log();
