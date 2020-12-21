"use strict";
exports.__esModule = true;
var _____1 = require("../../src/\u6570\u636E\u7ED3\u6784/\u4F18\u5148\u7EA7\u961F\u5217");
test('init', function () {
    var priorityQueue = new _____1.PriorityQueue([1, 2, 3, 4, 5]);
    expect(priorityQueue.data).toEqual([5, 4, 3, 2, 1]);
});
test('push', function () {
    var priorityQueue = new _____1.PriorityQueue([1, 2, 3, 4, 5]);
    expect(priorityQueue.data).toEqual([5, 4, 3, 2, 1]);
    priorityQueue.push(3.2);
    expect(priorityQueue.data).toEqual([5, 3.2, 4, 3, 2, 1]);
});
//# sourceMappingURL=优先级队列.test.js.map