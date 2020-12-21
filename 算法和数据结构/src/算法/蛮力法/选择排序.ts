export interface ISort<T> {
    sort(): Array<T>;
}

export class SelectionSort<T> implements ISort<T> {
    constructor(public data: Array<T>) {
    }

    sort(): Array<T> {
        let min: number | null = 0;
        for (let i = 0; i < this.data.length - 1; i++) {
            min = i;
            for (let j = i + 1; j < this.data.length; j++) {
                if (this.judgeLess(this.data[j], this.data[min])) {
                    min = j;
                }
            }
            this.swap(i, min);
        }
        return this.data;
    }

    judgeLess(m: T, n: T) {
        return m < n;
    }

    swap(src: number, des: number) {
        let temp: T | null;
        temp = this.data[src];
        this.data[src] = this.data[des];
        this.data[des] = temp;
        temp = null;
    }
}
