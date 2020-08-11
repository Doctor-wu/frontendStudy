/* var a = 12;
var b = a;
b = 13;
console.log(a); */

/* var a = {n: 12};
var b = a;
b['n'] = 13;
console.log(a.n); */


/*
 * 对象数据类型：由零到多组键值对（属性名和属性值）组成的
 *    属性名的类型
 *    【说法一：属性名类型只能是字符串或者Symbol】
 *    【说法二：属性名类型可以是任何基本类型值，处理中可以和字符串互通】
 *    但是属性名绝对不能是引用数据类型，如果设置引用类型，最后也是转换为字符串处理的
 */
/* let sy = Symbol('AA');
let x = {
	0: 0
};
let obj = {
	0: 12,
	true: 'xxx',
	null: 20
};
obj[sy] = '珠峰';
obj[x] = 100; //=> obj['[object Object]']=100  会把对象变为字符串作为属性名 */

/* for (let key in obj) {
	// FOR IN遍历中获取的属性名都会变为字符串
	// 并且无法迭代到属性名是SYMBOL类型的属性
	console.log(key, typeof key);
} */

/* let x = 20;
let obj = {
	x: 100
};
// 属性名肯定得是一个值
// obj[x] 把x变量存储的值当做属性名， 获取对象的属性值  => obj[20]  => undefined
// obj['x'] 获取属性名为x的属性值 =>100   <=> obj.x  属性名为x */

//example 1
/* var a = {},
	b = '0',
	c = 0;
a[b] = '珠峰'; // a['0']='珠峰'
a[c] = '培训'; // a[0]='培训'
console.log(a[b]); //=>"培训"
 */


//example 2
/* var a = {},
	b = Symbol('1'),
	c = Symbol('1'); // b!==c
a[b] = '珠峰';
a[c] = '培训';
console.log(a[b]); //=>"珠峰" */

//example 3
/* var a={}, 
	b={n:'1'}, 
	c={m:'2'};  
a[b]='珠峰'; // a['[object Object]']="珠峰";
a[c]='培训'; // a['[object Object]']="培训";
console.log(a[b]); //=>"培训" */

