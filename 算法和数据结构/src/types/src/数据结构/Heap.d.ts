export declare class Heap<T> {
    size: number;
    data: Array<T>;
    constructor(data: Array<T>);
    rebuildHeap(): void;
}
export declare class MaxHeap<T> extends Heap<T> {
    constructor(arr: Array<T>);
    /**
     * 重构堆
     * [1,2,3,4,5]
     *      1
     *    2    3
     *   4 5
     */
    rebuildHeap(): void;
    /**
     * 堆排序
     */
    sort(): void;
    /**
     * 假设堆其它地方都满足性质
     * 唯独根节点不满足，重构堆性质
     * @param i
     */
    maxHeapify(i: number): void;
}
