/*
 * 单例设计模式：用单独的实例来管理当前事物的相关特征[属性和方法]（类似于实现一个分组的特点），而此时obj1/obj2不仅仅叫做一个对象，也被成为命名空间
 * 
 * 基于闭包管控的单例模式称为：高级单例设计模式，以此来实现模块划分（最早的模块化思想）
 */
/* 
let module1 = (function () {
	function query() {}

	function tools() {}

	return {
		name: 'AREA',
		tools
	};
})();
module1.tools(); 
*/

/* 
let haitao = (function () {
	function fn() {
		xiaotian.getXxx();
	}

	function query() {}
	return {
		query
	}
})();

let xiaotian = (function () {
	function fn() {}

	function getXxx() {}
	haitao.query();

	return {
		getXxx
	}
})(); 
*/

/*
 * 惰性思想：懒，执行过一遍的东西，如果第二遍执行还是一样的效果，则我们就不想让其重复执行第二遍了 
 */
/* function getCss(element, attr) {
	if ('getComputedStyle' in window) {
		return window.getComputedStyle(element)[attr];
	}
	return element.currentStyle[attr];
} */

/* 
function getCss(element, attr) {
	if ('getComputedStyle' in window) {
		getCss = function (element, attr) {
			return window.getComputedStyle(element)[attr];
		};
	} else {
		getCss = function (element, attr) {
			return element.currentStyle[attr];
		};
	}
	// 为了第一次也能拿到值
	return getCss(element, attr);
}
getCss(document.body, 'margin');
getCss(document.body, 'padding');
getCss(document.body, 'width'); 
*/

//=================================
/*
 * 柯理化函数思想：利用闭包保存机制，把一些信息预先存储下来（预处理的思想） 
 */
/* function fn(...outerArgs) {
	return function anonymous(...innerArgs) {
		// ARGS:外层和里层函数传递的所有值都合并在一起
		let args = outerArgs.concat(innerArgs);
		return args.reduce((n, item) => n + item);
	};
}
let f = fn(10, 20, 30);
f(40);
f(100);

let res = fn(1, 2)(3);
console.log(res); //=>6  1+2+3
*/

/* let arr = [10, 20, 30, 40, 50];
let res = arr.reduce((n, item) => {
	// 第一次触发回调函数执行，n是第一项，item是第二项
	// 第二次触发回调函数执行，n是上一次回调函数的返回结果，item继续向后遍历数组项
	// 第X次触发回调函数执行，n是x-1次回调函数的返回结果...
	console.log(n, item);

	// return的信息会作为下一次回调函数执行n的结果
	return n + item;
});
console.log(res); */

/* let arr = [10, 20, 30, 40, 50];
let res = arr.reduce((n, item) => {
	// 如果reduce传递了第二个实参值，初始n的值是第二个参数值，item是数组第一项
	console.log(n, item);
	return n + item;
}, 0);
console.log(res); */

/*
 * 回调函数：把一个函数作为值传递给另外一个函数，再另外一个函数中把这个函数执行（这是实现函数式编程重要的知识）
 *   函数式编程:注重结果，不在乎过程，过程交给别人处理（函数式编程）
 *   命令式编程:注重过程，需要自己去实现过程 
 */
// let arr = [10, 20, 30, 40, 50];

/* // 函数式编程：把如何实现封装成为方法，我们以后只要调取API方法，即可获取想要的结果即可
let res = arr.reduce((n, item) => {
	return n + item;
});
 */

/* // 命令式编程
let res = 0;
for (let i = 0; i < arr.length; i++) {
	res += arr[i];
}
console.log(res); */

//=============================================
/*
 * compose：组合函数，把多层函数嵌套调用扁平化
 */
const fn1 = (x, y) => x + y + 10;
const fn2 = x => x - 10;
const fn3 = x => x * 10;
const fn4 = x => x / 10;

// let res = fn4(fn2(fn3(fn1(20))));
// console.log(res);

function compose(...funcs) {
	// FUNCS:存储按照顺序执行的函数(数组) =>[fn1, fn3, fn2, fn4]
	return function anonymous(...args) {
		// ARGS:存储第一个函数执行需要传递的实参信息(数组)  =>[20]
		if (funcs.length === 0) return args;
		if (funcs.length === 1) return funcs[0](...args);
		return funcs.reduce((N, func) => {
			// 第一次N的值:第一个函数执行的实参  func是第一个函数
			// 第二次N的值:上一次func执行的返回值，作为实参传递给下一个函数执行
			return Array.isArray(N) ? func(...N) : func(N);
		}, args);
	};
}
let res = compose(fn1, fn3, fn2, fn4)(20, 30);
console.log(res);

// react中的redux源码中的compose函数用的是另外思想实现的