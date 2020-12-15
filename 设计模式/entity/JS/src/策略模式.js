"use strict";
var Customer = /** @class */ (function () {
    function Customer(kind) {
        this.kind = kind;
    }
    Customer.prototype.buy = function (money) {
        this.kind.buy(money);
    };
    return Customer;
}());
var Normal = /** @class */ (function () {
    function Normal() {
    }
    Normal.prototype.buy = function (money) {
        console.log("cost " + money);
    };
    return Normal;
}());
var Member = /** @class */ (function () {
    function Member() {
    }
    Member.prototype.buy = function (money) {
        console.log("cost " + money * .9);
    };
    return Member;
}());
var Vip = /** @class */ (function () {
    function Vip() {
    }
    Vip.prototype.buy = function (money) {
        console.log("cost " + money * .8);
    };
    return Vip;
}());
var customer = new Customer(new Normal());
customer.buy(100);
customer.kind = new Member();
customer.buy(100);
customer.kind = new Vip();
customer.buy(100);
