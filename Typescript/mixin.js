"use strict";
function mixin(one, two) {
    var result = {};
    for (var key in one) {
        if (one.hasOwnProperty(key)) {
            result[key] = one[key];
        }
    }
    for (var key in two) {
        if (two.hasOwnProperty(key)) {
            result[key] = two[key];
        }
    }
    return result;
}
var x = mixin({ name: "doctorwu" }, { age: 20 });
console.log(x.name, x.age);
