/*
 * 栈结构
 *   特点：后进先出、先进后出   LIFO(last in first out)
 */

class Stack {
	container = [];

	enter(value) {
		this.container.unshift(value);
	}

	leave() {
		return this.container.shift();
	}

	size() {
		return this.container.length;
	}

	value() {
		// 克隆一份的目的是为了防止，外部的操作修改内部的CONTAINER
		return this.container.slice(0);
	}
}

// 面试题：十进制转二进制

// 1.基于Number.prototype.toString([radix])
// let num = 187956;
// console.log(num.toString(2)); //=>"101101111000110100"

Number.prototype.decimal2binary = function decimal2binary() {
	// this -> num
	let decimal = this,
		sk = new Stack;
	if (decimal === 0) return '0';
	while (decimal > 0) {
		// n商数 m余数
		let n = Math.floor(decimal / 2),
			m = decimal % 2;
		sk.enter(m);
		decimal = n;
	}
	return sk.value().join('');
};

let num = 187956;
console.log(num.decimal2binary()); //=>"101101111000110100"