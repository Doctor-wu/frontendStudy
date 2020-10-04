## Promise基本知识

Promise是ES6新增的内置类：承诺模式，主要用来规划异步编程的



### 解决的问题

- 回调地狱-用链式调用取代了回调包裹回调



new Promise([executor]); // executor立即执行

Promise本身是同步的，是用来管理异步的

resolve(xxx)属于异步过程



### Promise实例

- [[PromiseState]]: promise的状态    fullfilled/resolved    pending     rejected
- [[PromiseResult]]: promise的结果     初始值是undefined  无论是失败的原因还是成功的结果都会赋值给他

Promise一旦决议就不会再更改状态



### Promise.prototype

#### .then([A],[B])

  .then方法存放两个函数A/B，状态为成功时调用A，失败时调用B，并且把[[PromiseResult]]的值传给对应的函数

执行then方法会返回一个全新的Promise实例，新实例的状态由上一个实例基于then存放的A/B决定，无论是A/B执行，只要执行不报错，则新实例的状态都是成功，反之执行报错就是失败，新实例的结果是A/B的返回结果，或报错原因

若A/B返回的是Promise实例，则会递归展开这个Promise并且新实例的状态由返回的Promise状态决定

#### .catch()

#### .finally()

![](..\imgs\微信图片_20200910174720.png)



