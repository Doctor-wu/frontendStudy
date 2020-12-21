"use strict";
exports.__esModule = true;
/**
 * HelloWorld.test.ts
 */
var Heap_1 = require("../../src/\u6570\u636E\u7ED3\u6784/Heap");
test('init', function () {
    expect(function () {
        var heap = new Heap_1.MaxHeap([1, 2, 3, 4, 5]);
        expect(heap.data).toEqual([5, 4, 3, 2, 1]);
    });
});
test('sort', function () {
    expect(function () {
        var heap = new Heap_1.MaxHeap([1, 2, 3, 4, 5]);
        expect(heap.data).toEqual([5, 4, 3, 2, 1]);
        heap.sort();
        expect(heap.data).toEqual([1, 2, 3, 4, 5]);
    });
});
//# sourceMappingURL=Heap.test.js.map