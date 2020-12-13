"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var p = {
    id: 1,
    name: "doctorwu",
    company: {
    // 这个company现在也是Partial的
    }
};
var person = {
    name: "doctorwu",
    age: 20,
    gender: 1
};
function mapObject(obj, mapFn) {
    var result = {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[key] = mapFn(obj[key]);
        }
    }
    return result;
}
var obj = {
    count1: 1,
    count2: 2
};
var map = function (x) { return x * 2 + ''; };
var newObj = mapObject(obj, map);
