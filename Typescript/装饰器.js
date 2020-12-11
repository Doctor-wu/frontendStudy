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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var classDecorator;
(function (classDecorator) {
    var replaceClass = function (custom) { return function (constructor) {
        return /** @class */ (function () {
            function class_1(name) {
                this.name = name;
                this.custom = custom;
            }
            return class_1;
        }());
    }; };
    var People = /** @class */ (function () {
        function People(name) {
            this.name = name;
        }
        ;
        People = __decorate([
            replaceClass({
                gender: "male",
                age: 20
            }),
            __metadata("design:paramtypes", [String])
        ], People);
        return People;
    }());
    // console.log(new People("Doctorwu"))
})(classDecorator || (classDecorator = {}));
// 属性装饰器
// 装饰属性
// 装饰方法
var propertyDecorator;
(function (propertyDecorator) {
    // 属性装饰器
    // 装饰属性
    // 装饰方法
    // 如果装饰的是实例属性的话，target是构造函数原型
    function upperCase(target, propertyKey) {
        var value = target[propertyKey];
        var getter = function () { return value; };
        var setter = function (newVal) {
            value = newVal.toUpperCase();
        };
        if (delete target[propertyKey]) {
            Object.defineProperty(target, propertyKey, {
                get: getter,
                set: setter,
                enumerable: true,
                configurable: true
            });
        }
    }
    // 如果装饰的是静态属性的话，target是构造函数本身
    function staticPropertyDecorator(target, propertyKey) {
        console.log(target, propertyKey, propertyKey);
    }
    // 如果装饰的是实例属性(方法属性)的话，target是构造函数原型
    function noEnumerable(target, propertyKey, descriptor) {
        console.log(target, propertyKey, descriptor
        // , target === Person.prototype /* true */
        );
        descriptor.enumerable = false;
    }
    function toNumber(target, propertyKey, descriptor) {
        var oldMethod = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return oldMethod.apply(this, args.map(function (i) { return parseFloat(i); }));
        };
    }
    var Person = /** @class */ (function () {
        function Person() {
            this.name = "Doctorwu";
        }
        Person.prototype.getName = function () {
            console.log(this.name);
        };
        Person.prototype.sum = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return args.reduce(function (accu, item) { return accu + item; }, 0);
        };
        Person.age = 10;
        __decorate([
            upperCase,
            __metadata("design:type", String)
        ], Person.prototype, "name", void 0);
        __decorate([
            noEnumerable,
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], Person.prototype, "getName", null);
        __decorate([
            toNumber,
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", void 0)
        ], Person.prototype, "sum", null);
        __decorate([
            staticPropertyDecorator,
            __metadata("design:type", Number)
        ], Person, "age", void 0);
        return Person;
    }());
    var doctorwu = new Person();
    console.log(doctorwu.name);
    doctorwu.getName();
    console.log(doctorwu.sum('1', '2', 3));
})(propertyDecorator || (propertyDecorator = {}));
// 参数装饰器
var paramDecorator;
(function (paramDecorator) {
    // target 静态成员就是构造函数 非静态成员就是构造函数原型 methodName 这个参数所属方法的名称 paramIndex 参数的索引
    function addAge(target, methodName, paramIndex) {
        console.log(target, methodName, paramIndex);
        target.age = 10;
    }
    var Person = /** @class */ (function () {
        function Person() {
        }
        Person.prototype.login = function (username, password) {
            console.log(username, password, this.age);
        };
        __decorate([
            __param(1, addAge),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [String, String]),
            __metadata("design:returntype", void 0)
        ], Person.prototype, "login", null);
        return Person;
    }());
    var p = new Person();
    p.login("1", "2");
})(paramDecorator || (paramDecorator = {}));
