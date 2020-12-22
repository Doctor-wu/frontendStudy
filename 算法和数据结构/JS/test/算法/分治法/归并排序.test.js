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
var ____1 = require("../../../src/\u7B97\u6CD5/\u5206\u6CBB\u6CD5/\u5F52\u5E76\u6392\u5E8F");
test("merge", function () {
    var ms = new ____1.MergeSort([]), merge = ms.merge.bind(ms);
    expect(merge([3, 14, 22, 9, 11, 82], 3)).toEqual([3, 9, 11, 14, 22, 82]);
});
test("merge-sort", function () {
    var mergeSort = new ____1.MergeSort([23, 123, 43, 20, 1, 4, 23, 3, 42, 123, 53, 57, 45, 234, 41, 31, 12, 8]);
    expect(mergeSort.sort()).toEqual(__spread(mergeSort.record).sort(function (a, b) { return a - b; }));
});
