"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickSort = void 0;
var QuickSort = /** @class */ (function () {
    function QuickSort(record, start, end) {
        this.record = record;
        this.start = start;
        this.end = end;
    }
    QuickSort.prototype.partition = function (start, end) {
        var direction = true;
        while (start !== end) {
            if ((direction && this.record[start] > this.record[end])) {
                this.swap(this.record, start, end);
                start++;
                direction = !direction;
            }
            else if (!direction && this.record[start] > this.record[end]) {
                this.swap(this.record, start, end);
                end--;
                direction = !direction;
            }
            else
                direction ? end-- : start++;
        }
        return start;
    };
    QuickSort.prototype.swap = function (record, src, des) {
        var temp;
        temp = record[src];
        record[src] = record[des];
        record[des] = temp;
        temp = null;
    };
    QuickSort.prototype.sort = function () {
        if (this.start === this.end)
            return this.record;
        this.pivot = this.partition(this.start, this.end);
        // console.log("pivot: " + this.pivot,
        //     "front: " + [this.start, Math.max(this.start, this.pivot - 1)],
        //     "back: " + [Math.min(this.pivot + 1, this.end), this.end])
        new QuickSort(this.record, this.start, Math.max(this.start, this.pivot - 1)).sort();
        new QuickSort(this.record, Math.min(this.pivot + 1, this.end), this.end).sort();
        return this.record;
    };
    return QuickSort;
}());
exports.QuickSort = QuickSort;
