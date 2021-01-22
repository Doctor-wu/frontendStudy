"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapQueue = void 0;
var MapQueue = /** @class */ (function () {
    function MapQueue(queue, accuTime) {
        if (queue === void 0) { queue = new Map; }
        if (accuTime === void 0) { accuTime = 0; }
        this.queue = queue;
        this.accuTime = accuTime;
    }
    MapQueue.prototype.addTask = function (task, time) {
        this.accuTime += time;
        this.queue.set(this.accuTime, task);
        return this;
    };
    MapQueue.prototype.start = function () {
        this.queue.forEach(function (task, time) {
            setTimeout(function () {
                task();
            }, time * 1000);
        });
    };
    return MapQueue;
}());
exports.MapQueue = MapQueue;
function log(msg) {
    console.log(msg);
}
new MapQueue().addTask(function () { return log(1); }, 1).addTask(function () { return log(3); }, 2).addTask(function () { return log(4); }, 3).start();
