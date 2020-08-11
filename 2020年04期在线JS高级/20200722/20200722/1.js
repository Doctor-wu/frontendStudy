function Func() {

}
Func.prototype.XX = function () {};

// 向内置的原型上扩展方法
// 1.一个个的处理比较麻烦
// 2.设置别名
/* Func.prototype.A = function () {};
Func.prototype.B = function () {};
Func.prototype.C = function () {};
Func.prototype.D = function () {}; */

/* let proto = Func.prototype;
proto.A = function () {};
proto.B = function () {}; */

// 一般想往原型上批量设置属性方法，都是基于重定向的方式
// 1.缺失了constructor
// 2.也缺失了原始原型对象的上的属性和方法
/* Func.prototype = {
	A: function () {},
	B: function () {}
};*/

// 解决批量处理的问题
/* Func.prototype = {
	// 1.可以手动设置constructor
	constructor: Func,
	A: function () {},
	B: function () {}
}; */

// 2.两个原型对象合并，用新的原型对象替换原始的原型对象（问题：如果新老有个属性方法相同，则新的值会替换老的值）
/* Func.prototype = Object.assign(Func.prototype, {
	A: function () {},
	B: function () {}
});*/

// 3.把老的原型对象作为新原型对象的上级原型
let protoNew = Object.create(Func.prototype);
protoNew = Object.assign(protoNew, {
	A: function () {},
	B: function () {}
});
Func.prototype = protoNew;

let f = new Func;
console.log(f);