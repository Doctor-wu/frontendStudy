/**
 * 第一周作业
 * @author Doctorwu
 * @date 2020-08-18
 */
/**

 * @第一题
 * @我的答案 undefined undefined undefined
 *       10, 13, 14
 *       100, 13, 200
 *       12, undefined, 200
 * @是否正确 ✔
 */

console.log(a, b, c); // undefined undefined undefined
var a = 12,
    b = 13,
    c = 14; // =>200

function fn(a) {
    console.log(a, b, c);
    a = 100;
    c = 200;
    console.log(a, b, c);
}
b = fn(10); // 10, 13, 14  b=>undefined
// 100, 13, 200
console.log(a, b, c); // 12, undefined, 200


/**
 * @第二题
 * @我的答案  10 10
 * @是否正确 ✔
 */

var i = 0;

function A() {
    var i = 10;
    // scope-chain: <EC(A), EC(G)>
    function x() {
        console.log(i);
    }
    return x;
}
var y = A(); // y=>[Function]=>print [i]
y(); // 10
function B() {
    var i = 20;
    y();
}
B(); // 10


/**
 * @第三题
 * @我的答案 1 { name: 'jack' }
 * @是否正确 ✔
 */

var a = 1;
var obj = { // 创建堆内存 AAAFFF000
    name: "tom" // name => 'jack'
}

function fn() {
    var a2 = a; // a2 => 1
    obj2 = obj; // obj2 => AAAFFF000
    a2 = a; // a2 => 1
    obj2.name = "jack"; // AAAFFF000[name] = 'jack'
}
fn();
console.log(a); // 1
console.log(obj); // { name: 'jack' }


/**
 * @第四题
 * @我的答案 [Function a]
 * @是否正确 ✔
 */

var a = 1;

function fn(a) {
    console.log(a)
    var a = 2;

    function a() {}
}
fn(a); // [Function a]


/**
 * @第五题
 */

/**
 * @5.1
 * @我的答案 undefined undefined 12
 * @是否正确 ✔
 */

console.log(a); // undefined
var a = 12; // a => 12

function fn() {
    console.log(a);
    var a = 13;
}
fn(); // undefined
console.log(a); // 12

/**
 * @5.2
 * @我的答案 undefined 12 13
 * @是否正确 ✔
 */

console.log(a); // undefined
var a = 12; // a => 12 => 13

function fn() {
    console.log(a); // 12
    a = 13; // VO(G)[a] => 13
}
fn();
console.log(a); // 13

/**
 * @5.3
 * @我的答案 undefined 12 13
 * @是否正确 ❌
 * @正确答案 报错 Uncaught ReferenceError: a is not defined
 * 
 * @误区 认为未定义的a会自动在window上加一个叫a的属性
 */

console.log(a); // undefined    
a = 12; // window.a => 12 => 13

function fn() {
    console.log(a); // 12
    a = 13; // VO(G)[a] => 13
}
fn();
console.log(a); // 13


/**
 * @第六题
 * @我的答案 'hello' 'hello' 'hello'
 * @是否正确 ✔
 */

var foo = 'hello';
(function(foo) {
    console.log(foo); // 'hello'
    var foo = foo || 'world';
    console.log(foo); // 'hello'
})(foo /* 'hello' */ );
console.log(foo); // 'hello'


/**
 * @第七题
 */

/**
 * @7.1
 * @我的答案 undefined
 * @是否正确 ❌
 * @正确答案 [Function foo]
 * 
 * @误区 认为foo函数前没有对foo进行操作，故foo不会映射到全局中
 */

{
    function foo() {}
    foo = 1;
}
console.log(foo); // undefined

/**
 * @7.2
 * @我的答案 1
 * @是否正确 ✔
 */

{
    function foo() {}
    foo = 1;

    function foo() {}
}
console.log(foo); // 1

/**
 * @7.3
 * @我的答案 [Function foo]
 * @是否正确 ❌
 * @正确答案 1
 * 
 * @误区 是遇到"function foo() {}"这一行会对之前对foo的改变映射一份到全局而不是遇到这行全局的foo也变成函数
 */

{
    function foo() {}
    foo = 1;

    function foo() {}
    foo = 2;
}
console.log(foo); // [Function foo]


/**
 * @第八题
 */

/**
 * 8.1
 * @我的答案 3
 * @是否正确 ❌
 * 
 * @正确答案 2
 * @误区 认为形参那里创建的函数作用域在外面
 */

var x = 1;

function func(x, y = function anonymous1() { x = 2 }) {
    x = 3;
    y();
    console.log(x);
}

func();


/**
 * 8.2
 * @我的答案 3
 * @是否正确 ✔
 */

