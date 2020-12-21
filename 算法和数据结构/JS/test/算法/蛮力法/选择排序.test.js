"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ____1 = require("../../../src/\u7B97\u6CD5/\u86EE\u529B\u6CD5/\u9009\u62E9\u6392\u5E8F");
test("selection-sort-0", function () {
    var list = new ____1.SelectionSort([5, 3, 2, 6, 2, 8]);
    expect(list.sort()).toEqual([2, 2, 3, 5, 6, 8]);
});
test("selection-sort-1", function () {
    var randomArray = new Array(50).fill('').map(Math.random);
    var list = new ____1.SelectionSort(randomArray);
    expect(list.sort()).toEqual(__spread(randomArray).sort((function (a, b) { return a - b; })));
    console.log(list);
});
