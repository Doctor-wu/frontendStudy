"use strict";
var Buttery = /** @class */ (function () {
    function Buttery() {
        this.amount = "high";
        this.state = new SuccessState();
    }
    Buttery.prototype.show = function () {
        this.state.show(); // 把显示的逻辑交给了对象
        // 要完成状态转换需要套if-else，可以通过监听state来改变状态
        if (this.amount === "high") {
            this.amount = "middle";
            this.state = new WarnState();
        }
        else if (this.amount === "middle") {
            this.amount = "low";
            this.state = new ErrorState();
        }
        else if (this.amount === "low") {
            this.amount = "worst";
            this.state = new WorstState();
        }
    };
    return Buttery;
}());
var SuccessState = /** @class */ (function () {
    function SuccessState() {
    }
    SuccessState.prototype.show = function () {
        console.log("绿色");
    };
    return SuccessState;
}());
var WarnState = /** @class */ (function () {
    function WarnState() {
    }
    WarnState.prototype.show = function () {
        console.log("黄色");
    };
    return WarnState;
}());
var ErrorState = /** @class */ (function () {
    function ErrorState() {
    }
    ErrorState.prototype.show = function () {
        console.log("红色");
    };
    return ErrorState;
}());
var WorstState = /** @class */ (function () {
    function WorstState() {
    }
    WorstState.prototype.show = function () {
        console.log("深红色");
    };
    return WorstState;
}());
var buttery = new Buttery();
buttery.show();
buttery.show();
buttery.show();
buttery.show();
