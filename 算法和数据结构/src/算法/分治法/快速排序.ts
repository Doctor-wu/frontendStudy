import {ISort} from "../蛮力法/选择排序";

export class QuickSort<T> implements ISort<T> {
    public pivot!: number;

    constructor(public record: Array<T>, public start: number, public end: number) {
    }

    partition(start: number, end: number): number {
        let direction = true;
        while (start !== end) {
            if ((direction && this.record[start] > this.record[end])) {
                this.swap(this.record, start, end);
                start++;
                direction = !direction;
            } else if (!direction && this.record[start] > this.record[end]) {
                this.swap(this.record, start, end);
                end--;
                direction = !direction;
            } else
                direction ? end-- : start++;
        }

        return start;
    }

    swap(record: Array<T>, src: number, des: number) {
        let temp: T | null;
        temp = record[src];
        record[src] = record[des];
        record[des] = temp;
        temp = null;
    }

    sort(): Array<T> {
        if (this.start === this.end) return this.record;
        this.pivot = this.partition(this.start, this.end);
        // console.log("pivot: " + this.pivot,
        //     "front: " + [this.start, Math.max(this.start, this.pivot - 1)],
        //     "back: " + [Math.min(this.pivot + 1, this.end), this.end])
        new QuickSort(this.record, this.start, Math.max(this.start, this.pivot - 1)).sort();
        new QuickSort(this.record, Math.min(this.pivot + 1, this.end), this.end).sort();
        return this.record;
    }

}
