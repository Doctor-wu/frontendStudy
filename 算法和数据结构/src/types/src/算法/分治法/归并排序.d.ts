import { ISort } from "../蛮力法/选择排序";
export declare class MergeSort<T> implements ISort<T> {
    record: Array<T>;
    private list;
    constructor(record: Array<T>);
    merge(record: Array<T>, list: Array<T>, divide: number): T[];
    sort(): Array<T>;
}
