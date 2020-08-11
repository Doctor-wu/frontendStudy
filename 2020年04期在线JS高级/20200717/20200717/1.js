/*
 * EC(G)
 *   var a;
 *   function b(x,y,a){...};
 */
// var a = 4;
// function b(x, y, a) {
// 	/*
// 	 * EC(B) 
// 	 *   作用域链:<EC(B),EC(G)>
// 	 *   初始ARGUMENTS:{0:1,1:2,2:3,length:3} 类数组集合(不论是否设置形参，只要传递实参，ARGUMENTS中就有结果的，不传递实参是一个空的类数组集合)
// 	 *   形参赋值:x=1 y=2 a=3
// 	 *   变量提升:--
// 	 * 
// 	 * 在非严格模式下，形参赋值完成，会和ARGUMENTS中的每一项建立映射机制（一个改，另外一个也会跟着改）；但是严格模式下（"use strict"）不存在映射机制；
// 	 */
// 	console.log(a); //=>3
// 	arguments[2] = 10;
// 	console.log(a); //=>10

// 	x=20;
// 	console.log(arguments[0]); //=>20
// }
// a = b(1, 2, 3); // a=undefined 因为b函数执行没有返回值(主要看return)
// console.log(a); //=>undefined


// var a = 4;
// function b(x, y, a) {
// 	/*
// 	 * EC(B) 
// 	 *   作用域链:<EC(B),EC(G)>
// 	 *   初始ARGUMENTS:[1,2]  类数组
// 	 *   形参赋值:x=1 y=2 a=undefined
// 	 *   变量提升:--
// 	 * 
// 	 * 映射机制是在函数代码执行之前完成的，那会建立了映射就有映射，如果此时没建立，映射机制后续也就不会再有了
// 	 */
// 	a = 3;
// 	console.log(arguments[2]); //=>undefined
// }
// a = b(1, 2);

/* 
function b(...args) {
	// console.log(arguments);
	console.log(args);
}
b(1, 2, 3, 4);
*/

//==========================================
// var test = (function (i) {
// 	/*
// 	 * 先把自执行函数执行，再把自执行函数执行的返回结果赋值给test 
// 	 * => test等于的是返回的小函数 
// 	 * EC(AN)
// 	 *   作用域链:<EC(AN),EC(G)>
// 	 *   形参赋值:i=2
// 	 *   变量提升:--
// 	 * 不释放的闭包
// 	 */
//     return function () {
// 		/*
// 		 * test(5)执行 EC(TEST)
// 		 *   作用域链:<EC(TEST),EC(AN)>
// 	 	 *   形参赋值:--
// 	     *   变量提升:--
// 		 */
//         alert(i *= 2); //=> i=i*2 =>'4'
//     }
// })(2);
// test(5);

//==========================================
/* var b = 10;
(function () {
	// b是EC(G)中的
	b = 20;
	console.log(b);
})();
console.log(b); */

/* 
var b = 10;
(function b() {
	b = 20;
	console.log(b); //=>函数
})();
console.log(b); //=>10 
*/

/* 
var b = 10;
(function b() {
	var b = 20;
	console.log(b); //=>20
})();
console.log(b); //=>10  
*/


/* 
// 匿名函数具名化(设置了名字):
// 1.设置的名字只能在函数内部使用,外部是无法使用的（基于这种方式代替严格模式下不兼容的arguments.callee，并以此实现递归算法[自己调用自己自]）
// 2.在函数内部去修改这个名字值，默认是不能修改的，代表的依然是函数本身（除非这个函数名字在函数体中被重新声明过，重新声明后，一起都按照重新声明的为主）
(function fn() {
	// console.log(fn); //函数本身

	// fn = 10;
	// console.log(fn); //函数本身

	// /!*
	//  * 变量提升: var fn;
	//  *!/
	// console.log(fn); //=>undefined
	// var fn = 20;
	// console.log(fn); //=>20
})();
console.log(fn); //Uncaught ReferenceError: fn is not defined 
*/