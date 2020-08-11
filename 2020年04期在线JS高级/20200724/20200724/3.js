// Function.prototype.call/apply/bind 改变函数this指向的

// 模拟内置基于C++完成的CALL方法
// 1.如何让fn中的this变为obj => obj.fn() => 需要保证fn函数作为obj某个成员的属性值
// 2.obj.fn=fn;  obj.fn(); 
// 思路：把函数作为要改变的THIS对象的一个成员，然后基于对象的成员访问执行函数即可
// 3...
Function.prototype.call = function call(context, ...params) {
	// context -> 最后要改变的函数中的this指向  obj
	// params -> 最后要传递给函数的实参信息  [10,20]
	// this -> 要处理的函数  fn
	context = context == null ? window : context;
	// 必须要保证CONTEXT得是一个对象
	let contextType = typeof context;
	if (!/^(object|function)$/i.test(contextType)) {
		// context.constructor：当前值所属的类 
		// context = new context.constructor(context);  //=>不适合Symbol/BigInt
		context = Object(context);
	}

	let result,
		key = Symbol('KEY');
	// 把函数作为对象的某个成员值（成员名唯一：防止修改原始对象的结构值）
	context[key] = this;
	// 基于“对象[成员]()”方式把函数执行，此时函数中的THIS就是对象（把参数传递给函数，并且接收返回值）
	result = context[key](...params);
	// 设置的成员用完后删除掉
	delete context[key];
	// 把函数的返回值作为CALL方法执行的结果返回
	return result;
};


let obj = {
	name: 'OBJ'
};

function fn(x, y) {
	console.log(this, x + y);
	return '@';
}

// 执行FN，让方法中的THIS变为OBJ，并且传递10/20
// fn(10, 20); //=>window 30
// obj.fn(10, 20); //Uncaught TypeError: obj.fn is not a function

let res = fn.call(obj, 10, 20);
console.log(res);
// 1.fn首先基于__proto__找到Function.prototype.call，并且让call方法执行
// 2.在call方法执行的过程中(call方法中的this->fn)，把fn执行，并且让fn中的this变为传递的第一个参数obj，再并且把10/20当做实参传递给fn，最后接收fn执行的返回值，把返回值作为call方法的返回值返回