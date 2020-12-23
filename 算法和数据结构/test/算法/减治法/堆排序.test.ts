/**
 * MaxHeap.test.ts
 */
import {MaxHeap, Heap, left, right, swap} from '../../../src/算法/减治法/堆排序';

test("Heaps",()=>{
    expect(new Heap([1,2,3]).size).toEqual(new Heap([1,2,3]).size);
    expect(new MaxHeap([1,2,3]).size).toEqual(new MaxHeap([1,2,3]).size);
})


test("left",()=>{
    expect(left(3)).toEqual(7)
})

test("right",()=>{
    expect(right(3)).toEqual(8)
})

test("swap",()=>{
    expect(swap([1,2,3,4,5],2,4)).toEqual([1,2,5,4,3])
})

test('heap-init', () => {
    expect(()=>{
        let heap = new MaxHeap([1,2,3,4,5]);
        let rebuildHeap = heap.rebuildHeap.bind(heap);
        expect(rebuildHeap()).toEqual([5,4,3,1,2]);
        expect(heap.data).toEqual([5,4,3,1,2]);
    });
});

test('sort', () => {
    expect(()=>{
        let heap = new MaxHeap([1,2,3,4,5]);
        // expect(heap.data).toEqual([5,4,3,1,2]);

        expect(heap.sort()).toEqual([1,2,3,4,5]);
    });
});
