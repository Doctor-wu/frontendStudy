"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MergeSort = void 0;
var MergeSort = /** @class */ (function () {
    function MergeSort(record) {
        this.record = record;
    }
    MergeSort.prototype.merge = function (record, divide) {
        var i = 0, j = divide, index = 0, list = [];
        while (i < divide && j < record.length) {
            if (record[i] > record[j]) {
                list[index] = record[j];
                j++;
                index++;
            }
            else {
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
        this.record = list;
        return list;
    };
    MergeSort.prototype.sort = function () {
        var _a, _b;
        if (this.record.length === 1)
            return this.record;
        var divide = Math.ceil(this.record.length / 2);
        (_a = this.record).splice.apply(_a, __spread([0, divide], new MergeSort(this.record.slice(0, divide)).sort()));
        (_b = this.record).splice.apply(_b, __spread([divide, this.record.length - divide], new MergeSort(this.record.slice(divide)).sort()));
        this.merge(this.record, divide);
        return this.record;
    };
    return MergeSort;
}());
exports.MergeSort = MergeSort;
