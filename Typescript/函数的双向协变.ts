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

// 如果关闭 "strictFunctionTypes" 选项的话，ts中的函数是双向协变的
