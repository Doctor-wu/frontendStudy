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
var Teacher = /** @class */ (function () {
    function Teacher(name) {
        this.name = name;
        this.students = [];
        this.state = "上课";
    }
    Teacher.prototype.attach = function (student) {
        this.students.push(student);
    };
    Teacher.prototype.notify = function () {
        this.setState("提问");
        this.students.forEach(function (student) { return student.update(); });
    };
    Teacher.prototype.getState = function () {
        return this.state;
    };
    Teacher.prototype.setState = function (val) {
        this.state = val;
    };
    return Teacher;
}());
var Student = /** @class */ (function () {
    function Student(teacher) {
        this.teacher = teacher;
    }
    Student.prototype.update = function () {
    };
    return Student;
}());
var Xueba = /** @class */ (function (_super) {
    __extends(Xueba, _super);
    function Xueba(teacher) {
        return _super.call(this, teacher) || this;
    }
    Xueba.prototype.update = function () {
        console.log(this.teacher.name + "\u8001\u5E08\u6B63\u5728" + this.teacher.getState() + ", \u5B66\u9738\u62AC\u5934\u4E3E\u624B");
    };
    return Xueba;
}(Student));
var Xuezha = /** @class */ (function (_super) {
    __extends(Xuezha, _super);
    function Xuezha(teacher) {
        return _super.call(this, teacher) || this;
    }
    Xuezha.prototype.update = function () {
        console.log(this.teacher.name + "\u8001\u5E08\u6B63\u5728" + this.teacher.getState() + ", \u5B66\u6E23\u4F4E\u5934\u4E0D\u6562\u770B\u8001\u5E08");
    };
    return Xuezha;
}(Student));
var teacher = new Teacher("doctorwu");
var xueba = new Xueba(teacher);
var xuezha = new Xuezha(teacher);
teacher.attach(xueba);
teacher.attach(xuezha);
teacher.notify();
// 观察者模式的特点，观察者与被观察者双方都能感知到对方的存在
