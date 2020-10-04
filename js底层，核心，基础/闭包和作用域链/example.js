// // example 1
// let x = 1;

// function A(y) {
//     let x = 2;

//     function B(z) {
//         console.log(x + y + z); // 7
//     }
//     return B;
// }
// let C = A(2);
// C(3);

// // example 2
// let x = 5;

// function fn(x) {
//     return function(y) {
//         console.log(y + (++x));
//     }
// }
// let f = fn(0);
// f(7); // x->1 7 + 1 = 8   函数在哪个上下文中创建的，作用域就是谁
// fn(8)(9); // 8 + （++9）=18 重新执行fn开辟一个新的执行上下文
// f(10); // x->2 10 + 2 = 12
// console.log(x); // 5


// // example 3
// let a = 0,
//     b = 0;

// function A(a) {
//     A = function(b) {
//         console.log(a + b++);
//     }
//     console.log(a++);
// }
// A(1); // 1  a->2
// A(2); // 4  b->3

// var arr = [];
// debugger
// for (let i = 0; i < 5; i++) {
//     var a = 5;
//     arr[i] = function() {
//         console.log(i);
//     }
// }
// console.log(a);
// arr.forEach(f => f());










// {
//     console.log(foo); // function foo(){2}
//     console.log(window.foo); // undefined, 因为下面还有一次映射，所以第一次不会映射
//     foo = 3;

//     function foo() { 1 };
//     console.log(window.foo)
//     foo = 1; // 映射给全局
//     function foo() { 2 };
//     console.log(foo); // 1
// }
// console.log(foo); // 1




// for (var i = 0; i < 10; i++) {
//     function index() {};
//     index = i;
//     setTimeout(function() {
//         console.log(index);
//     }, 1000)
// }

// var a = 12;
// if (true) {
//     console.log(a); // function 
//     a = 13;
//     console.log(a); // 13

//     function a() {};
//     a = 14;
//     console.log(a); // 14
// }
// console.log(a); // 13

// var x = 1;

// function func(
//     x,
//     y = function anonymous1() {
//         x = 2;
//     }
// ) {
//     var x = 3;
//     y();
//     console.log(x);
// }
// func(5);
// console.log(x);

// var a = 9;

// function fn() {
//     a = 0;
//     return function(b) {
//         return b + a++;
//     }
// }
// var f = fn(); // a = 0;
// console.log(f(5)); // 5  a->1
// console.log(fn()(5)); // a->0 5 a->1
// console.log(f(5)); // 6 a->2
// console.log(a); // 2

// var test = (
//     function(i) {
//         return function() {
//             console.log(i *= 2); // 4
//         }
//     }
// )(2)
// test(5);



// /**
//  * EC(G)
//  * function fun(n,o){...};var c;
//  */
// function fun(n, o) {
//     /**
//      * EC(FUN)
//      * 初始化作用域链<EC(FUN), EC(G)>
//      * 初始化this
//      * 初始化arguments
//      * 形参赋值 n = 0; o //  n = 1; o = 0;
//      * 变量提升：--
//      */
//     console.log(o); // undefined 
//     return {
//         fun: function(m) {
//             /**
//              * EC(ANO)
//              * 初始化作用域链<EC(ANO), EC(FUN)>
//              * 初始化this {fun: ...}
//              * 初始化arguments 1
//              * 形参赋值 m = 1 // m =2  
//              * 变量提升：--
//              */
//             return fun(m, n); // fun(1, 0) // fun(2, 1)
//         }
//     };
// }

// var c = fun(0).fun(1); // {fun: function(m){...}}
// c.fun(2);
// c.fun(3);

// /**
//  * undefined
//  * 0
//  * 1
//  * 1
//  */


// var b = 10;
// (
//     // 匿名函数具名化有几个特点
//     // 1.设置的名字只能在函数内部使用，外部是无法使用的（基于这种方式代替严格模式下不兼容的arguments.callee）
//     function b() { // 如果这里是匿名函数，那么答案两个都是20
//         // 并且如果这个具名函数的名字在函数体内被重新赋值，那么函数内部的变量不会被修改(除非函数名被重新声明过)
//         // 并且外部如果有同名变量那么也不会改变
//         b = 20;
//         console.log(b); // function b(){...}
//     }
// )();
// console.log(b); // 10