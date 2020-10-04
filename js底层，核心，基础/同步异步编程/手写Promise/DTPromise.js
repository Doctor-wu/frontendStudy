function DTPromise(executor) {
    if (!executor) throw new Error("DTAxios need a executor");
    if (!executor instanceof Function) throw new Error("executor is not a function");
    this.DTPromiseStatus = "pending";
    this.DTPromiseValue = undefined;
    this.resolveFuncs = [];
    this.rejectFuncs = [];
    let _this = this;
    try {
        executor(resolve, reject);
    } catch (e) {
        reject.call(_this, e);
    }

    function resolve(data) {
        change.call(_this, "fullfilled", data);
    }

    function reject(reason) {
        change.call(_this, "reject", reason);
    }

    function change(status, info) {
        if (this.DTPromiseStatus !== "pending") return;
        this.DTPromiseStatus = status;
        this.DTPromiseValue = info;
        flushFuncs(_this);
    }
}

DTPromise.resolve = function(data) {
    return new DTPromise((resolve) => {
        if (data instanceof DTPromise) {
            data.then(resolve);
        } else {
            resolve(data)
        }
    })
}

DTPromise.reject = function(reason) {
    return new DTPromise((_, reject) => {
        reject(reason)
    })
}



DTPromise.prototype.then = function(resolve, reject) {
    let x;
    let NDTP = new DTPromise((res, rej) => {
        try {
            if (this.DTPromiseStatus === "fullfilled") {
                x = resolve(this.DTPromiseValue);

                if (x instanceof DTPromise) {
                    x.then(res, rej);
                } else {
                    res(x);
                }
            } else if (this.DTPromiseStatus === "reject") {
                x = reject(this.DTPromiseValue);

                if (x instanceof DTPromise) {
                    x.then(res, rej);
                } else {
                    res(x);
                }
            } else {
                resolve && this.resolveFuncs.push(resolve);
                reject && this.rejectFuncs.push(reject);
                this.resolveFuncs.push((data, error) => {
                    if (error) {
                        rej(error);
                    } else if (data instanceof DTPromise) {
                        data.then(res);
                    } else {
                        res(data);
                    }
                });
                this.rejectFuncs.push((reason, error) => {
                    if (error) {
                        rej(error);
                    } else if (reason instanceof DTPromise) {
                        reason.then(null, rej)
                    } else {
                        rej(reason);
                    }
                    rej(reason);
                });
            }
        } catch (e) {
            rej(e);
        }
    })
    return NDTP;
}

DTPromise.prototype.catch = function(rejFunc) {
    let _this = this;
    return new DTPromise((resolve, reject) => {
        _this.then(res => {
            resolve(res);
        }, rej => {
            try {
                resolve(rejFunc(rej));
            } catch (e) {
                reject(e);
            }
        })
    })
}

DTPromise.deferred = function() {
    var result = {};
    result.promise = new DTPromise(function(resolve, reject) {
        result.resolve = resolve;
        result.reject = reject;
    });

    return result;
}


function flushFuncs(DTP) {
    setTimeout(() => {
        let result = DTP.DTPromiseValue,
            error;
        if (DTP.DTPromiseStatus === "fullfilled") {
            DTP.resolveFuncs.forEach(func => {
                try {
                    result = func(result, error);
                } catch (e) {
                    error = e;
                }
            });
            DTP.resolveFuncs.length = 0;
        } else if (DTP.DTPromiseStatus === "reject") {
            DTP.rejectFuncs.forEach(func => {
                try {
                    result = func(result, error);
                } catch (e) {
                    error = e;
                }
            })
            DTP.rejectFuncs.length = 0;
        }
    }, 0);
}

let p = new DTPromise((resolve, reject) => {
    resolve("Hello Doctorwu");
    reject("Sorry Doctorwu");
});

p.then(res => {
    console.log(res);
    return new DTPromise((resolve) => {
        setTimeout(() => {
            resolve(111);
        }, 1000)
    });
}, rej => {
    console.log(rej, "error1");
}).then(res => {
    console.log(res, 222);
    throw new Error("333");
}).catch(rej => {
    console.log(rej, "catch");
    return "catch";
}).then(res => {
    console.log(res, 666);
});

module.exports = DTPromise;