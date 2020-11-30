"use strict";
var Power = /** @class */ (function () {
    function Power() {
    }
    Power.prototype.charge = function () {
        return "220V";
    };
    return Power;
}());
var Adaptor = /** @class */ (function () {
    function Adaptor() {
        this.power = new Power();
    }
    Adaptor.prototype.charge = function (powerUsage) {
        var v = this.power.charge();
        console.log(v + "=>" + powerUsage);
    };
    return Adaptor;
}());
var Laptop = /** @class */ (function () {
    function Laptop() {
        this.power = new Adaptor();
    }
    Laptop.prototype.use = function () {
        this.power.charge("20V");
    };
    return Laptop;
}());
var surface = new Laptop();
surface.use();
