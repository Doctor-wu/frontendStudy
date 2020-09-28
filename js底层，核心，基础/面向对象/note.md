## 构造函数

### 什么是构造函数

函数被new操作符运行时作为自定义类/构造函数，构造函数做了很多普通函数没做的事情



### 构造函数执行

构造函数执行也具备普通函数执行的一面（也会有创建上下文初始化作用域链，初始化this，初始化arguments，形参赋值，变量提升，代码执行）



## new做了什么

### 创建一个空对象

### 初始化this时，让上下文中的this指向创建的实例对象

### 将该对象的\[[prototype]]属性设置为构造函数的原型

### 即使函数中没有return也会将创建的实例对象返回

如果用户有返回，但是返回的是基本类型值，默认返回的还是实例对象，如过用户返回的是引用类型值，则以用户return的为准

**Tips**

- 构造函数函数创建私有上下文后的第一件事不是初始化作用域链而是创建一个*空对象*
- new后面的函数不带小括号，属于不带参的new，只是没传递实参而已
- 带参数new优先级是19，不带是18



## 原型和原型链

- 每一个函数（构造函数[类]）都天生具备一个属性"prototype原型"，属性值是一个对象：存储当前类供实例调用的公共属性和方法
- 在原型对象上，有一个内置的属性"constructor"，存储的是当前函数本身，所以我们把类称为构造函数
- 每一个对象都天生具备一个属性"\__proto__隐式原型/原型链"，属性只想自己所属类的原型对象



### 原型链机制

访问对象的某个成员，首先看是否为私有的，如果是私有的，则找到的就是私有的；如果不是，则基于\__proto__找所属类.prototype上的公共属性方法...如果还是没有，则基于\__proto__继续向上查找，直到找到Object.prototype为止..



### 自定义类的原型和原型链

实例.\__proto__  === 类.prototype



### Object.create([OBJECT])

创建一个空对象x，并且把[OBJECT]（这个值需要是一个对象）作为新对象的原型指向，x.\__proto__ = [OBJECT]

Object.create(null): 创建一个没有原型/原型链的空对象，这个对象不是任何类的实例



### Object.create Polyfill

```javascript
// 这个方法不支持null的处理
Object.create = Object.create || function create (prototype) {
    if(prototype === null || typeof prototype !== 'object') {
        throw new TypeError(`Object prototype may only be an Object: ${prototype}`)
    }

    function Temp (){};
    Temp.prototype = prototype;
    return new Temp;
}
```



### 向内置类原型拓展方法

**细节知识点**：

- 为了防止自己设定的方法覆盖内置的方法，我们设置的方法加方法名
- 方法中的this**一般**就是当前要操作的实例（也就不需要基于形参传递实例进来了）

**优势**：

- 使用起来方便，和内置方法相似，直接让实例调用即可
- 只要保证方法的返回结果还是当前类的实例，那么我们就可以基于链式方法调用当前类中提供的其他方法

**劣势**

- 如果在内置类的原型上加了可枚举的属性，在for in 遍历时会遍历到

```javascript
Array.prototype.myDistinct = function myDistinct() {
    // 实现数组去重
    // ES6中的Set实例（不重复的数组）:Set的实例
    // return [...new Set(this)]
    return Array.from(new Set(this))
}

let arr = [1, 2, 3, 4, 5, 5, 4, 3, 2, 1];
console.log(arr.myDistinct());
```



------



## THIS的五种情况深入解析

全局上下文中的THIS=>window,

块级上下文没有自己的THIS，它的this是继承所在上下文中的this

在函数的私有上下文中，this的情况会多种多样（**重点研究**）

### THIS不是执行上下文（EC才是执行上下文）

this是执行主体

### 如何区分执行主体

执行主体this**和函数在哪执行和在哪创建没有必然关系**

- #### 函数执行，看函数前是否有“点”，有“点”的话，“点”前面是谁THIS就是谁，没有“点”THIS就是window（非严格模式）／undefined（严格模式）

  + 自执行函数IIFE中的this一般都是window/undefined

  + 回调函数中的this一般也是window/undefined(除非某个函数内部给回调函数做了特殊处理,这样回调函数中的this有自己的特殊情况)

- #### 给当前元素的某个事件行为绑定方法,当事件行为触发时,方法中的this是当前操作的元素(特殊:IE6~8中基于DOM2级事件事件绑定attachEvent,方法中的this不是元素)

- #### 箭头函数中(私有块级上下文)没有自己的this 所用到的this都是其上级上下文中的this(也就是说没有初始化this这一步)

- #### 构造函数中的this一般是当前类的实例

- #### 基于call/apply/bind可以强制改变this

## Object和Function的爱恨情仇

Function.prototype 上有三个方法 call/apply/bind,　每一个函数都是Function的实例，都可以调用call/apply/bind

Object(每一个对象都是Object的实例)

Object.prototype.\__proto__ === null

除了typeof Function.prototype === 'function'外，typeof 所有内置类的prototype === 'object'

Function.prototype 是一个匿名空函数empty/anonymous 但是相关操作和其他原型对象没有区别

**Object作为一个类是Function的实例，Function虽然是函数，但也是一个对象，所以它也是Object的一个实例**

**互相为爹！！**



## 类原型的重定向

**问题：**

- 重新定向的原型对象中没有constructor
- 原始的原型对象上，存放的属性方法，不会放到重定向的对象上，导致实例不能再用原始的那些方法了
- 原始的愿你选哪个对象不被占用后，会被释放掉
- 内置类的原型都不允许重定向

```javascript
function Func() {

}
// 向内置的原型上扩展方法
// 1. 一个个的处理（比较麻烦）
Func.prototype.A = function (){};
Func.prototype.B = function (){};
Func.prototype.C = function (){};
Func.prototype.D = function (){};
Func.prototype.E = function (){};
// 2.设置别名
let proto = Func.prototype;
proto.A =  function (){};
proto.B =  function (){};


// 一般想往内置原型上批量设置睡醒方法，都是基于重定向的方式
// 1. 缺失了constructor
// 2. 也缺失了原始类型对象上的属性和方法

// 解决批量处理的问题

// 1.手动设置constructor，但是之前的原型对象上的方法和属性就丢失了
Func.prototype = {
    constructor: Func, // 手动加上constructor
    A: function() {},
    B: function() {}
}

// 2.两个原型对象合并，用新的原型对象替换原始的原型对象（如果有相同方法，新对象方法会覆盖老对象方法）
Func.prototype = Object.assign(Func.prototype, {
    A: function() {},
    B: function() {}
})

// 3.让新的原型对象的__proto__属性是老的原型对象
let newProto = Object.create(Func.prototype);
newProto = Object.assign(newProto, {
    A: function() {},
    B: function() {}
})
Func.prototype = newProto

let f = new Func;
console.log(f)
```



## 函数的三种角色

<img src="..\imgs\函数的三种角色.png" style="zoom:200%;" />

**如果认为Function比Object大，但Function既是一个类，也是一个对象，作为对象，它是Object的实例**

**如果认为Object比Function大，但Object作为一个类，是Function的实例**

```javascript
Object instanceof Function  // true
Function instanceof Object  // true
```



## JavaScript中的继承

JavaScript本身是面向对象开发的编程语言
	=> 类：封装，继承，多态

**封装：**类也是一个函数，把实现一个功能的代码进行封装，以此实现“高内聚低耦合”

**多态：**相同的方法，由于参数或者返回值不同，具备了不同的功能（JS中不具备严格意义上的重载）

**继承：**子类继承父类中的方法和属性

未详细记录....
