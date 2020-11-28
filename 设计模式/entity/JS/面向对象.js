"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Person = /** @class */ (function () {
    function Person(name, age, money) {
        this.money = money;
        this.age = age;
        this.name = name;
    }
    return Person;
}());
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    function Student(name, age, money) {
        return _super.call(this, name, age, money) || this;
    }
    Student.prototype.getName = function () {
        console.log("\u6211\u7684\u540D\u5B57\u662F" + this.name);
        return this;
    };
    Student.prototype.getMoney = function () {
        // money属性是私有的，子类访问不到
        // console.log(`我的私房钱是${this.money}`);
        return this;
    };
    Student.prototype.getAge = function () {
        console.log("\u6211\u4ECA\u5E74" + this.age + "\u5C81\u4E86");
        return this;
    };
    return Student;
}(Person));
var doctorwu = new Student("doctorwu", 20, 15000);
doctorwu.getName().getAge();
