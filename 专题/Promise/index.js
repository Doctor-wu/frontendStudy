"use strict";
// exports.__esModule = true;
var MyPromise = /** @class */ (function () {
    function MyPromise(excutor) {
        var _this = this;
        this.state = 'pending';
        this.data = null;
        this.reason = null;
        this.resolveQueue = [];
        this.rejectQueue = [];
        var resolve = function (data) {
            if (_this.state === 'pending') {
                _this.state = 'fullfield';
                _this.data = data;
                if (_this.resolveQueue.length !== 0) {
                    for (var _i = 0, _a = _this.resolveQueue; _i < _a.length; _i++) {
                        var cb = _a[_i];
                        cb(data);
                    }
                }
            }
        };
        var reject = function (reason) {
            if (_this.state === 'pending') {
                _this.state = 'reject';
                _this.reason = reason;
                if (_this.rejectQueue.length !== 0) {
                    for (var _i = 0, _a = _this.rejectQueue; _i < _a.length; _i++) {
                        var cb = _a[_i];
                        cb(reason);
                    }
                }
            }
        };
        try {
            excutor(resolve, reject);
        }
        catch (e) {
            reject(e);
        }
    }
    MyPromise.prototype.then = function (resolveHandler, rejectHandler) {
        var _this = this;
        // onFulfilled如果不是函数，就忽略onFulfilled，直接返回value
        resolveHandler = typeof resolveHandler === 'function' ? resolveHandler : function (value) { return value; };
        // onRejected如果不是函数，就忽略onRejected，直接扔出错误
        rejectHandler = typeof rejectHandler === 'function' ? rejectHandler : function (err) { throw err; };
        var promise2 = new MyPromise(function (resolve, reject) {
            if (_this.state === 'pending') {
                // 等待Promise决议
                _this.resolveQueue.push(function () {
                    setTimeout(function () {
                        try {
                            var x = resolveHandler(_this.data);
                            _this.resolvePromise(promise2, x, resolve, reject);
                        }
                        catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
                _this.rejectQueue.push(function () {
                    setTimeout(function () {
                        try {
                            var x = rejectHandler(_this.reason);
                            _this.resolvePromise(promise2, x, resolve, reject);
                        }
                        catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
            }
            if (_this.state === 'fullfield') {
                setTimeout(function () {
                    try {
                        var x = resolveHandler(_this.data);
                        _this.resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                }, 0);
            }
            if (_this.state === 'reject') {
                setTimeout(function () {
                    try {
                        var x = rejectHandler(_this.reason);
                        _this.resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                }, 0);
            }
        });
        return promise2;
    };
    MyPromise.prototype.resolvePromise = function (promise2, x, resolve, reject) {
        var _this = this;
        if (x === promise2) {
            // reject报错
            return reject(new TypeError('Chaining cycle detected for promise'));
        }
        // 防止多次调用
        var called;
        // x不是null 且x是对象或者函数
        if (x != null && (typeof x === 'object' || typeof x === 'function')) {
            try {
                // A+规定，声明then = x的then方法
                var then = x.then;
                // 如果then是函数，就默认是promise了
                if (typeof then === 'function') {
                    // 就让then执行 第一个参数是this   后面是成功的回调 和 失败的回调
                    then.call(x, function (y) {
                        // 成功和失败只能调用一个
                        if (called)
                            return;
                        called = true;
                        // resolve的结果依旧是promise 那就继续解析
                        _this.resolvePromise(promise2, y, resolve, reject);
                    }, function (err) {
                        // 成功和失败只能调用一个
                        if (called)
                            return;
                        called = true;
                        reject(err); // 失败了就失败了
                    });
                }
                else {
                    resolve(x); // 直接成功即可
                }
            }
            catch (e) {
                // 也属于失败
                if (called)
                    return;
                called = true;
                // 取then出错了那就不要在继续执行了
                reject(e);
            }
        }
        else {
            resolve(x);
        }
    };
    return MyPromise;
}());
// 目前是通过他测试 他会测试一个对象
// 语法糖
MyPromise.deferred = function () {
    var dfd = {};
    dfd.promise = new MyPromise(function (resolve, reject) {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
};
module.exports = MyPromise;
//npm install promises-aplus-tests 用来测试自己的promise 符不符合promisesA+规范
