export interface ISort<T> {
    sort(): Array<T>;
}
export declare class SelectionSort<T> implements ISort<T> {
    data: Array<T>;
    constructor(data: Array<T>);
    sort(): Array<T>;
    judgeLess(m: T, n: T): boolean;
    swap(src: number, des: number): void;
}
