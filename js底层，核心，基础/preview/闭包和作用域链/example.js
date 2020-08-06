// example 1
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

// example 2
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


// example 3
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