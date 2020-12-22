import { ISort } from "../蛮力法/选择排序";
export declare class MergeSort<T> implements ISort<T> {
    record: Array<T>;
    constructor(record: Array<T>);
    merge(record: Array<T>, divide: number): T[];
    sort(): Array<T>;
}
