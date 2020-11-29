
class Fruit {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    log() {
        console.log(this);
    }
}

class Apple extends Fruit {
    flavour: string;

    constructor(flavour: string) {
        super("苹果");
        this.flavour = flavour;
    }
}

class Orange extends Fruit {
    flavour: string;

    constructor(flavour: string) {
        super("橘子");
        this.flavour = flavour;
    }
}

// **直接new的缺点**
// 1. 耦合
// 2. 依赖具体实现

// new Apple("甜").log();
// new Orange("酸").log();


/**
 * 简单工厂模式
 * -简单工厂模式是由一个工厂对象决定创建出哪一种产品类的实例
 * */
class Factory {
    create(type: string) {
        switch (type) {
            case "apple":
                return new Apple("甜");
            case "orange":
                return new Orange("酸");
            default:
                throw new Error("没有想要的产品");
        }
    }
}

let fac = new Factory();
fac.create("orange").log()
fac.create("apple").log()


/**
 * 工厂方法模式
 *  -多态性工厂方法
 *  - 工厂方法模式Factory Method，又称多态性工厂模式
 *  - 在工厂方法模式中，核心的工厂类不再负责所有的产品的创建，而是将具体创建的工作交给子类去做。
 * */

namespace FactoryMethod {
    class Factory {
        create() {
            throw new Error("工厂类需要实现工厂方法");
        }
    }

    export class AppleFactory extends Factory {
        create() {
            return new Apple("甜");
        }
    }

    export class OrangeFactory extends Factory {
        create() {
            return new Orange("酸");
        }
    }
}

new FactoryMethod.AppleFactory().create().log();
new FactoryMethod.OrangeFactory().create().log();




/**
 * 抽象工厂模式
 * - 抽象工厂模式是指当有多个抽象角色时， 使用的一种工厂模式
 * - 抽象工厂模式可以想客户端提供一个接口，是客户端在不必指定产品的具体的情况下，创建多个产品簇中的产品对象
 * */


namespace AbstractFactory {

    class Factory {
        createButton() {
            throw new Error("工厂类需要实现createButton方法");
        }

        createIcon() {
            throw new Error("工厂类需要实现createIcon方法");
        }
    }

    class Button {
        render() {
        }
    }

    class Icon {
        render() {
        }
    }

    class AppleButton extends Button {
        render() {
            console.log("rendering AppleButton");
            return this;
        }
    }

    class WindowsButton extends Button {
        render() {
            console.log("rendering WindowsButton");
            return this;
        }
    }

    class AppleIcon extends Icon {
        render() {
            console.log("rendering AppleIcon");
            return this;
        }
    }

    class WindowsIcon extends Icon {
        render() {
            console.log("rendering WindowsIcon");
            return this;
        }
    }

    export class AppleFactory extends Factory {
        createButton() {
            return new AppleButton();
        }

        createIcon() {
            return new AppleIcon();
        }
    }

    export class WindowsFactory extends Factory {
        createButton() {
            return new WindowsButton();
        }

        createIcon() {
            return new WindowsIcon();
        }
    }

}

let Mac = new AbstractFactory.AppleFactory();
let Windows = new AbstractFactory.WindowsFactory();
Mac.createButton().render();
Mac.createIcon().render();
Windows.createButton().render();
Windows.createIcon().render();




