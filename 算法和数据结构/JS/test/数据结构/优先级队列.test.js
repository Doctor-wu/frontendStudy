"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _____1 = require("../../src/\u6570\u636E\u7ED3\u6784/\u4F18\u5148\u7EA7\u961F\u5217");
test('init', function () {
    var priorityQueue = new _____1.PriorityQueue([1, 2, 3, 4, 5]);
    expect(priorityQueue.data).toEqual([5, 4, 3, 1, 2]);
});
test('push', function () {
    var priorityQueue = new _____1.PriorityQueue([1, 2, 3, 4, 5]);
    expect(priorityQueue.data).toEqual([5, 4, 3, 1, 2]);
    priorityQueue.push(3.2);
    expect(priorityQueue.data).toEqual([5, 3.2, 4, 3, 1, 2]);
});
test('sort', function () {
    var priorityQueue = new _____1.PriorityQueue([1, 2, 3, 4, 5]);
    expect(priorityQueue.data).toEqual([5, 4, 3, 1, 2]);
    priorityQueue.push(3.2);
    expect(priorityQueue.data).toEqual([5, 3.2, 4, 3, 1, 2]);
    priorityQueue.sort();
    expect(priorityQueue.data).toEqual([1, 2, 3, 3.2, 4, 5]);
});