var x = 1;

function func(x, y = function anonymous1() { x = 2 }) {
    var x = 3;
    y();
    console.log(x);
}

func()

/**
 * 8.3
 * @我的答案 4
 * @是否正确 ✔
 */

var x = 1;

function func(x, y = function anonymous1() { x = 2 }) {
    var x = 3;
    var y = function anonymous1() { x = 4 };
    y();
    console.log(x); // 4
}

func()

/**
 * 数据类型和基础知识作业
 *
 */


/**
 * @第一题
 * @我的答案 NaNTencent[object Object]null9false
 * @是否正确 ❌
 * 
 * @正确答案 NaNTencentnull9false
 * @误区 误以为[]转为字符串是[object Object]，其实Array.prototype中重写了toString
 */

let result = 100 + true + 21.2 + null + undefined + "Tencent" + [] + null + 9 + false;
console.log(result);


/**
 * @第二题
 * @我的答案 no ok
 * @是否正确 ✔
 */

{} + 0 ? console.log('ok') : console.log('no');
0 + {} ? console.log('ok') : console.log('no');


/**
 * @第三题
 * @我的答案 number
 * @是否正确 ✔
 */


let res = Number('12px');
if (res === 12) {
    console.log(200);
} else if (res === NaN) {
    console.log(NaN);
} else if (typeof res === 'number') {
    console.log('number');
} else {
    console.log('Invalid Number');
}


/**
 * @第四题
 * @我的答案 27 NaN 2 3 27
 * @是否正确 ❌
 * 
 * @正确答案 [ 27, NaN, 1, 1, 27 ]
 * @错误分析 无效数字不占位
 */

let arr = [27.2, 0, '0013', '14px', 123];
arr = arr.map(parseInt);
console.log(arr);


/**
 * 闭包作用域作业
 * 
 */

/**
 * @第一题
 * @我的答案 10 11 3
 * @是否正确 ✔
 */

var a = 10,
    b = 11,
    c = 12; // => 3
function test(a) {
    a = 1;
    var b = 2;
    c = 3;
}
test(10);
console.log(a, b, c); // 10 11 3


/**
 * @第二题
 * @我的答案 3 10 undefined
 * @是否正确 ✔
 */

var a = 4;

function b(x, y, a) {
    console.log(a); // 3
    arguments[2] = 10;
    console.log(a); // 10
}
a = b(1, 2, 3);
console.log(a); // undefined


/**
 * @第三题
 * @我的答案 5 5 6 2
 * @是否正确 ✔
 */

var a = 9; // => 0 => 1 => 0 => 1 => 2

function fn() {
    a = 0;
    return function(b) {
        return b + a++;
    }
}
var f = fn();
console.log(f(5)); // 5
console.log(fn()(5)); // 5
console.log(f(5)); // 6
console.log(a); // 2


/**
 * @第四题
 * @我的答案 4
 * @是否正确 ✔
 */

var test = (function(i) {
    // i = 2
    return function() {
        console.log(i *= 2);
    }
})(2);
test(5); // 4


/**
 * @第五题
 * @我的答案 9 10 10 1
 * @是否正确 ✔
 */

var x = 4; // => 3 => 2 => 1

function func() {
    // arguments[0] = 5
    return function(y) {
        console.log(y + (--x));
    }
}
var f = func(5);
f(6); // 9
func(7)(8); // 10
f(9); // 10
console.log(x); // 1


/**
 * @第六题
 * @我的答案 11 6 13 10 6
 * @是否正确 ✔
 */

var x = 5, // => 11 => 10
    y = 6;

function func() { // => [Function(y)] => y + (--x)
    x += y;
    func = function(y) {
        console.log(y + (--x));
    };
    console.log(x, y);
}
func(4); // 11 6
func(3); // 13
console.log(x, y); // 10 6


/**
 * @第七题
 * @我的答案 undefined 0 1 2
 * @是否正确 ❌
 * 
 * @正确答案 undefined 0 1 1
 */

function fun(n, o) { // 0,undefined // 1,0 // 2,1 // 3,1 //
    console.log(o);
    return {
        fun: function(m) {
            return fun(m, n); // n=> 0
        }
    };
}
var c = fun(0).fun(1); // undefined, c = {fun:[Function(m)] => fun(m, n) } 0
c.fun(2); // {}
c.fun(3);


/**
 * @第八题
 * @简述你对闭包的理解以及其优缺点
 * 
 * 闭包是JavaScript的一种运行时机制，主要体现在保护机制和保存机制
 * 函数执行的时候会形成一个全新的执行上下文，闭包会将函数环境与外界隔离从而避免干扰（保护机制）
 * 如果该上下文中的内容被当前上下文以外的东西所引用，那么函数执行完毕的时候该上下文不会被释放，上下文中的变量也得以保存（保存机制）
 */


