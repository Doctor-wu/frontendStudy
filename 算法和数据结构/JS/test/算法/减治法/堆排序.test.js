"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * MaxHeap.test.ts
 */
var ___1 = require("../../../src/\u7B97\u6CD5/\u51CF\u6CBB\u6CD5/\u5806\u6392\u5E8F");
test("Heaps", function () {
    expect(new ___1.Heap([1, 2, 3]).size).toEqual(new ___1.Heap([1, 2, 3]).size);
    expect(new ___1.MaxHeap([1, 2, 3]).size).toEqual(new ___1.MaxHeap([1, 2, 3]).size);
});
test("left", function () {
    expect(___1.left(3)).toEqual(7);
});
test("right", function () {
    expect(___1.right(3)).toEqual(8);
});
test("swap", function () {
    expect(___1.swap([1, 2, 3, 4, 5], 2, 4)).toEqual([1, 2, 5, 4, 3]);
});
test('heap-init', function () {
    expect(function () {
        var heap = new ___1.MaxHeap([1, 2, 3, 4, 5]);
        var rebuildHeap = heap.rebuildHeap.bind(heap);
        expect(rebuildHeap()).toEqual([5, 4, 3, 1, 2]);
        expect(heap.data).toEqual([5, 4, 3, 1, 2]);
    });
});
test('sort', function () {
    expect(function () {
        var heap = new ___1.MaxHeap([1, 2, 3, 4, 5]);
        // expect(heap.data).toEqual([5,4,3,1,2]);
        expect(heap.sort()).toEqual([1, 2, 3, 4, 5]);
    });
});
