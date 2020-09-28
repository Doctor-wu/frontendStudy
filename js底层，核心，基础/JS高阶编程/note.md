## JS高阶编程技巧



### 单例设计模式

**主题思想**：用单独的实例来管理当前事物的相关特征【属性和方法】，类似于实现一个分组的特点；

```javascript
// obj1/obj2 不仅仅叫做一个对象，也被称为命名空间,真实项目不会这么用
let obj1 = {
    name: 'doctorwu',
    age: 20,
    say(){}
};
let obj2 = {
    name: 'dtwu',
    20,
    say: function(){}
};
//------------------------------------------------------------------

// 基于闭包管控的单例模式：高级单例模式，以此实现早期的模块划分
let module1 = (function(){
    // 这里可以放私有变量/方法
    function query(){}; // 私有方法
    function tools(){}; // return出去后可通过module1.tools调用
    return {
        // ....
        tools
    }
})()
```



### 惰性思想

执行过一次的东西如果第二遍执行还是一样的效果，我们就不让他执行第二次了

```javascript
// 处理兼容

function getCSS(ele, attr){ // 非惰性，每次调用都需要判断
    if('getComputedStyle' in window){
        return window.getComputedStyle(ele)[attr];
    }else{
        return ele.currentStyle[attr];
    }
}

var getCSS = (function(){// 惰性思想，这样if-else语句只用执行一次
    if('getComputedStyle' in window){
        return function (ele, attr){
            return window.getComputedStyle(ele)[attr];
        }
    }else{
        return function (ele, attr){
            return ele.currentStyle[attr];
        }
    }
})()
```



### 柯里化函数

利用闭包的保存机制，把一些信息预先存储下来（预处理思想）

```javascript
function fn(...outerArgs){
    return function anonymous(...innerArgs){
        // 把外层和里层的函数合并
        let args  = outerArgs.concat(innerArgs);
        return args.reduce((last, current, currIndex, arr)=>{
            return last + current;
        })
    }
}

let res = fn(1, 2)(3);
console.log(res); // 6
```



### 函数式编程

函数式编程：注重结果，不在乎过程，过程交给别人处理

把如何实现封装成方法，我们以后只用调用相应的API方法就可以得到想要的结果

```javascript
let arr = [10, 20, 30, 40, 50];
let res = arr.reduce((n, item)=>{
    return n + item;
})
```



命令式编程：注重过程，需要自己实现过程

```javascript
let res = 0,
    arr = [10, 20, 30, 40, 50];
for(let i = 0; i < arr.length; i++){
    res += arr[i];
}
console.log(res);
```



### 聚合函数Compose

```javascript
const fn1 = x => x + 10;
const fn2 = x => x - 10;
const fn3 = x => x * 10;
const fn4 = x => x / 10;

// let res = fn4(fn2(fn3(fn1(20)))); // 层级嵌套太乱不可取
function compose(...funcs){
    // FUNCS 存储的是按照顺序执行的函数（是一个数组） => [fn1, fn3, fn2, fn4]
    
    return function anonymous(...args){
        // ARGS 存储第一个函数执行需要传递的实参信息（是一个数组） => 20
   	    if(funcs.length == 0) return args;
        if(funcs.length == 1) return funcs[0](...args);
        // 能走到这一步一定至少有两个函数
        return funcs.reduce((N, func)=>{
            return Array.isArray(N) ? func(...N) : func(N);
        }, args)
    }
}
let res = compose(fn1, fn3, fn2, fn4)(20); // 用聚合函数来组合函数
console.log(res)
```

