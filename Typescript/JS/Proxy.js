"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function proxify(obj) {
    var result = {};
    var _loop_1 = function (key) {
        if (obj.hasOwnProperty(key)) {
            result[key] = {
                get: function () {
                    return obj[key];
                },
                set: function (value) {
                    obj[key] = value;
                }
            };
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
console.log(proxyProps.name.get());
proxyProps.name.set("dtwu66");
console.log(proxyProps.name.get());
function unProxify(p) {
    var result = {};
    for (var key in p) {
        result[key] = p[key].get();
    }
    return result;
}
var originProps = unProxify(proxyProps);
console.log(originProps);
