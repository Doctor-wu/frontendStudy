"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectionSort = void 0;
var SelectionSort = /** @class */ (function () {
    function SelectionSort(data) {
        this.data = data;
    }
    SelectionSort.prototype.sort = function () {
        var min = 0;
        for (var i = 0; i < this.data.length - 1; i++) {
            min = i;
            for (var j = i + 1; j < this.data.length; j++) {
                if (this.judgeLess(this.data[j], this.data[min])) {
                    min = j;
                }
            }
            this.swap(i, min);
        }
        return this.data;
    };
    SelectionSort.prototype.judgeLess = function (m, n) {
        return m < n;
    };
    SelectionSort.prototype.swap = function (src, des) {
        var temp;
        temp = this.data[src];
        this.data[src] = this.data[des];
        this.data[des] = temp;
        temp = null;
    };
    return SelectionSort;
}());
exports.SelectionSort = SelectionSort;
