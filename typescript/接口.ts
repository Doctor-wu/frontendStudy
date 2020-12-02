export {}

// 接口约束类
interface Speakable {
    speak(): void;
}// 实现的类中实现speak方法即可


// 接口修饰构造函数
class Animal {
    constructor(public name: string) {

    }
}

// 修饰普通函数的接口加上new之后就是用来描述构造函数类型的接口
interface WithNameClass {
    new(name: string): Animal
}

function createAnimal(clazz: WithNameClass, name: string) {
    return new clazz(name);
}

let a = createAnimal(Animal, "Dog");
console.log(a.name)
