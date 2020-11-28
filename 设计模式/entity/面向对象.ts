class Person {
    private money: number;
    protected age: number;
    public name: string;

    constructor(name: string, age: number, money: number) {
        this.money = money;
        this.age = age;
        this.name = name;
    }
}


class Student extends Person {
    constructor(name: string, age: number, money: number) {
        super(name, age, money);
    }

    getName() {
        console.log(`我的名字是${this.name}`);
        return this;
    }

    getMoney() {
        // money属性是私有的，子类访问不到
        // console.log(`我的私房钱是${this.money}`);
        return this;
    }

    getAge() {
        console.log(`我今年${this.age}岁了`);
        return this;
    }
}

let doctorwu = new Student("doctorwu", 20, 15000);

doctorwu.getName().getAge();
