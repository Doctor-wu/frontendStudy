/* 
 * JS是单线程的，所以大部分代码都是同步的，但是也有一些代码是异步的
 *    + setTimeout/setInterval定时器
 *    + 事件绑定/事件监听
 *    + ajax/fetch 请求数据的时候也是采用异步的（ajax可以控制同步）
 *    + Promise中的异步操作
 *    + async/await中的异步操作
 *    + node.js中的异步操作
 *    + ...
 */
/* setTimeout(() => {
    console.log(1);
}, 20);
console.log(2);
setTimeout(() => {
    console.log(3);
}, 10);
console.log(4);
console.time('AA');
for (let i = 0; i < 90000000; i++) {
    // do soming
}
console.timeEnd('AA'); //=>AA: 79ms 左右
console.log(5);
setTimeout(() => {
    console.log(6);
}, 8);
console.log(7);
setTimeout(() => {
    console.log(8);
}, 15);
console.log(9); */

/* setTimeout(() => {
    console.log(1);
}, 10);
setTimeout(() => {
    console.log(2);
}, 0);
console.log(3);
while (1) {} //同步任务永远结束不了（主线程一直被占用着）  就不会去找异步任务
console.log(4); */

/* setTimeout(() => {
    console.log(1);
}, 10);
setTimeout(() => {
    console.log(2);
    while (1) {} //因为所有的异步任务最后都会进入到主栈交给主线程执行，执行到此后，主线程又被占用了
}, 0);
console.log(3); */

/* console.log(1);
setTimeout(() => {
    console.log(2);
    setTimeout(() => {
        console.log(3);
    }, 20);
}, 10);
console.log(4);
for (let i = 0; i < 99999999; i++) {}
console.log(5);
setTimeout(() => {
    console.log(6);
    setTimeout(() => {
        console.log(7);
    }, 10);
}, 0);
console.log(8); */