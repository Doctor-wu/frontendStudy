"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.MaxHeap = exports.Heap = void 0;
var Heap = /** @class */ (function () {
    function Heap(data) {
        this.data = __spreadArrays(data);
        this.size = this.data.length;
        this.rebuildHeap();
    }
    Heap.prototype.rebuildHeap = function () { };
    return Heap;
}());
exports.Heap = Heap;
var MaxHeap = /** @class */ (function (_super) {
    __extends(MaxHeap, _super);
    function MaxHeap(arr) {
        return _super.call(this, arr) || this;
    }
    /**
     * 重构堆
     * [1,2,3,4,5]
     *      1
     *    2    3
     *   4 5
     */
    MaxHeap.prototype.rebuildHeap = function () {
        var L = Math.floor(this.size / 2);
        for (var i = L - 1; i >= 0; i--) {
            this.maxHeapify(i);
        }
    };
    /**
     * 堆排序
     */
    MaxHeap.prototype.sort = function () {
        for (var i = this.size - 1; i > 0; i--) {
            swap(this.data, 0, this.size - 1);
            this.size--;
            this.maxHeapify(0);
        }
    };
    /**
     * 假设堆其它地方都满足性质
     * 唯独根节点不满足，重构堆性质
     * @param i
     */
    MaxHeap.prototype.maxHeapify = function (i) {
        var max = i;
        if (i >= this.size)
            return;
        // 求左右节点中较大的序号
        var l = left(i);
        var r = right(i);
        if (l < this.size && this.data[l] > this.data[max]) {
            max = l;
        }
        if (r < this.size && this.data[r] > this.data[max]) {
            max = r;
        }
        // 如果当前节点最大，已经是最大堆
        if (max === i) {
            return;
        }
        swap(this.data, i, max);
        this.maxHeapify(max);
    };
    return MaxHeap;
}(Heap));
exports.MaxHeap = MaxHeap;
function left(i) {
    return i * 2 + 1;
}
function right(i) {
    return i * 2 + 2;
}
function swap(arr, src, des) {
    var temp;
    temp = arr[src];
    arr[src] = arr[des];
    arr[des] = temp;
}
// let mh = new MaxHeap([4, 1, 3, 2, 16, 9, 10, 14, 8, 7]);
// // mh = new MaxHeap<number>([1,2,3,4,5]);
// console.log(mh.data)
// mh.sort();
// console.log(mh.data)
//# sourceMappingURL=Heap.js.map