import { ISort } from "../蛮力法/选择排序";
export declare class InsertSort<T> implements ISort<T> {
    record: Array<T>;
    constructor(record: Array<T>);
    sort(): T[];
    insert(sorted: T[], inserted: T): void;
}
