"use strict";
// type R6 = 'a'
// ReturnType
// type ReturnType<T> = T extends (...args: any[]) => infer R ? R : T;
function getUser(a, b) {
    return {
        name: 'doctorwu',
        age: 20
    };
}
var u = {
    name: 'dtwu',
    age: 21
};
//ConstructorParameters
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    Person.prototype.getName = function () {
        return this.name;
    };
    return Person;
}());
