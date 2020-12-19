"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KMP_1 = require("../../src/\u7B97\u6CD5/KMP");
test("get-next", function () {
    expect(KMP_1.KMP.getNext("ababc")).toEqual([-1, 0, 0, 1, 2]);
    expect(KMP_1.KMP.getNext("adaddadd")).toEqual([-1, 0, 0, 1, 2, 0, 1, 2]);
});
test("kmp-compare-0", function () {
    expect(KMP_1.KMP.compare("ababaababcb", "ababc")).toEqual(5);
});
test("kmp-compare-1", function () {
    expect(KMP_1.KMP.compare("cdmamdmmaassdd", "maass")).toEqual(7);
});
