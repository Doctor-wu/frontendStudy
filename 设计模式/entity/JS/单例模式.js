"use strict";
/**
 * 普通单例
 *  缺点是类的使用者必须知道这是一个单例模式的类，并且主动调用获取实例的方法
 * */
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var NormalSingle;
(function (NormalSingle) {
    var Single = /** @class */ (function () {
        function Single(name) {
            this.name = name;
        }
        Single.getInstance = (function () {
            var instance; // 闭包
            return function (name) {
                if (!instance) {
                    instance = new Single(name);
                }
                return instance;
            };
        })();
        return Single;
    }());
    NormalSingle.Single = Single;
})(NormalSingle || (NormalSingle = {}));
var s1 = NormalSingle.Single.getInstance("doctorwu");
var s2 = NormalSingle.Single.getInstance("doctorwu666");
console.log(s1, s2, s1 === s2);
/**
 * 透明单例模式
 *  类的使用者正常使用即可
 * */
var TransparentSingle;
(function (TransparentSingle) {
    var Single = /** @class */ (function () {
        function Single(name) {
            if (!Single.instance) {
                this.name = name;
                Single.instance = this;
            }
            return Single.instance;
        }
        Single.instance = undefined;
        return Single;
    }());
    TransparentSingle.Single = Single;
})(TransparentSingle || (TransparentSingle = {}));
var s3 = new TransparentSingle.Single("doctorwu666");
var s4 = new TransparentSingle.Single("doctorwu");
console.log(s3, s4, s3 === s4);
/***
 * 创建单例函数的函数
 * @param Cstr
 * @constructor
 */
function CreateSingle(Cstr) {
    var instance;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!instance) {
            instance = new (Cstr.bind.apply(Cstr, __spreadArrays([void 0], args)))();
        }
        return instance;
    };
}
var My = /** @class */ (function () {
    function My(name) {
        this.name = name;
    }
    My.prototype.getName = function () {
        return this.name;
    };
    return My;
}());
var You = /** @class */ (function () {
    function You(age) {
        this.age = age;
    }
    You.prototype.getAge = function () {
        return this.age;
    };
    return You;
}());
var mySingle = CreateSingle(My);
var youSingle = CreateSingle(You);
console.log(mySingle("dtwu"), mySingle("doctorwu"), mySingle("dtwu") === mySingle("doctorwu"));
console.log(youSingle("doctorwu"), youSingle("dtwu"), youSingle("dtwu") === youSingle("doctorwu"));
console.log(youSingle("dtwu212").getAge());
console.log(mySingle("dtwu2432").getName());
