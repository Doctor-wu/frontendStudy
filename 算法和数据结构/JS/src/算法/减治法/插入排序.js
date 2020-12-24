"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertSort = void 0;
var InsertSort = /** @class */ (function () {
    function InsertSort(record) {
        this.record = record;
    }
    InsertSort.prototype.sort = function () {
        var sorted = [this.record[0]];
        for (var i = 1; i < this.record.length; i++) {
            this.record[i] && this.insert(sorted, this.record[i]);
        }
        return sorted;
    };
    InsertSort.prototype.insert = function (sorted, inserted) {
        var insertIndex = sorted.length - 1;
        while (sorted[insertIndex] > inserted) {
            insertIndex--;
        }
        if (insertIndex < 0) {
            sorted.unshift(inserted);
            return;
        }
        sorted.splice(insertIndex + 1, 0, inserted);
    };
    return InsertSort;
}());
exports.InsertSort = InsertSort;
