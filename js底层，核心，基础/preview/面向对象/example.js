// Array.prototype.myDistinct = function myDistinct() {
//     // 实现数组去重
//     // ES6中的Set实例（不重复的数组）:Set的实例
//     // return [...new Set(this)]
//     return Array.from(new Set(this))
// }

// let arr = [1, 2, 3, 4, 7, 5, 5, 4, 3, 2, 1];
// console.log(arr.myDistinct().reverse());

// function fun() {
//     this.a = 0;
//     this.b = function() {
//         console.log(this.a);
//     }
// }
// fun.prototype = {
//     b: function() {
//         this.a = 20;
//         console.log(this.a);
//     },
//     c: function() {
//         this.a = 30;
//         console.log(this.a)
//     }
// }
// var my_fun = new fun();
// my_fun.b(); // 0
// my_fun.c(); // 30

// function C1(name) {
//     if (name) {
//         this.name = name;
//     }
// }

// function C2(name) {
//     this.name = name;
// }

// function C3(name) {
//     this.name = name || 'join';
// }
// C1.prototype.name = 'Tom';
// C2.prototype.name = 'Tom';
// C3.prototype.name = 'Tom';
// console.log((new C1().name) /*Tom*/ + (new C2().name) /*undefined*/ + (new C3().name) /*join*/ ); // Tomundefinedjoin

// function Fn() {
//     let a = 1;
//     this.a = a;
// }
// Fn.prototype.say = function() {
//         this.a = 2;
//     } // useless

// Fn.prototype = new Fn; // a = 1
// let f1 = new Fn; // a = 1
// Fn.prototype.b = function() {
//     this.a = 3;
// }; // a = 1 ; b = function(){...}
// console.log(f1.a); // 1
// console.log(f1.prototype); // a = 1 ; b = function(){...}  /============================>undefined
// console.log(f1.b); // function(){...}
// console.log(f1.hasOwnProperty('b')); // false
// console.log('b' in f1); // true
// console.log(f1.constructor == Fn); // false/=============================>true

// function Foo() {
//     getName = function() {
//         console.log(1);
//     };
//     return this;
// }
// Foo.getName = function() {
//     console.log(2);
// };
// Foo.prototype.getName = function() {
//     console.log(3);
// };
// var getName = function() {
//     console.log(4);
// };

// function getName() {
//     console.log(5);
// }
// Foo.getName(); // 2
// getName(); // 4
// Foo().getName(); // 4 /====》1
// getName(); // 4  /====》1
// new Foo.getName(); // 2
// new Foo().getName(); // 4  /====》3
// new new Foo().getName(); // 4  /====》3

let n = 10;
Number.prototype.plus = function(val) {
    return this + val;
}
Number.prototype.minus = function(val) {
    return this - val;
}
let m = n.plus(10).minus(5);
console.log(m); //=>15（10+10-5）

//-------------------------------THIS-------------------------------------

/**
 * THIS: 全局上下文中的THIS=>window
 *  块级上下文没有自己的THIS，它的this是继承所在上下文中的this
 * 在函数的私有上下文中，this的情况会多种多样（重点研究）
 */