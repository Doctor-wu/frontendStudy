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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriorityQueue = void 0;
var Heap_1 = require("./Heap");
var PriorityQueue = /** @class */ (function (_super) {
    __extends(PriorityQueue, _super);
    function PriorityQueue(data) {
        return _super.call(this, data) || this;
    }
    PriorityQueue.prototype.push = function (item) {
        this.data.unshift(item);
        this.size++;
        this.maxHeapify(0);
        return this.size;
    };
    return PriorityQueue;
}(Heap_1.MaxHeap));
exports.PriorityQueue = PriorityQueue;
// let priorityQueue = new PriorityQueue([1,2,3,4,5]);
// // priorityQueue.push(11);
// // priorityQueue.sort();
//
// console.log(priorityQueue.data)
