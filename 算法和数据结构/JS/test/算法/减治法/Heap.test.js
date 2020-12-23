"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * MaxHeap.test.ts
 */
var Heap_1 = require("../../../src/\u7B97\u6CD5/\u51CF\u6CBB\u6CD5/Heap");
test("Heaps", function () {
    expect(new Heap_1.Heap([1, 2, 3]).size).toEqual(new Heap_1.Heap([1, 2, 3]).size);
    expect(new Heap_1.MaxHeap([1, 2, 3]).size).toEqual(new Heap_1.MaxHeap([1, 2, 3]).size);
});
test("left", function () {
    expect(Heap_1.left(3)).toEqual(7);
});
test("right", function () {
    expect(Heap_1.right(3)).toEqual(8);
});
test("swap", function () {
    expect(Heap_1.swap([1, 2, 3, 4, 5], 2, 4)).toEqual([1, 2, 5, 4, 3]);
});
test('heap-init', function () {
    expect(function () {
        var heap = new Heap_1.MaxHeap([1, 2, 3, 4, 5]);
        var rebuildHeap = heap.rebuildHeap.bind(heap);
        expect(rebuildHeap()).toEqual([5, 4, 3, 1, 2]);
        expect(heap.data).toEqual([5, 4, 3, 1, 2]);
    });
});
test('heap-sort', function () {
    expect(function () {
        var heap = new Heap_1.MaxHeap([1, 2, 3, 4, 5]);
        expect(heap.data).toEqual([5, 4, 3, 1, 2]);
        expect(heap.sort()).toEqual([1, 2, 3, 4, 5]);
    });
});
