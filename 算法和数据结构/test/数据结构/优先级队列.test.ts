import {PriorityQueue} from "../../src/数据结构/优先级队列";


test('init',()=>{
    let priorityQueue = new PriorityQueue([1,2,3,4,5]);
    expect(priorityQueue.data).toEqual([5,4,3,1,2]);
})

test('push',()=>{
    let priorityQueue = new PriorityQueue([1,2,3,4,5]);
    expect(priorityQueue.data).toEqual([5,4,3,1,2]);
    priorityQueue.push(3.2);
    expect(priorityQueue.data).toEqual([5,3.2,4,3,1,2])
})

test('sort',()=>{
    let priorityQueue = new PriorityQueue([1,2,3,4,5]);
    expect(priorityQueue.data).toEqual([5,4,3,1,2]);
    priorityQueue.push(3.2);
    expect(priorityQueue.data).toEqual([5,3.2,4,3,1,2]);
    priorityQueue.sort();
    expect(priorityQueue.data).toEqual([1,2,3,3.2,4,5]);
})

