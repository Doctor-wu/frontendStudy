/* Function.prototype.call = function call(context, ...params) {
	context = context == null ? window : context;
	let contextType = typeof context;
	if (!/^(object|function)$/i.test(contextType)) {
		context = Object(context);
	}
	let result,
		key = Symbol('KEY');
	context[key] = this;
	result = context[key](...params);
	delete context[key];
	return result;
}; */

// var name = '珠峰培训';
// function A(x, y) {
// 	var res = x + y;
// 	console.log(res, this.name);
// }
// function B(x, y) {
// 	var res = x - y;
// 	console.log(res, this.name);
// }
// B.call(A, 40, 30);
// B.call.call.call(A, 20, 10);
// Function.prototype.call(A, 60, 50);
// Function.prototype.call.call.call(A, 80, 70);

// function fn1(){console.log(1);}
// function fn2(){console.log(2);}
// fn1.call(fn2);
// fn1.call.call.call(fn2);
// Function.prototype.call(fn2);
// Function.prototype.call.call.call(fn2);

//=========================
// call/apply：立即执行函数并且修改里面的THIS
// bind：利用柯理化函数的编程思想，预先把 "需要处理的函数/改变的THIS/传递的实参" 等信息存储在闭包中，后期到达条件（事件触发/定时器等），先执行返回的匿名函数，在执行匿名函数的过程中，再去改变THIS等  =>THIS和参数的预处理
Function.prototype.bind = function bind(context, ...params) {
	// this -> 处理的函数  func
	// context -> 要改变的函数中的THIS指向  obj
	// params -> 最后给函数传递的实参  [10,20]
	let _this = this;
	return function anonymous(...args) {
		// args -> 可能传递的事件对象等信息  [MouseEvent]
		// this -> 匿名函数中的THIS是由当初绑定的位置触发决定的（总之不是func要处理的函数）
		_this.call(context, ...params.concat(args));
	};
};

function func(x, y, ev) {
	console.log(this, x, y, ev);
}
const obj = {
	name: 'zhufeng'
};

// document.body.onclick = func; //=>this:body  x:MouseEvent  y:undefined
// document.body.onclick = func.call(obj, 10, 20); //这样处理不行，事件绑定，绑定的是一个方法，此处是先把func执行（做了一些处理），把方法执行的返回结果赋值给事件绑定
document.body.onclick = func.bind(obj, 10, 20);
// document.body.onclick = function anonymous(ev) {
// 	func.call(obj, 10, 20, ev);
// };

// setTimeout(function anonymous() {
//...
// }, 1000);