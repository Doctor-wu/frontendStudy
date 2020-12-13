"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function proxify(obj) {
    var result = {};
    var _loop_1 = function (key) {
        if (obj.hasOwnProperty(key)) {
            Object.defineProperty(result, key, {
                get: function () {
                    return obj[key];
                },
                set: function (value) {
                    obj[key] = value;
                },
                enumerable: true
            });
        }
    };
    for (var key in obj) {
        _loop_1(key);
    }
    return result;
}
var props = {
    name: "doctorwu",
    age: 20
};
var proxyProps = proxify(props);
console.log(proxyProps.name);
proxyProps.name = "dtwu66";
console.log(proxyProps.name);
function unProxify(p) {
    var result = {};
    for (var key in p) {
        result[key] = p[key];
    }
    return result;
}
var originProps = unProxify(proxyProps);
console.log(originProps);
