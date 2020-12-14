# Typescript高级



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



## 结构类型系统



### 接口的兼容性

- 如果传入的变量和声明的类型不匹配，TS就会进行兼容性检查
- 原理是Duck-Check，就是说只要目标类型中声明的属性变量在原类型中都存在就是兼容的

### 函数的兼容性 (难点)

```typescript
// 比较参数
type Func = (a:number, b:number)=>void;

let sum:Func;

function f1(a:number, b:number):void{
}

sum = f1; // OK

function f2(a:number):void{}

sum = f2; // OK 参数可以少


function f3(a:number, b:number,c:number):void{}

// sum = f3; // Error 参数不能多



// 比较返回值
type GetPerson = ()=>{name:string,age:number}
let getPerson:GetPerson;

function g1(){
    return {name:"doctorwu", age:20};
}

getPerson = g1; // OK

function g2(){
    return {name:"doctorwu", age:20,gender:0};
}

getPerson = g2; // OK

function g3(){
    return {name:"doctorwu"};
}

getPerson = g3; // Error 返回的属性不能少
```



### 函数的协变和逆变

- A <= B 意味着A是B的子类型

- A -> B 指的是以A为参数类型，以B为返回值类型的函数参数

- x：A 意味着x的类型为A

- 函数的返回值类型是**协变**的，而参数类型是**逆变**的

- 返回值类型可以传子类(只能多不能少)，参数可以传父类(只能少不能多)

- 参数逆变父类 返回值协变子类

  

**如果关闭 "strictFunctionTypes" 选项的话，ts中的函数是双向协变的(算是个bug)**

```typescript
export {}

class Animal {
}

class Dog extends Animal {
    public name!: string;
}

class BlackDog extends Dog {
    public color!: string;
}

type Callback = (dog: Dog) => Dog;

function exec(callback: Callback): void {
}

/**
 * 参数可以传自己和自己逆变成的父类
 * 返回值可以传自己和自己协变成的子类
 * 四种情况
 * 1. 参数传子类，返回值子类 n
 * 2. 参数传子类，返回值父类 n
 * 3. 参数传父类，返回值父类 n
 * 4. 参数传父类，返回值子类 y
 * */

type ChildToChild = (blackDog: BlackDog) => BlackDog;
let childToChild: ChildToChild = (bD: BlackDog) => bD;
// exec(childToChild); Error

type ChildToParent = (blackDog: BlackDog) => Animal;
let childToParent: ChildToParent = (bD: BlackDog) => new Animal();
// exec(childToParent); Error

type ParentToParent = (animal: Animal) => Animal;
let parentToParent: ParentToParent = (animal: Animal) => new Animal();
// exec(parentToParent); Error

type ParentToChild = (animal: Animal) => BlackDog;
let parentToChild: ParentToChild = (animal: Animal) => new BlackDog();
exec(parentToChild);  // OK

```



## 类型保护

- 类型保护就是一些表达式，他们在编译的时候就能通过类型信息确保某个作用域变量的类型

- 类型保护就是能够通过关键字判断出分支中的类型

  

### typeof类型保护

```typescript
function double(input:string|number){
    if(typeof input === "string"){
        console.log(input); // 类型系统可以认知到string
    }else if(typeof input === "number"){
        console.log(input); // 类型系统可以认知到number
    }
}
```



### instanceof类型保护

```typescript
class Animal{
    
}

class Bird extends Animal {
    
}

class Dog extends Animal {
    
}

function getName(animal:Animal){
    if(animal instanceof Bird){
        // 类型系统可以认知到Bird
    }else if(animal instanceof Dog){
        // 类型系统可以认知到Dog
    }
}
```



### null保护

```typescript
function getFirstLetter(s:string|null){
    if(s===null){
        return "";
    }
    s.length; // 类型系统会排除掉null的情况
    
    
    s = s||""; // 这样也可以让类型系统排除null
}
```



### 链判断运算符

```typescript
let a = {b:2};
let result = a?.b; // 如果a不为空则返回a.b否则返回undefined
console.log(result);
```



### 可辩识的联合类型

```typescript
interface WarningButton{
    className: "warning",
    text1: "修改"
}

interface DangerButton{
    className: "danger",
    text1: "删除"
}

type Button = WarningButton | DangerButton;

function getName(button:Button){
    if(button.className==="warning"){
        console.log(button.text1); // OK
    }
    if(button.className==="danger"){
        console.log(button.text1); // OK
    }
}
```



### 自定义的类型保护(难点)

```typescript
interface Bird{
    leg: number;
    birdLeg: number;
}
interface Dog{
    leg: number;
    dogLeg: number;
}

function isBird(x:any):x is Bird{
    return x.leg === 2;
}

function getLeg(x:Bird|Dog):number{
    if(isBird(x)){
        return x.birdLeg;
    }else{
        return x.dogLeg;
    }
}
```



