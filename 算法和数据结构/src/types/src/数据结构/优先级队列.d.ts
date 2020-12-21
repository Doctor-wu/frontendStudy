import { MaxHeap } from "./Heap";
export declare class PriorityQueue<T> extends MaxHeap<T> {
    constructor(data: Array<T>);
    push(item: T): number;
}
