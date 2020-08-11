(function () {
    // constructor
    function MyPromise(executor) {
        // 参数合法校验
        if (typeof executor !== "function") {
            throw new TypeError('MyPromise resolver ' + executor + ' is not a function');
        }

        // 设置实例的私有属性
        var _this = this;
        this.PromiseStatus = 'pending';
        this.PromiseValue = undefined;
        this.resolveFunc = function () {};
        this.rejectFunc = function () {};

        // 修改实例的状态和value：只有当前状态为pending才能修改状态
        function change(status, value) {
            if (_this.PromiseStatus !== "pending") return;
            _this.PromiseStatus = status;
            _this.PromiseValue = value;
            // 通知基于.then注入的某个方法执行（异步的）
            var delayTimer = setTimeout(function () {
                clearTimeout(delayTimer);
                delayTimer = null;

                var status = _this.PromiseStatus,
                    value = _this.PromiseValue;
                status === "fulfilled" ?
                    _this.resolveFunc.call(_this, value) :
                    _this.rejectFunc.call(_this, value);
            }, 0);
        }

        // new MyPromise的时候会立即把executor函数执行
        // executor函数执行出现错误，也会把实例的状态改为失败，且value是失败的原因
        try {
            executor(function resolve(value) {
                change('fulfilled', value);
            }, function reject(reason) {
                change('rejected', reason);
            });
        } catch (err) {
            change('rejected', err.message);
        }
    }

    // MyPromise.prototype
    MyPromise.prototype.then = function (resolveFunc, rejectFunc) {
        // 参数不传默认值的处理：目的是实现状态的顺延
        if (typeof resolveFunc !== "function") {
            resolveFunc = function (value) {
                return MyPromise.resolve(value);
            };
        }
        if (typeof rejectFunc !== "function") {
            rejectFunc = function (reason) {
                return MyPromise.reject(reason);
            };
        }

        var _this = this;
        return new MyPromise(function (resolve, reject) {
            // 我们返回的新实例的成功和失败（执行resolve/reject）
            // 由resolveFunc/rejectFunc执行是否报错来决定（或者返回值是否为新的MyPromise实例来决定）
            _this.resolveFunc = function (value) {
                try {
                    var x = resolveFunc.call(_this, value);
                    x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
                } catch (err) {
                    reject(err.message);
                }
            };
            _this.rejectFunc = function (reason) {
                try {
                    var x = rejectFunc.call(_this, reason);
                    x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
                } catch (err) {
                    reject(err.message);
                }
            };
        });
    };
    MyPromise.prototype.catch = function (rejectFunc) {
        return this.then(null, rejectFunc);
    };

    // 把MyPromise当作对象
    MyPromise.resolve = function (value) {
        return new MyPromise(function (resolve) {
            resolve(value);
        });
    };
    MyPromise.reject = function (reason) {
        return new MyPromise(function (_, reject) {
            reject(reason);
        });
    };
    MyPromise.all = function (promiseArr) {
        return new MyPromise(function (resolve, reject) {
            var index = 0,
                values = [];
            for (var i = 0; i < promiseArr.length; i++) {
                // 利用闭包的方式保存循环的每一项索引
                (function (i) {
                    var item = promiseArr[i];
                    // 如果当前项不是Promise:直接算作当前项成功
                    !(item instanceof MyPromise) ? item = MyPromise.resolve(item): null;
                    item.then(function (value) {
                        index++;
                        values[i] = value;
                        if (index >= promiseArr.length) {
                            // 所有的实例都是成功的
                            resolve(values);
                        }
                    }).catch(function (reason) {
                        // 只要有一个失败，整体就是失败的
                        reject(reason);
                    });
                })(i);
            }
        });
    };

    window.MyPromise = MyPromise;
})();

//----------
/* function fn1() {
    return MyPromise.resolve(1);
}

function fn2() {
    return new MyPromise((resolve, reject) => {
        setTimeout(() => {
            resolve(2);
        }, 2000);
    });
}

function fn3() {
    return new MyPromise((resolve, reject) => {
        setTimeout(() => {
            reject(3);
        }, 1000);
    });
}

MyPromise.all([fn1(), fn2(), fn3(), 10])
    .then(function (values) {
        console.log('OK', values);
    })
    .catch(function (reason) {
        console.log('NO', reason);
    });
 */
// new MyPromise(function (resolve, reject) {
//     // resolve(10);
//     reject(20);
// }).then(function (value) {
//         console.log('OK', value);
//         return MyPromise.reject(200);
//     },
//     /* function (reason) {
//     console.log('NO', reason);
//     return 100;
// } */
// ).then(function (value) {
//     console.log('OK', value);
// }, function (reason) {
//     console.log('NO', reason);
// });