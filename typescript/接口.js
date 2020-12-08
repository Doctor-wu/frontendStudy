"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 接口修饰构造函数
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    return Animal;
}());
function createAnimal(clazz, name) {
    return new clazz(name);
}
var a = createAnimal(Animal, "Dog");
console.log(a.name);
