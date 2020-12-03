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



## 接口

- 接口一方面可以在面向对象编程中表示为**行为的抽象**，另外可以用来描述**对象的形状**
- 接口就是把一些类中共有的属性和方法抽象出来，可以用来约束实现此接口的类
- 一个类可以继承另一个类并实现多个接口
- 接口像插件一样是用来增强类的，而抽象类是具体类的抽象概念
- 一个类可以实现多个接口，一个接口也可以被多个类实现，但一个类可以有多个子类，但只能有一个父类
- **同名的接口可以写多个，类型会自动合并**



### 接口描述类

当我们写一个类的时候，会得到两种类型

1. 构造函数类型的函数类型  clazz:typeof Cstr
2. 类的实例类型clazz:Cstr

```typescript
// 接口约束类
interface Speakable{
    speak():void;
}// 实现的类中实现speak方法即可


// 接口修饰构造函数
class Animal{
    constructor(public name:string){
        
    }
}

// 修饰普通函数的接口加上new之后就是用来描述构造函数类型的接口
interface WithNameClass{
    new(name:string):Animal
}

function createAnimal(clazz:WithNameClass, name:string){
    return new clazz(name);
}
let a = createAnimal(Animal, "Dog");
console.log(a.name)

```



## 泛型

```typescript
// 泛型工厂
function factory<T>(Cstr:{new():T}):T{
    return new Cstr();
}


// 泛型接口
interface Calculate<T>{
    <U>(a:T, b:T):U
}
let sum:Calculate<number> = function<U>(a:T,b:T):U{
    return a+b;
}

console.log(sum<number>(1,2))
```



### **泛型可以写多个**

```typescript
function swap<A,B>(tuple:[A,B]):[B,A]{
    return [tuple[1], tuple[0]]
}
```



### 默认泛型

```typescript
interface T2<T = string>{
    // ...
}

type T22 = T2/*<T>此处取了默认泛型string*/;
```



### 泛型约束

```typescript
interface LengthWise {
    length: number
}

function logger<T extends LengthWise>(val: T) {
    console.log(val.length);
}

let obj = {
    length: 10
}
type withLengthObj = typeof obj;

logger<withLengthObj>("doctorwu");// 传入的参数需要满足Lengthwise 
```



### 泛型类型别名

```typescript
type Cart<T> = {list:T[]}|T[];

let c1:Cart<string> = {list:['1']}
let c2:Cart<number> = [1,2,3]
```

**泛型接口 vs 泛型类型别名**

- 接口创建了一个新的名字，它可以在其他任意地方被调用。而类型别名(**type**)并不创建新的名字，例如报错信息就不会使用别名
- 类型别名不能被extends和implements，这时我们应该尽量使用接口替代类型别名
- 当我们需要使用**联合类型或者元组类型**的时候，**类型别名会更合适**
- **能用interface实现的就不要用type**



### compose泛型

```typescript
function sum(A: number, b: number = 5): number {
    return A + b;
}

function concatString(a: string, b: string = ""): string {
    return a + b;
}

type Func<T extends any[], R> = (...a: T) => R;
/* zero functions */
console.log(compose()(1));
console.log(compose(sum)(1));
console.log(compose(sum, sum)(1));
console.log(compose(sum, sum, concatString)(1));
console.log(compose(sum, concatString, sum, sum)(1));
console.log(compose(sum, sum, sum, sum, sum)(1));
console.log(compose(sum, sum, sum, sum, sum, sum)(1));
export default function compose(): <R>(a: R) => R;

/* one functions */
export default function compose<F extends Function>(f1: F): F;

/* two functions */
export default function compose<A, T extends any[], R>(
    f1: (a: A) => R,
    f2: Func<T, A>
): Func<T, R>;

/* three functions */
export default function compose<A, B, T extends any[], R>(
    f1: (a: B) => R,
    f2: (a: A) => B,
    f3: Func<T, A>
): Func<T, R>;

/* four functions */
export default function compose<A, B, C, T extends any[], R>(
    f1: (a: C) => R,
    f2: (a: B) => C,
    f3: (a: A) => B,
    f4: Func<T, A>
): Func<T, R>;


/* rest */
export default function compose<R>(
    f1: (a: any) => R,
    ...funcs: Function[]
): (...args: any[]) => R;

// export default function compose<R>(...funcs: Function[]): (...args: any[]) => R;

export default function compose(...funcs: Function[]) {
    if (funcs.length === 0) {
        return <T>(arg: T): T => arg;
    }
    if (funcs.length === 1) {
        return funcs[0];
    }


    return funcs.reduce((a, b) => (...args: any) => a(b(...args)));
}

```





















