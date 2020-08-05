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