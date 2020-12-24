"use strict";
/**
 * 数塔问题
 *
 * 从数塔的顶层出发，在每一个节点可以选择向左或者向右走，一直走到最底层，要求找出一条路径，使得路径上的数值和最大。
 * */
var RandomNumTower = /** @class */ (function () {
    function RandomNumTower(size) {
        this.size = size;
        this.tower = [];
        this.maxAdd = [];
        this.path = [];
        this.generateRandomNumTower();
        this.print(this.tower);
        this.programming(this.maxAdd, this.path, this.tower);
    }
    RandomNumTower.prototype.generateRandomNumTower = function () {
        for (var i = this.size - 1; i >= 0; i--) {
            this.tower[i] = new Array(i + 1).fill("").map(function () { return ~~(Math.random() * 100); });
        }
    };
    RandomNumTower.prototype.programming = function (maxAdd, path, tower) {
        var size = tower.length;
        maxAdd[size - 1] = []; // 行初始化
        tower[size - 1].forEach(function (v, i) {
            maxAdd[size - 1][i] = v;
        });
        var _loop_1 = function (i) {
            maxAdd[i] = []; // 行初始化
            path[i] = [];
            tower[i].forEach(function (_, index) {
                var max = maxAdd[i + 1][index] > maxAdd[i + 1][index + 1];
                maxAdd[i][index] = tower[i][index] + (max ? maxAdd[i + 1][index] : maxAdd[i + 1][index + 1]);
                path[i][index] = max ? index : index + 1;
            });
        };
        for (var i = size - 2; i >= 0; i--) {
            _loop_1(i);
        }
        this.print(maxAdd);
        this.print(path);
        this.printPath(path);
    };
    RandomNumTower.prototype.print = function (tower) {
        tower.forEach(function (level) {
            console.log("" + level);
        });
    };
    RandomNumTower.prototype.printPath = function (path) {
        path.reduce(function (last, curr) {
            console.log(curr[last]);
            return curr[last];
        }, 0);
    };
    return RandomNumTower;
}());
new RandomNumTower(5);
