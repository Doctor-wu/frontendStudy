# Typescript



## 复杂类型



### 类型推导

```typescript
let uname;
uname = 1;
uname = "doctorwu";
uname = null; // OK

let uname2 = "string";
uname2 = 123; // Error 上方表达式已经推导出uname2的类型是 string 类型


```



### 联合类型

```typescript
let name: string |　number;
name = 3; // OK
name = "doctorwu"; // OK
```



### 类型断言

```typescript
let name4: string | number;
(name4! as string).length;
(name4! as any as string).length; // 双重断言

```



### 字面量类型和类型自变量

```typescript
// 字面量类型
const up:"Up" = "Up";
const down:"Down" = "Down";
const left:"Left" = "Left";
const right:"Right" = "Right";
type Direction = "Up"|"Down"|"Left"|"Right";

// 类型自面量
type Person = {
    name:string;
    age:number;
}

let p1:Person = {
    name: "Doctorwu",
    age:10
}
```



## 函数

```typescript
function hello(name:string):void{
    console.log("hello", name);
}

hello("Doctorwu");
```



### 函数类型

```typescript
type GetName = (firstName:string, lastName:string)=>void;

let getName:GetName = function(firstName:string, lastName:string){
    return firstName + lastName;
}
```



### 函数重载

```typescript
let obj:any = {};

/**
* 如果传的value是一个字符串，传递给obj.name
* 如果传的value是一个数字，传递给obj.age
*/
function attr(value:string):void
function attr(value:number):void
function attr(value:any):void{
    if(typeof value === "string"){
        obj.name = value;
    } else if(typeof value){
        obj.age = value;
    }
}
```



## 类

```typescript
export {}  // 出现了export/import, TS会认为该文件是一个模块，不会与其他文件的命名冲突
class Person {
    name: string = "doctorwu";
    getName(){
        return this.name;
    }
}
```



### 存取器

```typescript
class User {
    myName:string;
    constructor(myName:string){
        this.myName = myName;
    }
    get name(){
        return this.myName;
    }
    set name(val:string){
        this.myName = val;
    }
}
```



### 装饰器

```typescript
// 类装饰器

function addName(constructor:Function){
    constructor.prototype.name = "Doctorwu";
}
function addEat(constructor:Function){
    constructor.prototype.eat = function(){
        console.log("eat");
    }
}

@addName
@addEat
class Person {
    name!:string;
	eat!:Function;
    constructor(){
    }
}


// 类装饰器替换类
function replaceClass (constructor:Function){
    return class {
        // 只能多，不能少
        name:string;// 不能没有
        eat:Function;// 不能没有
        custom:any;
        constructor(){}
    }
}

@replaceClass
class People {
    name:string;
    eat:string;
    constructor(){};
}

```



```typescript
// 属性装饰器
// 装饰属性
// 装饰方法


// 如果装饰的是实例属性的话，target是构造函数原型
function upperCase(target:any, propertyKey:string){
    let value = target[propertyKey];
    const getter = ()=>value;
    const setter = (newVal:string)=>{value = newVal.toUpperCase()}
    
    if(delete target[propertyKey]){
        Object.defineProperty(target, propertyKey,{
            get:getter,
            set:setter,
            enumerable:true,
            configurable:true
        })
    }
}
// 如果装饰的是静态属性的话，target是构造函数本身
function staticPropertyDecorator(target:any, propertyKey:string){
    console.log(target, propertyKey);
}


function noEnumerable(target:any, propertyKey:string, descriptor:PropertyDescriptor){
    console.log(target, propertyKey,descriptor);
    descriptor.enumerable = false;
}

function toNumber(target:any, propertyKey:string, descriptor:PropertyDescriptor){
    let oldMethod = descriptor.value;
    descriptor.value = function (...args:any[]){
        oldMethod.apply(this, args.map(i=>parseFloat(i)))
    }
}





class Person {
    @upperCase
    name:string = "Doctorwu";
    
    @staticPropertyDecorator
    public static age:number = 10;
    @noEnumerable
    getName(){console.log(this.name)}
	sum(...args:any[]){
        return args.reduce((accu:number, item:number)=>accu+item,0)
    }
}
```



```typescript
// 参数装饰器
namespace paramDecorator {
    // target 静态成员就是构造函数 非静态成员就是构造函数原型 methodname 这个参数所属方法的名称 paramIndex 参数的索引
    function addAge(target:any, methodName:string,paramIndex:number){
        console.log(target, methodName, paramIndex);
        target.age = 10;
    }
    
    class Person {
        age:number;
        login(username:string,@addAge password:string){
            console.log(username, password)
        }
    }
    let p = new Person();
    p.login("1", "2");
}
```



### 抽象类

- 抽象描述一种抽象的概念，无法被实例化，只能被继承
- 无法创建抽象类的实例
- 抽象方法不能在抽象类中实现，只能在抽象类的具体子类中实现，而且必须实现

```typescript
abstract class Animal {
    name:string;
    abstract speak():void
}

class Cat extends Animal {
    speak():void {
        console.log("喵喵喵")
    }
}


```