### unknown

unknown 是any的安全类型

- any, 我们可以对any进行任何操作，而不需要类型检查
- unknown，任何类型都可以覆盖unknown类型，但是unknown不能随意调用方法
- 如果想调用unknown上的方法和属性
  - 断言，(unknown as string).length
- 联合类型中，unknown会吸收任何类型
- never是unknown的子类型 



## 类型变换



### 类型推断

- 变量的类型可以由定义推断
- 这是一个从右向左流动类型的示例

```typescript
// 从右到左
let foo = 1; // foo 会被推断为number类型  


// 通过return关键字推断返回值的类型
// 底部流出
function add(a:number, b:number){
    return a+b;
}
let c = add(1, 2); // c会被推断为number



// 从左到右
type Sum = (a:number, b:number)=>number;
let sum:Sum = (a,b)=>{
    // 此处的 a, b 以及返回值会被推断为number
}

// 接口推断
interface DefaultProps{
    name?:string;
    age?:number;
}
let defaultProps:DefaultProps = {
    name:"zhufeng",
    age:10
}
let props = {
    ...defaultProps,
    home: "深圳"
}

type Props = typeof props;// 此处能正确推断
```



### 小心使用返回值

```typescript
function addOne(a:any){
    return a+1;
}

function sum3(a:number, b:number){
    return a + addOne(b); // 此处返回值被推断为any
}
```



### mixin(混入)

```typescript
interface AnyObject{
    [prop:string]:any
}

function mixin<T, U>(one: T, two:U):T&U{
    const result = <(T&U)>{};
    for(let key in one)
        (<T>result)[key] = one[key];
    for(let key in two)
        (<U>result)[key] = two[key];
    
    return result;
}

const x = mixin({name:"doctorwu"},{age:20});
console.log(x.name, x.age);
```



### typeof

```typescript
// 一般先定义类型，再定义变量

type Person3 = {
    name:string
}

let p3:Person3 = {
    name: "doctorwu"
}

let p4 = {
    name: "doctorwu"
}

type P4 = typeof p4; // 变量反推类型
```



### 索引访问操作符

```typescript
interface Person5{
    name:string;
    age:number;
    job: {
        name: string
    }
}

let FrontEndJob:Person5['job']/*索引访问类型*/ = {
    name: "前端"
}
```



### 映射类型

```typescript
interface Person6{
    name:string;
    age:number;
    gender:"male"|"female"
}

// 可以批量把一个接口中的属性全部变成可选的
type PartialPerson = {
    [key in keyof Person6]?:Person6[key]
}

// 内置类型 Partial
type PPerson = Partial<Person6>;// 效果和上方相同
```



### 条件类型

```typescript
interface Fish{
    name1:string;
}
interface Water{
    name2:string;
}
interface Bird{
    name3:string;
}
interface Sky{
    name4:string;
}

type Condition<T> = T extends Fish?Water:Sky;

let con:Condition<Fish> = {
    name2: "水"
}


// 条件类型的分发
let con1:Condition<Fish|Bird> = {
    name2: "",
    // name4: ""
}
// con1的类型为：Water | Sky

type Diff<T,U> = T extends U?never:T;
type R = Diff<'a'|'b'|'c'|'d', 'a'|'b'|'c'>;
// type R = 'd'
```



### 内置条件类型

```typescript
// Exclude
// type Exclude<T, U> = T extends U?never:T;
type R4 = Exclude<'a'|'b'|'c'|'d', 'a'|'b'|'c'>
// type R4 = 'd'


// Extract
// type Extract<T, U> = T extends U?T:never;
type R5 = Extract<'a'|'b'|'c'|'d', 'a'|'b'|'c'>
// type R5 = 'a'|'b'|'c'


// NonNullable
// type Extract<T> = T extends null | undefined? never : T;
type R6 = NonNullable<'a'| null | undefined>;
// type R6 = 'a'


// ReturnType
// type ReturnType<T> = T extends (...args: any[]) => infer R ? R : T;

function getUser(a:string, b:number){
    return {
        name: 'doctorwu',
        age: 20
    };
}

type getUserType = typeof getUser;
type ReturnUser = ReturnType<getUserType>;
let u: ReturnUser = { // 类型可用
    name: 'dtwu',
    age: 21
}


// Parameters
// type Parameters<T> = T extends (...args:infer P) => any ? P :never;
type ParamsType = Parameters<getUserType>; // [string, number]


//ConstructorParameters

class Person {
    name:string;
    constructor(name:string){
        this.name = name;
    }
    getName(){
        return this.name;
    }
}

// type ConstructorParameters<T extends new(...args:any)=>any> = T extends new (...args: infer P) => any ? P : never;
type Params = ConstructorParameters<typeof Person>;

// InstanceType
// type InstanceType<T extends new(...args:any)=>any> = T extends new (...args:any) => infer R ? R : any;
type PersonInstance = InstanceType<typeof Person>;

```



