/* 
Array.prototype.push = function push(item) {
	// this -> 需要处理的实例
	// this[this.length] = item;
	// this.length++;
	// return this.length;
};
let arr = [10, 20];
arr.push(100); 
*/


/* 
let obj = {
	2: 3, //1
	3: 4, //2
	length: 2, //3 4
	push: Array.prototype.push
}
obj.push(1);
// item->1  this->obj
// obj[obj.length] = 1    obj[2] = 1
// obj.length++
obj.push(2);
// item->2  this->obj
// obj[3] = 2
// obj.length++
console.log(obj); 
*/


/*
 * == 比较的时候，如果两边的数据类型不一致，默认会进行数据类型转换  
 *   解决方案1：对象转换为数字，需要调取valueOf/toString（如果对象私有属性中有toString，则不会再向原型上去查找）
 */
// /* var a = {
// 	i: 0,
// 	toString() {
// 		// this->a
// 		return ++this.i;
// 	}
// }; */
// /* let a = [1, 2, 3];
// a.toString = a.shift; */
// if (a == 1 && a == 2 && a == 3) {
// 	console.log('OK');
// }

// 利用数据劫持 
// Object.defineProperty
// Proxy
// 获取a，如果a不是变量，就是window的一个属性...
/* let i = 0;
Object.defineProperty(window, 'a', {
	get() {
		return ++i;
	}
});
if (a == 1 && a == 2 && a == 3) {
	console.log('OK');
} */

//=====================
let utils = (function () {
	/*
	 * toArray：转换为数组的方法
	 *   @params
	 *      不固定数量，不固定类型
	 *   @return
	 *      [Array] 返回的处理后的新数组
	 * by zhufengpeixun on 2020
	 */
	/* function toArray(...args) {
		return args;
	} */

	function toArray() {
		// return Array.from(arguments);
		// return [...arguments];

		// 把类数组转换为数组
		// var arr = [];
		// for (var i = 0; i < arguments.length; i++) {
		// 	arr.push(arguments[i]);
		// }
		// return arr;

		// 只要两个实例结构类似，那么大部分操作操作的他们的代码都可以公用，无外乎就是THIS指向的问题
		return [].slice.call(arguments);
	}

	return {
		toArray
	};
})();

let ary = utils.toArray(10, 20, 30); //=>[10,20,30]
console.log(ary);
ary = utils.toArray('A', 10, 20, 30); //=>['A',10,20,30]
console.log(ary);


// 数组的浅克隆
// 前提：arguments虽然是类数组，但是结构和数组一样（除了__proto__不是Array.prototype），所以操作数组的代码和操作arguments基本一致的（尤其是循环这种东西）
// 如果我能让ARRAY原型上的slice执行，让方法中的this变为arguments，相当于把arguments转换为一个数组
// [].slice.call(arguments)
// Array.prototype.slice.call(arguments)
// Array.prototype.slice = function slice() {
// 	var arr = [];
// 	for (var i = 0; i < this.length; i++) {
// 		arr.push(this[i]);
// 	}
// 	return arr;
// };
// /* var arr = [];
// for (var i = 0; i < arguments.length; i++) {
// 	arr.push(arguments[i]);
// }
// return arr; */
// var xx = [10, 20, 30];
// var xxx = xx.slice();
// console.log(xxx, xxx == xx);