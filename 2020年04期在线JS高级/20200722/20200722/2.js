/* function C1(name) {
	if (name) {
		this.name = name;
	}
}

function C2(name) {
	this.name = name;
}

function C3(name) {
	this.name = name || 'join';
}

C1.prototype.name = 'Tom';
C2.prototype.name = 'Tom';
C3.prototype.name = 'Tom';

// alert((new C1().name) + (new C2().name) + (new C3().name));  //=>"Tomundefinedjoin" */


function Fn() {
	let a = 1;
	this.a = a;
}
Fn.prototype.say = function () {
	this.a = 2;
}
Fn.prototype = new Fn;
let f1 = new Fn;​
Fn.prototype.b = function () {
	this.a = 3;
};
console.log(f1.a);
console.log(f1.prototype);
console.log(f1.b);
console.log(f1.hasOwnProperty('b'));
console.log('b' in f1);
console.log(f1.constructor == Fn);