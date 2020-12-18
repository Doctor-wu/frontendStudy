"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * HelloWorld.test.ts
 */
var Heap_1 = require("../../src/\u6570\u636E\u7ED3\u6784/Heap");
test('init', function () {
    expect(function () {
        var heap = new Heap_1.MaxHeap([1, 2, 3, 4, 5]);
        expect(heap.data).toEqual([5, 4, 3, 1, 2]);
    });
});
test('sort', function () {
    expect(function () {
        var heap = new Heap_1.MaxHeap([1, 2, 3, 4, 5]);
        expect(heap.data).toEqual([5, 4, 3, 1, 2]);
        heap.sort();
        expect(heap.data).toEqual([1, 2, 3, 4, 5]);
    });
});
