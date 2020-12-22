import { ISort } from "../蛮力法/选择排序";
export declare class QuickSort<T> implements ISort<T> {
    record: Array<T>;
    start: number;
    end: number;
    pivot: number;
    constructor(record: Array<T>, start: number, end: number);
    partition(start: number, end: number): number;
    swap(record: Array<T>, src: number, des: number): void;
    sort(): Array<T>;
}