### Infer应用案例

```typescript
type ElementOf<T> = T extends Array<infer E>?E:never; // 把元组转换成联合类型 

type Ttuple = [string, number];
type TupleToUnion = ElementOf<Ttuple>;



type T1 = {name:string};
type T2 = {age:number};
type ToIntersection<T> = T extends {a:(x:infer U)=>void, b:(x:infer U)=>void}?U:never;

type T3 = ToIntersection<{a:(x:T1)=>void, b:(x:T2)=>void}>;

let t3:T3; // 类型 T1&T2

```



### 内置工具类型

```typescript
// 递归把接口的属性变成可选项
export {};

interface Company {
    id: number;
    name: string;
}

interface Person {
    id: number;
    name: string;
    company: Company
}

type DeepPartial<T> = {
    [U in keyof T]?: T[U] extends object ? DeepPartial<T[U]> : T[U];
}

type PartialPerson = DeepPartial<Person>;
let p: PartialPerson = {
    id: 1,
    name: "doctorwu",
    company: {
        // 这个company现在也是Partial的
    }
}


// Required
type Required<T> = {
    [U in keyof T] -?: T[U]
}


// Pick
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

interface Person2 {
    name: string;
    age: number;
    gender: number;
}

let person: Person2 = {
    name: "doctorwu",
    age: 20,
    gender: 1
}

type PickPerson = Pick<Person2, 'name' | 'age'>;
// Pick和Extract的区别，Extract是有条件的类型分发


// Record 将一个类型的所有属性值都映射到另一个类型上并创造一个新的类型
type Record<K extends keyof any, T> = {
    [P in K]: T;
};

function mapObject<K extends string | number, T, U>(obj: Record<K, T>, mapFn: (x: T) => U) {
    let result: Record<K, U> = <Record<K, U>>{};
    for (const key in obj) {
        if(obj.hasOwnProperty(key)){
            result[key] = mapFn(obj[key]);
        }
    }
    return result;
}

let obj = {
    count1: 1,
    count2: 2
}
let map = (x: number): string => x * 2 + '';
let newObj = mapObject<string | number, number, string>(obj, map);

```



## 高级类型



### Proxy

```typescript
export {};

type Proxy<V> = {
    get(): V;
    set(value: V): void;
}

type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>
}

function proxify<T extends object>(obj: T): Proxify<T> {
    let result = <Proxify<T>>{};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            type KeyType = typeof key;
            result[key] = {
                get: (): T[KeyType] => {
                    return obj[key];
                },
                set: (value: T[KeyType]) => {
                    obj[key] = value;
                }
            }
        }
    }
    return result;
}

interface Props {
    name: string,
    age: number
}

let props: Props = {
    name: "doctorwu",
    age: 20
}

let proxyProps = proxify<Props>(props);

console.log(proxyProps.name.get());
proxyProps.name.set("dtwu66");
console.log(proxyProps.name.get());


// unProxify
function unProxify<T>(p: Proxify<T>): T {
    let result = {} as T;
    for (const key in p) {
        result[key] = p[key].get();
    }

    return result;
}

let originProps = unProxify<Props>(proxyProps);
console.log(originProps);

```



### OverWrite

```typescript
// setDifference
export type SetDifference<A,B> = A extends B?never:A;

type A = string|number;
type B = number|boolean;
type AB = SetDifference<A, B>; // string


// Omit
type Omit<T, K extends keyof any> = Pick<T, SetDifference<keyof T, K>>;

type Props = { name: string, age: number, visible: boolean };
type OmitAgeProps = Omit<Props, 'age'>;


// Diff
namespace Diff{
    type Props = { name: string, age: number, visible: boolean };
    type DefaultProps = {age:number};
    
	type Diff<T extends object, U extends object> = Pick<T, SetDifference<keyof T, keyof U>>;
    
    type DiffProps = Diff<Props,DefaultProps>;
}
    

// InterSection
namespace InterSection {
    type Props = { name: string, age: number, visible: boolean };
    type DefaultProps = { age: number };


    export type InterSection<T extends object, U extends object> = Pick<T, Extract<keyof T, keyof U>>
    type DuplicateProps = InterSection<Props, DefaultProps>
    let obj: DuplicateProps = {
        age: 20
    }
}
    
    
// Overwrite
namespace Overwrite {
    type OldProps = { name: string, age: number, visible: boolean };
    type NewProps = { age: string, other: string };

    type Overwrite<T extends object,
        U extends object,
        I = Diff.Diff<T, U> & U> = Pick<I, keyof I>
    type ReplacedProps = Overwrite<OldProps, NewProps>;
    // let obj: ReplacedProps = {}
}
```



