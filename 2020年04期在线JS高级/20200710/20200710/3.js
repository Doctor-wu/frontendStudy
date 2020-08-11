/*
 * 连等赋值 
 */
/* let a = 12,
	b = 13;
//=> let a=12; let b=13; */

/* // 从右到左
// 1. 创建一个值12
// 2. b=12
// 3. let a=12
let a = b = 12; */

/* // 运算符优先级
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
a.x = a = {};
a = a.x = {};
// 因为成员访问 a.x 的优先级是很大的，所以不论怎么调换位置，都是先处理a.x={} */


/* var a = {n: 1};
var b = a;
a.x = a = {n: 2};
console.log(a.x);
console.log(b); */

/*
// 循环引用
let x = {
	name: 'xxx'
};
x.n = x;
console.log(x); */