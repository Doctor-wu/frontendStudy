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
var ____1 = require("../../../src/\u7B97\u6CD5/\u5206\u6CBB\u6CD5/\u5FEB\u901F\u6392\u5E8F");
test("partition-0", function () {
    var qs = new ____1.QuickSort([23, 13, 35, 6, 19, 50, 28], 0, 7), partitionFn = qs.partition.bind(qs);
    expect(partitionFn(0, 6)).toEqual(3);
});
test("partition-1", function () {
    var qs = new ____1.QuickSort([12, 13], 0, 2), partitionFn = qs.partition.bind(qs);
    expect(partitionFn(0, 1)).toEqual(0);
});
test("quick-sort", function () {
    var record = [23, 123, 43, 20, 1, 4, 23, 3, 42, 123, 53, 57, 45, 234, 41, 31, 12, 8];
    expect(new ____1.QuickSort(record, 0, record.length - 1).sort()).toEqual(__spread(record).sort(function (a, b) { return a - b; }));
});
