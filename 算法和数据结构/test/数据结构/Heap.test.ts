/**
 * HelloWorld.test.ts
 */
import {MaxHeap} from '../../src/数据结构/Heap';

test('init', () => {
    expect(()=>{
        let heap = new MaxHeap([1,2,3,4,5]);
        expect(heap.data).toEqual([5,4,3,1,2]);
    });
});

test('sort', () => {
    expect(()=>{
        let heap = new MaxHeap([1,2,3,4,5]);
        expect(heap.data).toEqual([5,4,3,1,2]);
        heap.sort();
        expect(heap.data).toEqual([1,2,3,4,5]);
    });
});
