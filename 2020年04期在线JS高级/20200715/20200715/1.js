/* function fn() {
	// 在当前上下文遇到一个变量，如果不是私有的，则向上级上下文中查找...一直找到EC(G)为止， 如果EC(G)中也没有：
	// 1. 如果是获取变量的值，则直接报错
	// 2. 如果是设置变量的值，则相当于给window(GO)设置一个属性

	// console.log(a); //Uncaught ReferenceError: a is not defined
	a = 12; // window.a=12
}
fn();
console.log(window.a); //=>12
console.log(a); //=>12 */

// GO全局对象 和 VO(G)全局变量对象 的关系
// 1. 两者之间存在映射关系（创建一个全局变量，也相当于给GO设置一个属性）【刨除基于let/const创建的变量】

/* var a = 12; //创建一个全局变量  也相当于window.a=12
console.log(a);
console.log(window.a); */

/* let a = 12;
console.log(a);
console.log(window.a); //undefined */

/* // 此时这个a只是GO的属性，相当于省略了window.，但是它不能理解为全局变量
a = 12;
console.log(a);
console.log(window.a); */

// 在全局上下文代码执行的时候，遇到一个变量，首先看是否为全局变量（如果是操作全局变量，【var/function声明的会给window也设置一份】），不是全局变量则继续看是否为GO的属性（如果是相当于省略window），如果也不是则按照没有声明这个变量的错误处理
// 再私有上下文中，参照之前总结的
// 直接输出window.a是对象的成员访问，哪怕没有属性a，属性值是undefined，也不会报错

//===============================
// /*
//  * EC(G)
//  *   var a;
//  *   function fn(){...}; 
//  */
// console.log(a); //=>undefined
// var a = 12;

// function fn() {
// 	/*
// 	 * EC(FN)
// 	 *   var a; 
// 	 */
// 	console.log(a); //=>undefined
// 	var a = 13;
// }
// fn();
// console.log(a); //=>12


// /*
//  * EC(G)
//  *   var a;
//  *   function fn(){...}; 
//  */
// console.log(a); //=>undefined
// var a = 12;

// function fn() {
// 	/*
// 	 * EC(FN)
// 	 */
// 	console.log(a); //=>12
// 	a = 13;
// }
// fn();
// console.log(a); //=>13

// /*
//  * EC(G)
//  *   function fn(){...}; 
//  */
// // console.log(a); //=>报错：a is not defined  （一但报错下面代码不执行）
// a = 12;

// function fn() {
// 	console.log(a); //=> window.a  =>12
// 	a = 13;
// }
// fn();
// console.log(a); //=>13


// /* 
//  * EC(G)
//  *   var foo;
//  */
// var foo = 'hello';
// (function (foo) {
// 	/*
// 	 * EC(AN)
// 	 *   作用链：<EC(AN),EC(G)>
// 	 *   形参赋值：foo = 'hello' 
// 	 *   变量提升：var foo;（foo已经存在，不重复声明）
// 	 */
// 	console.log(foo); //=>'hello'
// 	var foo = foo || 'world';
// 	console.log(foo); //=>'hello'
// })(foo); //=>自执行函数执行：创建一个函数，并且立即把这个函数执行  把全局的foo的值'hello'传递给私有上下文中的形参 
// console.log(foo); //=>'hello'


// function func(x) {
// 	/*
// 	 * EC(FUNC)
// 	 *   形参赋值：x=10
// 	 *   变量提升：var x;(不重复声明)
// 	 *            function x() {}; (不重复声明，但是会给x赋值为函数)
// 	 * 
// 	 * x=函数
// 	 */
// 	console.log(x); //=>函数
// 	var x = 20; //x=20
// 	console.log(x); //=>20
// 	function x() {}; //跳过不处理（变量提升阶段搞过了）
// 	console.log(x); //=>20
// }
// func(10);

//======================================
/* {
	console.log(foo); //=>函数
	function foo() {}
	foo = 1;
	console.log(foo); //=>1
}
console.log(foo); //=>函数 */

