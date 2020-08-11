/*
 * 向内置类原型扩展方法：
 *   1.可以直接让实例调用，而此时方法执行，方法中的THIS是调用的实例(调取比较的方便)
 *   2.需要注意的事情是：我们自己扩展的方法不要覆盖内置的方法（最好设置的方法带个前缀）
 *   3.可以实现链式写法：上一个方法执行返回的结果，可以继续调取本结果所属类原型上的方法
 */
/* 
function initParams(num) {
	num = Number(num);
	return isNaN(num) ? 0 : num;
}
Number.prototype.plus = function plus(num) {
	// this -> 永远是对象数据类型的值（除了null/undefined）
	// 对象+数字：不一定都是字符串拼接
	// =>对象本身是想转换为数字再进行运算的
	// =>对象转换为数字，并不是先toString，他需要先.valueOf获取原始值[[PrimitiveValue]]，如果有原始值（原始值是基本类型的值），直接基于原始值处理，没有原始值的才去toString\
	num = initParams(num);
	return this + num;
};
Number.prototype.minus = function minus(num) {
	num = initParams(num);
	return this - num;
};
let n = 10;
let m = n.plus(10).minus(5);
console.log(m); //=>15（10+10-5） 
*/

/*
 * 创建值有两种方案：
 *   1. 字面量方式
 *   2. 构造函数
 */
// 对于引用数据类型来讲，两种方式都是创建所属类的实例，并且都是对象数据类型的
// let obj1 = {};
// let obj2 = new Object();
// console.log(obj1, obj2);

// 但是基本数据类型，两种方式创建出来的结果是不一样的：
// 字面量方式创造的基本类型的值、构造函数创造出来的是引用数据类型的值
// 但是都是Number类的是一个实例（都可以调取Number.prototype原型上的方法）
// Symbol/BigInt不能被new创建值
// let n1 = 10;
// let n2 = new Number(10);
// n1.toFixed(2);
// console.log(n1, n2);

//==================================
/*
 * 编写queryURLParams方法实现如下的效果（至少两种方案）
 */
/* String.prototype.queryURLParams = function queryURLParams(key) {
	let obj = {};
	let {
		search,
		hash
	} = new URL(this);

	// 处理HASH
	if (hash) {
		obj['_HASH'] = hash.substring(1);
	}

	// 处理PARAMS	
	if (search) {
		search = search.substring(1).split('&');
		search.forEach(item => {
			let [key, value] = item.split('=');
			obj[key] = value;
		});
	}

	return key ? obj[key] : obj;
}; */

/* String.prototype.queryURLParams = function queryURLParams(key) {
	let obj = {};
	this.replace(/([^?=&#]+)=([^?=&#]+)/g, (_, key, value) => obj[key] = value);
	this.replace(/#([^?=&#]+)/g, (_, hash) => obj['_HASH'] = hash);
	return key ? obj[key] : obj;
};

let url = "http://www.zhufengpeixun.cn/?lx=1&from=wx#video";
console.log(url.queryURLParams("from")); //=>"wx"
console.log(url.queryURLParams("_HASH")); //=>"video"
console.log(url.queryURLParams()); */

//===========================
/* class Modal {
	// 构造函数
	constructor(x, y) {
		// 给实例设置的私有属性
		this.x = x;
		this.y = y;
	}
	// ES7+给实例设置私有属性
	z = 100;

	// 给其原型设置方法（不能设置属性）
	getX() {
		console.log(this.x);
	}
	getY() {
		console.log(this.y);
	}

	// 把Model当做普通对象设置的键值对（静态属性方法）
	// ES7+
	static n = 200;
	static setNumber() {
		this.n = n;
	}
}
Modal.prototype.z = 10;

let m = new Modal(10, 20); */