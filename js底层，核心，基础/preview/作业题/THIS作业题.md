## THIS

### 什么是this

this就是执行主体（谁把它执行的），this和执行上下文不是一个东西

### 如何区分执行主体this

执行主体this**和函数在哪执行和在哪创建没有必然关系**

- #### 函数执行，看函数前是否有“点”，有“点”的话，“点”前面是谁THIS就是谁，没有“点”THIS就是window（非严格模式）／undefined（严格模式）

  + 自执行函数IIFE中的this一般都是window/undefined

  + 回调函数中的this一般也是window/undefined(除非某个函数内部给回调函数做了特殊处理,这样回调函数中的this有自己的特殊情况)

- #### 给当前元素的某个事件行为绑定方法,当事件行为触发时,方法中的this是当前操作的元素(特殊:IE6~8中基于DOM2级事件事件绑定attachEvent,方法中的this不是元素)

- #### 箭头函数中(私有块级上下文)没有自己的this 所用到的this都是其上级上下文中的this(也就是说没有初始化this这一步)

- #### 构造函数中的this一般是当前类的实例

- #### 基于call/apply/bind可以强制改变this

### 例子

```javascript
let obj = {
    fn:(function(){// 该IIFE只执行一次
        // this => window
        return function () { // 把IIFE函数执行返回的值赋给fn
            console.log(this)
        }
    })()
}
obj.fn();// this => obj
let fn = obj.fn;
fn();// this => window
```

```javascript
var fullName = 'language';
var obj = {
    fullName: 'javascript',
    prop: {
        getFullName: function () {
            return this.fullName;
        }
    }
}
console.log(obj.prop.getFullName());// undefined
// this => obj.prop
var test = obj.prop.getFullName;
console.log(test()); // this => window => language
```

```javascript
var name = 'window';
var Doctorwu= {
    name: 'Doctorwu',
    show: function () {
        console.log(this.name); // window.name => window
    },
    wait: function () {
        var fun = this.show;
        fun(); // this => window
    }
}
Doctorwu.wait();
```

```javascript
window.val = 1;
var json = {
    val: 10,
    dbl: function(){
        this.val *= 2;
    }
}
json.dbl(); // json.val => 20
var dbl = json.dbl;
dbl();// this => window window.val => 2
json.dbl.call(window);// this => window => window.val = 4
console.log(window.val + json.val)// 4 + 20 => 24
```

```javascript
(function(){
    var val = 1;
    var json = {
        val: 10,
        dbl: function(){
            val *= 2; // 不是this.val!!!!
        }
    };
    json.dbl(); // this => val
    console.log(json.val + val); // 12
})()
```

```javascript
var num = 10; // 60 65
var obj = {
    num: 20// 30
};
obj.fn = (function(num){
    // this => window
    this.num = num * 3;
    num++; // 21 22 23
    return function (n){
        this.num += n;
        num ++;
        console.log(num);// 22 23
    }
})(obj.num); // 20
var fn = obj.fn;
fn(5); // 
obj.fn(10); // 
console.log(num, obj.num)// 65, 30
```