// /*
//  * EC(G)
//  *    function foo;
//  *    function foo; （两次一样，全局下只有一个foo）
//  */
// {
// 	/*
// 	 * 私有块级上下文
// 	 *     function foo() {1}
// 	 *     function foo() {2}
// 	 * =>结果：foo=function(){2}
// 	 */
// 	console.log(foo); //=>function(){2}
// 	console.log(window.foo); //=>undefined
//  function foo() {1} //此时之前对FOO的操作不会映射，等待最后一次再处理
//  foo = 1;
// 	function foo() {2}  //以前对FOO的操作都会映射给全局一份
// 	console.log(foo); //=>1
// }
// console.log(foo); //=>1

/* {
    function foo() {}
    foo = 1;
    function foo() {}
	foo = 2;
	console.log(foo); //=>2
}
console.log(foo); //=>1 */


/* for (var i = 0; i < 10; i++) {
	function index() {}
	index = i;
	setTimeout(function () {
		console.log(index)
	}, 1000)
} */

// /*
//  * EC(G)
//  *   var a;
//  *   function a;
//  */
// var a = 12;
// if (true) {
// 	/*
// 	 * 块级上下文
// 	 *    function a() {};
// 	 */
// 	console.log(a); //=>函数
// 	a = 13;
// 	console.log(a); //=>13
// 	function a() {} //之前对a的操作映射给全局一份  全局a=13
// 	a = 14;
// 	console.log(a); //=>14
// }
// console.log(a); //=>13

//=====================================
/* 
 * 函数执行会形成一个私有的上下文
 * 
 * 但是如果：
 *    1.有形参赋值默认值
 *    2.函数体中有声明过自己的私有变量(var/let/const)，function只有声明的名字和形参中的名字相同，才会单独产生块级上下文
 * 则会把函数体{}包起来的看做一个私有的块级上下文
 *  
 * 这样此时，函数执行就有两个上下文了
 */

// /*
//  * EC(G)
//  *   var x;
//  *   function func(x,y=...){...};
//  */
// var x = 1;
// function func(x, y = function anonymous1() {x = 2}) {
// 	/*
// 	 * 私有上下文(EC(FUNC))
// 	 *    作用域链:<EC(FUNC),EC(G)>
// 	 *    形参赋值:x=5  y=BBBFFF000 (anonymous1函数 [[scope]]:EC(FUNC))
// 	 *    变量提升:--
// 	 */
// 	x = 3;
// 	y();
// 	/*
// 	 * EC(anonymous1)
// 	 *   作用域链:<EC(anonymous1),EC(FUNC)>
// 	 *   形参赋值:--
// 	 *   变量提升:--
// 	 *   代码执行:
// 	 *      x=2  把EC(FUNC)中的x修改为2
// 	 */
// 	console.log(x); //=>2
// }
// func(5);
// console.log(x); //=>1


// debugger;
// /*
//  * EC(G)
//  *   var x;
//  *   function func(x,y=...){...};
//  */
// var x = 1;
// function func(x, y = function anonymous1() {x = 2}) {
// 	/*
// 	 * 私有上下文(EC(FUNC))
// 	 *    作用域链:<EC(FUNC),EC(G)>
// 	 *    形参赋值:x=5  y=BBBFFF000 (anonymous1函数 [[scope]]:EC(FUNC))
// 	 *    变量提升:var x;
// 	 * 
// 	 * 单独多形成一个私有的块级上下文（是把函数体{}当做块级上下文）
// 	 *    作用域链:<EC(BLOCK),EC(FUNC)>
// 	 *    变量提升:var x;  并且会把私有上下文中形参x赋值的值给他 x=5
// 	 */
// 	var x = 3; //把EC(BLOCK)中的x改为3
// 	y(); //EC(BLOCK)没有私有变量y，所以找EC(FUNC)中的y执行
// 	/*
// 	 * EC(anonymous1)
// 	 *   作用域链:<EC(anonymous1),EC(FUNC)>
// 	 *   形参赋值:--
// 	 *   变量提升:--
// 	 *   代码执行:
// 	 *      x=2  把EC(FUNC)中的x修改为2
// 	 */
// 	console.log(x); //=>输出的是EC(BLOCK)中的x  3
// }
// func(5);
// console.log(x); //=>1

/* debugger;
var x = 1;
function func(x, y = function anonymous1() {x = 2}) {
	var x = 3;
	var y = function anonymous2() {x = 4};
	y();
	console.log(x);
}
func(5);
console.log(x); */

// debugger;
// var x = 1;
// function func(x, y = function anonymous1() {x = 2}) {
// 	x = 4;
// 	function x(){};
// 	y();
// }
// func(5);
// console.log(x);