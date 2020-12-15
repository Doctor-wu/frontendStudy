declare namespace oop {
    class Person {
        private money;
        protected age: number;
        name: string;
        constructor(name: string, age: number, money: number);
    }
    export class Student extends Person {
        constructor(name: string, age: number, money: number);
        getName(): this;
        getMoney(): this;
        getAge(): this;
    }
    export {};
}
declare let doctorwu: oop.Student;
