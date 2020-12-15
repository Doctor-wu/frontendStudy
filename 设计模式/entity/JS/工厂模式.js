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
var Fruit = /** @class */ (function () {
    function Fruit(name) {
        this.name = name;
    }
    Fruit.prototype.log = function () {
        console.log(this);
    };
    return Fruit;
}());
var Apple = /** @class */ (function (_super) {
    __extends(Apple, _super);
    function Apple(flavour) {
        var _this = _super.call(this, "苹果") || this;
        _this.flavour = flavour;
        return _this;
    }
    return Apple;
}(Fruit));
var Orange = /** @class */ (function (_super) {
    __extends(Orange, _super);
    function Orange(flavour) {
        var _this = _super.call(this, "橘子") || this;
        _this.flavour = flavour;
        return _this;
    }
    return Orange;
}(Fruit));
// **直接new的缺点**
// 1. 耦合
// 2. 依赖具体实现
// new Apple("甜").log();
// new Orange("酸").log();
/**
 * 简单工厂模式
 * -简单工厂模式是由一个工厂对象决定创建出哪一种产品类的实例
 * */
var Factory = /** @class */ (function () {
    function Factory() {
    }
    Factory.prototype.create = function (type) {
        switch (type) {
            case "apple":
                return new Apple("甜");
            case "orange":
                return new Orange("酸");
            default:
                throw new Error("没有想要的产品");
        }
    };
    return Factory;
}());
var fac = new Factory();
fac.create("orange").log();
fac.create("apple").log();
/**
 * 工厂方法模式
 *  -多态性工厂方法
 *  - 工厂方法模式Factory Method，又称多态性工厂模式
 *  - 在工厂方法模式中，核心的工厂类不再负责所有的产品的创建，而是将具体创建的工作交给子类去做。
 * */
var FactoryMethod;
(function (FactoryMethod) {
    var Factory = /** @class */ (function () {
        function Factory() {
        }
        Factory.prototype.create = function () {
            throw new Error("工厂类需要实现工厂方法");
        };
        return Factory;
    }());
    var AppleFactory = /** @class */ (function (_super) {
        __extends(AppleFactory, _super);
        function AppleFactory() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AppleFactory.prototype.create = function () {
            return new Apple("甜");
        };
        return AppleFactory;
    }(Factory));
    FactoryMethod.AppleFactory = AppleFactory;
    var OrangeFactory = /** @class */ (function (_super) {
        __extends(OrangeFactory, _super);
        function OrangeFactory() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        OrangeFactory.prototype.create = function () {
            return new Orange("酸");
        };
        return OrangeFactory;
    }(Factory));
    FactoryMethod.OrangeFactory = OrangeFactory;
})(FactoryMethod || (FactoryMethod = {}));
new FactoryMethod.AppleFactory().create().log();
new FactoryMethod.OrangeFactory().create().log();
/**
 * 抽象工厂模式
 * - 抽象工厂模式是指当有多个抽象角色时， 使用的一种工厂模式
 * - 抽象工厂模式可以想客户端提供一个接口，是客户端在不必指定产品的具体的情况下，创建多个产品簇中的产品对象
 * */
var AbstractFactory;
(function (AbstractFactory) {
    var Factory = /** @class */ (function () {
        function Factory() {
        }
        Factory.prototype.createButton = function () {
            throw new Error("工厂类需要实现createButton方法");
        };
        Factory.prototype.createIcon = function () {
            throw new Error("工厂类需要实现createIcon方法");
        };
        return Factory;
    }());
    var Button = /** @class */ (function () {
        function Button() {
        }
        Button.prototype.render = function () {
        };
        return Button;
    }());
    var Icon = /** @class */ (function () {
        function Icon() {
        }
        Icon.prototype.render = function () {
        };
        return Icon;
    }());
    var AppleButton = /** @class */ (function (_super) {
        __extends(AppleButton, _super);
        function AppleButton() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AppleButton.prototype.render = function () {
            console.log("rendering AppleButton");
            return this;
        };
        return AppleButton;
    }(Button));
    var WindowsButton = /** @class */ (function (_super) {
        __extends(WindowsButton, _super);
        function WindowsButton() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WindowsButton.prototype.render = function () {
            console.log("rendering WindowsButton");
            return this;
        };
        return WindowsButton;
    }(Button));
    var AppleIcon = /** @class */ (function (_super) {
        __extends(AppleIcon, _super);
        function AppleIcon() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AppleIcon.prototype.render = function () {
            console.log("rendering AppleIcon");
            return this;
        };
        return AppleIcon;
    }(Icon));
    var WindowsIcon = /** @class */ (function (_super) {
        __extends(WindowsIcon, _super);
        function WindowsIcon() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WindowsIcon.prototype.render = function () {
            console.log("rendering WindowsIcon");
            return this;
        };
        return WindowsIcon;
    }(Icon));
    var AppleFactory = /** @class */ (function (_super) {
        __extends(AppleFactory, _super);
        function AppleFactory() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AppleFactory.prototype.createButton = function () {
            return new AppleButton();
        };
        AppleFactory.prototype.createIcon = function () {
            return new AppleIcon();
        };
        return AppleFactory;
    }(Factory));
    AbstractFactory.AppleFactory = AppleFactory;
    var WindowsFactory = /** @class */ (function (_super) {
        __extends(WindowsFactory, _super);
        function WindowsFactory() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WindowsFactory.prototype.createButton = function () {
            return new WindowsButton();
        };
        WindowsFactory.prototype.createIcon = function () {
            return new WindowsIcon();
        };
        return WindowsFactory;
    }(Factory));
    AbstractFactory.WindowsFactory = WindowsFactory;
})(AbstractFactory || (AbstractFactory = {}));
var Mac = new AbstractFactory.AppleFactory();
var Windows = new AbstractFactory.WindowsFactory();
Mac.createButton().render();
Mac.createIcon().render();
Windows.createButton().render();
Windows.createIcon().render();
