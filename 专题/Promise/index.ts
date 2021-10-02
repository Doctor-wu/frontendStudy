class MyPromise {
  public state: 'pending' | 'fullfield' | 'reject' = 'pending';
  public data = null;
  public reason = null;
  public resolveQueue = [];
  public rejectQueue = [];

  constructor(excutor: Function) {
    let resolve = (data: any) => {
      if (this.state === 'pending') {
        this.state = 'fullfield';
        this.data = data;
        if (this.resolveQueue.length !== 0) {
          for (let cb of this.resolveQueue) {
            cb(data);
          }
        }
      }
    }
    let reject = (reason: any) => {
      if (this.state === 'pending') {
        this.state = 'reject';
        this.reason = reason;
        if (this.rejectQueue.length !== 0) {
          for (let cb of this.rejectQueue) {
            cb(reason);
          }
        }
      }
    }
    try {
      excutor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(resolveHandler?: Function, rejectHandler?: Function) {
    // onFulfilled如果不是函数，就忽略onFulfilled，直接返回value
    resolveHandler = typeof resolveHandler === 'function' ? resolveHandler : value => value;
    // onRejected如果不是函数，就忽略onRejected，直接扔出错误
    rejectHandler = typeof rejectHandler === 'function' ? rejectHandler : err => { throw err };

    let promise2 = new MyPromise((resolve, reject) => {
      if (this.state === 'pending') {
        // 等待Promise决议
        this.resolveQueue.push(() => {
          setTimeout(() => {
            try {
              let x = resolveHandler(this.data);
              this.resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.rejectQueue.push(() => {
          setTimeout(() => {
            try {
              let x = rejectHandler(this.reason);
              this.resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
      if (this.state === 'fullfield') {
        setTimeout(() => {
          try {
            let x = resolveHandler(this.data);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      if (this.state === 'reject') {
        setTimeout(() => {
          try {
            let x = rejectHandler(this.reason);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
    });
    return promise2;
  }

  resolvePromise(promise2: MyPromise, x, resolve, reject) {
    if (x === promise2) {
      // reject报错
      return reject(new TypeError('Chaining cycle detected for promise'));
    }
    // 防止多次调用
    let called;
    // x不是null 且x是对象或者函数
    if (x != null && (typeof x === 'object' || typeof x === 'function')) {
      try {
        // A+规定，声明then = x的then方法
        let then = x.then;
        // 如果then是函数，就默认是promise了
        if (typeof then === 'function') {
          // 就让then执行 第一个参数是this   后面是成功的回调 和 失败的回调
          then.call(x, y => {
            // 成功和失败只能调用一个
            if (called) return;
            called = true;
            // resolve的结果依旧是promise 那就继续解析
            this.resolvePromise(promise2, y, resolve, reject);
          }, err => {
            // 成功和失败只能调用一个
            if (called) return;
            called = true;
            reject(err);// 失败了就失败了
          })
        } else {
          resolve(x); // 直接成功即可
        }
      } catch (e) {
        // 也属于失败
        if (called) return;
        called = true;
        // 取then出错了那就不要在继续执行了
        reject(e);
      }
    } else {
      resolve(x);
    }
  }
}

// 目前是通过他测试 他会测试一个对象
// 语法糖
(MyPromise as any).deferred = function () {
  let dfd: any = {}
  dfd.promise = new MyPromise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
}

export default MyPromise;
//npm install promises-aplus-tests 用来测试自己的promise 符不符合promisesA+规范