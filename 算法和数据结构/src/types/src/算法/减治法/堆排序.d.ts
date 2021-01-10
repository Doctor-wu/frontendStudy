export declare class Heap<T> {
    size: number;
    data: Array<T>;
    constructor(data: Array<T>);
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
    rebuildHeap(): T[];
    /**
     * 堆排序
     */
    sort(): T[];
    /**
     * 假设堆其它地方都满足性质
     * 唯独根节点不满足，重构堆性质
     * @param i
     */
    maxHeapify(i: number): T | undefined;
}
export declare function left(i: number): number;
export declare function right(i: number): number;
export declare function swap<T>(arr: Array<T>, src: number, des: number): T[];
