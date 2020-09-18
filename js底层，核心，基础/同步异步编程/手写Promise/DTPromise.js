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
        resolve(data)
    })
}

DTPromise.reject = function(reason) {
    return new DTPromise((_, reject) => {
        reject(reason)
    })
}



DTPromise.prototype.then = function(resolve, reject) {
    reject = reject || DTPromise.reject;
    resolve = resolve || DTPromise.resolve;
    let x;
    return new DTPromise((res, rej) => {
        try {
            if (this.DTPromiseStatus === "fullfilled") {
                x = resolve(this.DTPromiseValue);
            } else {
                x = reject(this.DTPromiseValue);
            }
        } catch (e) {
            rej(e);
        }

        if (x instanceof DTPromise) {
            x.then(res, rej);
        } else {
            res(x);
        }
    })
}

DTPromise.prototype.catch = function(rej) {
    return this.then(res => {
        return DTPromise.resolve(res);
    }, rej);
}


function flushFuncs(DTP) {
    setTimeout(() => {
        if (DTP.DTPromiseStatus === "fullfilled") {
            DTP.resolveFuncs.forEach(func => {
                func(DTP.DTPromiseValue);
            });
            DTP.resolveFuncs.length = 0;
        } else {
            DTP.rejectFuncs.forEach(func => {
                func(DTP.DTPromiseValue);
                DTP.rejectFuncs.length = 0;
            })
        }
    }, 0);
}

let p = new DTPromise((resolve, reject) => {
    resolve("Hello Doctorwu");
    reject("Sorry Doctorwu");
});

p.then(res => {
    throw new Error("error")
}, rej => {
    console.log(rej, "error1");
}).then(res => {
    console.log(res, 111)
}).catch(rej => {
    console.log(rej, 222);
    return 333;
}).then(res => {
    console.log(res, 444);
});