/**
 * @第九题
 * @简述let和var的区别
 * 
 * 在脚本执行前var声明的变量会变量提升，但是let声明的不会
 * 在除了对象及函数的{}中使用let会形成一个块级作用域
 * 在let声明之前使用let声明的变量会报错（形成了暂时性死区，这一点也让typeof变为非绝对安全的方法）
 */


/**
 * @第十题
 * 下面代码输出的结果是多少，为什么？如何改造一下，就能让其输出 20 10？
 * @输出 [Function b] 10
 * @如何输出 20 10
 * 将b函数改为匿名函数
 */

var b = 10;
(function b() {
    b = 20;
    console.log(b);
})();
console.log(b);


/**
 * @第十一题 百度二面
 * @实现函数fn让其具有如下功能
 * let res = fn(1,2)(3);
 * console.log(res); //=>6  1+2+3
 */

let res = fn(1, 2)(3);

function fn(a, b) {
    return function(c) {
        return a + b + c
    }
}
console.log(res);


/**
 * @第十二题
 * 在函数式编程当中有一个很重要的概念就是函数组合， 实际上就是把处理数据的函数像管道一样连接起来， 然后让数据穿过管道得到最终的结果。 例如：
    const add1 = (x) => x + 1;
    const mul3 = (x) => x * 3;
    const div2 = (x) => x / 2;
    div2(mul3(add1(add1(0)))); //=>3
​
    而这样的写法可读性明显太差了，我们可以构建一个compose函数，它接受任意多个函数作为参数（这些函数都只接受一个参数），然后compose返回的也是一个函数，达到以下的效果：
    const operate = compose(div2, mul3, add1, add1)
    operate(0) //=>相当于div2(mul3(add1(add1(0)))) 
    operate(2) //=>相当于div2(mul3(add1(add1(2))))

    简而言之：compose可以把类似于f(g(h(x)))这种写法简化成compose(f, g, h)(x)，请你完成 compose函数的编写
 */

function compose(...args) {
    return function(val) {
        return args.reduce((last, current) => {
            return current(last)
        }, val)
    }
}
const add1 = (x) => x + 1;
const mul3 = (x) => x * 3;
const div2 = (x) => x / 2;

let operate = compose(add1, mul3, div2);
console.log(operate(0))
console.log(operate(2))
console.log(operate(8))


/**
 * this作业题
 */

/**
 * @第一题
 * @我的答案 22 23 35 30
 * @是否正确 ✔
 */

var num = 10; // 60 35
var obj = {
    num: 20 // 30
};
obj.fn = (function(num) {
    this.num = num * 3;
    num++; // 21 22 23
    return function(n) {
        this.num += n;
        num++;
        console.log(num);
    }
})(obj.num);
var fn = obj.fn;
fn(5); // 22
obj.fn(10); // 23
console.log(num, obj.num); // 65 30


/**
 * @第二题
 * @我的答案 {fn: Func...} window(global)
 * @是否正确 ✔
 */

let obj = {
    fn: (function() {
            return function() {
                console.log(this);
            }
        })() // [Function] => console.log(this)
};
obj.fn(); // {fn: Func...}
let fn = obj.fn;
fn(); // window(global)


/**
 * @第三题
 * @我的答案 undefined language
 * @是否正确 ✔
 */

var fullName = 'language';
var obj = {
    fullName: 'javascript',
    prop: {
        getFullName: function() {
            return this.fullName;
        }
    }
};
console.log(obj.prop.getFullName()); // undefined
var test = obj.prop.getFullName;
console.log(test()); // language


/**
 * @第四题
 * @我的答案 window
 * @是否正确 ✔
 */

var name = 'window';
var Tom = {
    name: "Tom",
    show: function() {
        console.log(this.name);
    },
    wait: function() {
        var fun = this.show;
        fun();
    }
};
Tom.wait(); // window


/**
 * @第五题
 * @我的答案 24
 * @是否正确 ✔
 */

window.val = 1; // 2 4
var json = {
    val: 10, // => 20
    dbl: function() {
        this.val *= 2;
    }
}
json.dbl();
var dbl = json.dbl;
dbl();
json.dbl.call(window);
console.log(window.val + json.val); // 24

/**
 * @第六题
 * @我的答案 12
 * @是否正确 ✔
 */

(function() {
    var val = 1; // 2
    var json = {
        val: 10,
        dbl: function() {
            val *= 2;
        }
    };
    json.dbl();
    console.log(json.val + val); // 12
})();