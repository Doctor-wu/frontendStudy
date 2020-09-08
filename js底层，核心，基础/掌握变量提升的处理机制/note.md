## 掌握变量提升的处理机制

<br/>

### 变量提升做了什么：

​	在当前上下文中（全局/私有/块级），**JS代码*自上而下*执行之前**，浏览器会提前处理一些事情(可以理解成词法解析的一个环节，词法解析一定发生在代码执行之前)                                                                                          

​	会把**当前上下文**中所有带*VAR*和*FUNCTION*关键字的变量进行提前的声明或者定义

```javascript
// var a = 10;
// 声明 declare: var a;
// 定义 defined: a = 10;
```

​	**带VAR的只会进行提前的声明**

​	**带FUNCTION的会提前的声明, 定义**



### 变量提升的意义：

创建变量代码之前可以使用这个变量

```javascript
// 全局上下文中的变量提升
// func = 函数字符串		函数在这个阶段赋值

func(); // 所以在这里可以执行

function func(){
    var a = 12; // 这里不会提升,代码执行前函数还没有执行
    console.log('OK');
}
```

------



```javascript
func(); // Uncaught TypeError: func is not a function; 没有赋值，还是undefined
var func = function CannotExecuteOutSide(){
    // 把原本作为值的函数表达式匿名函数取个名字，但是不能在外面用,也就是说不会在当前上下文中创建这个名字
    // 当函数执行，在形成的私有上下文当中，会把具名化的名字作为私有上下文的变量，值就是这个函数
    // 匿名函数具名化之后可以递归调用
    // 起个名字符合规范

    CannotExecuteOutSide(); // 可以在这里面使用,避免使用arguments.callee(严格模式不支持)

    // 真实项目中建议用函数表达式创建函数，因为这样变量提升阶段只会声明FUNC，不会赋值
    console.log('OK');
}

CannotExecuteOutSide(); // CannotExecuteOutSide is not defined;

func(); // OK
```

------

## Tips：

### **基于VAR或者FUNCTION在“全局上下文”中生命的变量会映射到GO（全局对象 window）上一份，作为他的属性，而且接下来一个修改，另一个也会跟着修改**

```javascript
var a = 12;
console.log(a); // 12 全局变量

console.log(window.a) //12 映射到GO上的属性a

window.a = 13;
console.log(a); // 13 映射机制是一个修改另一个也会修改
```

```javascript
// 不论条件是否成立，都要进行变量提升（细节点： 条件中带FUNCTION的在新版本浏览器当中只会提前声明，不会提前赋值）
if(!("a" in window)) { // false
    var a = 1; // 会被提升

    // 新版本当中出现在大括号里的func只会提前声明，不会提前赋值
    // 老版本中提前声明和赋值都有
    function func(){
        console.log('inner func')
    };
}

console.log(a); // undefined;声明但未赋值
```

### **声明过的变量是不会重复声明的,但是会覆盖赋值**

```javascript
// 全局上下文的变量提升
//   fn=>1
//     =>2
//   var fn; 已经声明过了
//     =>4
//     =>5
//   全局上下文有一个全局变量fn，值是输出5的函数

fn();// 5
function fn(){ // 变量提升阶段已经处理过了，这里不再处理
    console.log(1);
}
fn();// 5
function fn(){ // 变量提升阶段已经处理过了，这里不再处理
    console.log(2);
}
fn();// 5
var fn = function (){ // var fn不用再处理，但是赋值在变量提升阶段没处理过，此处需处理 全局上下文中的那个函数输出3
    console.log(3);
}
fn();// 3
function fn(){ // 变量提升阶段已经处理过了，这里不再处理
    console.log(4);
}
fn();// 3
function fn(){ // 变量提升阶段已经处理过了，这里不再处理
    console.log(5);
}
fn();// 3
```