### Merge

```typescript
// Merge
export {};
type O1 = {
    id: number;
    name: string;
}
type O2 = {
    id: number;
    age: number;
}


type Compute<A extends any> = A extends Function ? A : { [K in keyof A]: A[K] };
type R1 = Compute<{ x: 'x' & { y: 'y' } }>;


type Merge<O1 extends object, O2 extends object> = Compute<O1 & Omit<O2, keyof O1>>

type R2 = Merge<O1, O2>;
// let obj:R2 = {}
// {id:number, name:string, age:number};
```



## 模块和命名空间



### 模块

在默认情况下，当你开始从一个新的typescript文件中写下代码时，她处于全局命名空间下

使用全局变量空间是危险的，因为他会与文件内的代码命名冲突。推荐使用文件模块



### 文件模块

文件模块也被称为外部模块，如果在你的Typescript文件的根级别位置含有import或者export，那么它会在这个文件中创建一个本地作用域

模块事TS中外部模块的简称，侧重于代码和复用

模块在其自身的作用域里执行，而不是在全局作用域里

一个模块里的变量，函数，类等在外部是不可见的，除非你把他导出

如果想要使用一个模块里导出的变量则需要导入



### 模块规范

- AMD：不要是用他，他仅能在浏览器工作
- Systemjs：它是一个好的实验，已经被ES模块替代
- ES模块：他并没有准备好
- commonjs：这是一个不错的选择



### 命名空间

在代码量较大的情况下，为了避免命名空间冲突，可以将相似的函数，类，接口放置到命名空间内

命名空间可以将代码包裹起来，只对外暴露需要在外部访问的对象，命名空间内通过export向外导出

命名空间是内部模块，主要用于组织代码，避免命名冲突

namespace可以嵌套namespace



## 类型声明

类型声明可以让我们不需要将JS重构为TS，只需要加上声明文件就可以使用系统

类型声明在编译的时候都会被删除，他不会影响真正的代码

关键字declare表示声明的意思，我们可以用它来做出各种声明



### 普通的类型声明

```typescript
declare let name:string;
declare let age:number;
declare function getName():string;
declare class Animal{name:string};
console.log(name, age);
getName();
new Animal();
export default {};
```



### 外部枚举

```typescript
declare enum Seasons{
    Spring,
    Summer,
    Autumn,
    Winter
}

let seasons = [
    Seasons.Spring,
    Seasons.Summer,
    Seasons.Autumn,
    Seasons.Winter,
]
```



### 命名空间

如果一个全局变量有很多子属性，就可以使用namespace

在声明文件里的namespace表示一个全局变量包含很多子属性

```typescript
declare namespace ${
    function ajax(url:string,settings:any):void
    let name:string;
    namespace fn{
        function extend(object:any):void
    }
}
```



### *.d.ts

*.d.ts是类型声明文件

```typescript
在tsconfig.json中配置
{
    "compilerOptions":{
        ...
    },
    "include":[
        "src/**/*",// 放源代码
        "typings/**/*"// 放类型声明文件
    ]
}
```



### 第三方声明文件

可以安装使用第三方的声明文件

@types是一个约定的前缀，所有的第三方声明的类型库都会带有这样的前缀

JavaScript中有很多内置的对象，他们可以在TypeScript中被当作声明好了的类型

内置对象是根据标准在全局作用域上存在的对象。这里的标准是指ECMAScript和其他环境(比如DOM)的标准

这些内置对象的类型声明文件，就包含在TypeScript核心库的类型声明文件当中



### 查找类型声明文件

1. 先找 [库名].d.ts
2. 没有就再找index.d.ts
3. 还没有再找lib/index.d.js
4. 去@types中找类型声明
5. 还找不到就认为没有类型声明了

如果compilerOptions中配置了paths，那么在引入包的时候会自动去paths目录里找类型声明文件，配置paths需要配置baseUrl



### 扩展全局变量类型

```typescript
// 扩展局部变量的类型
declare var String:StringConstructor;
interface StringConstructor{
    new(value?:any):String;
    (value?:any):string;
     readonly prototype:String;
}
interface String{
    toString():string;
}

// 相同名称的多个interface会进行合并
interface String{
    double():string;
}

String.prototype.double = function(){  
    return this+this;
}

let result = "hello".double();// hellohello

```

```typescript
// 模块内部扩展全局变量
declare global{
    interface String{
        double():string;
    };
    interface Window{
        myName: string;
    }
}
```





### 合并声明

同一个名称的两个独立声明会被合并成一个单一声明

合并后的声明拥有原先两个声明的特性





























