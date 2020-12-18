import {MaxHeap} from "./Heap";

export class PriorityQueue<T> extends MaxHeap<T>{
    constructor(data:Array<T>) {
        super(data);
    }

    push(item:T):number{
        this.data.unshift(item);
        this.size++;

        this.maxHeapify(0);
        return this.size;
    }
}

// let priorityQueue = new PriorityQueue([1,2,3,4,5]);
// // priorityQueue.push(11);
// // priorityQueue.sort();
//
// console.log(priorityQueue.data)
