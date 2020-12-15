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
function before(beforeFn) {
    var factoryArgs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        factoryArgs[_i - 1] = arguments[_i];
    }
    return function (target, propertyKey, descriptor) {
        var oldVal = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            beforeFn.apply(this, factoryArgs);
            oldVal.apply(this, args);
        };
    };
}
function takeMoney(money) {
    console.log("\u4ECE\u5BB6\u91CC\u5E26\u4E86" + money);
}
var DecoratorPattern;
(function (DecoratorPattern) {
    var My = /** @class */ (function () {
        function My(name) {
            this.name = name;
        }
        My.prototype.buy = function (money, goods) {
            console.log(this.name + "\u82B1" + money + "\u4E70\u4E86" + goods);
        };
        __decorate([
            before(takeMoney, "10元"),
            before(takeMoney, "10元"),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [String, String]),
            __metadata("design:returntype", void 0)
        ], My.prototype, "buy", null);
        return My;
    }());
    DecoratorPattern.My = My;
})(DecoratorPattern || (DecoratorPattern = {}));
var dtwu = new DecoratorPattern.My("doctorwu");
dtwu.buy("5元", "一瓶枝枝");
console.log(dtwu.name);
