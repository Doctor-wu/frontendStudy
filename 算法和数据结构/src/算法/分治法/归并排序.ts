import {ISort} from "../蛮力法/选择排序";

export class MergeSort<T> implements ISort<T> {
    private list: Array<T> = [];

    constructor(public record: Array<T>) {
        this.list.length = this.record.length;
    }

    merge(record: Array<T>, list: Array<T>, divide: number) {
        let i = 0, j = divide, index = 0;
        while (i < divide && j < record.length) {
            if (record[i] > record[j]) {
                list[index] = record[j];
                j++;
                index++;
            } else {
                list[index] = record[i];
                i++;
                index++;
            }
        }

        // 前半段收尾
        while (i < divide) {
            list[index++] = record[i++];
        }
        // 后半段收尾
        while (j < record.length) {
            list[index++] = record[j++];
        }

        return list;
    }

    sort(): Array<T> {
        if (this.record.length === 1) return this.record;
        let divide = Math.ceil(this.record.length / 2);
        this.record.splice(0, divide, ...new MergeSort(this.record.slice(0, divide)).sort());
        this.record.splice(divide, this.record.length - divide, ...new MergeSort(this.record.slice(divide)).sort());
        new MergeSort(this.record.slice(divide)).sort();
        this.merge(this.record, this.list, divide);
        return this.list;
    }

}
