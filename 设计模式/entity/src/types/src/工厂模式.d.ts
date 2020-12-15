declare class Fruit {
    name: string;
    constructor(name: string);
    log(): void;
}
declare class Apple extends Fruit {
    flavour: string;
    constructor(flavour: string);
}
declare class Orange extends Fruit {
    flavour: string;
    constructor(flavour: string);
}
/**
 * 简单工厂模式
 * -简单工厂模式是由一个工厂对象决定创建出哪一种产品类的实例
 * */
declare class Factory {
    create(type: string): Apple | Orange;
}
declare let fac: Factory;
/**
 * 工厂方法模式
 *  -多态性工厂方法
 *  - 工厂方法模式Factory Method，又称多态性工厂模式
 *  - 在工厂方法模式中，核心的工厂类不再负责所有的产品的创建，而是将具体创建的工作交给子类去做。
 * */
declare namespace FactoryMethod {
    class Factory {
        create(): void;
    }
    export class AppleFactory extends Factory {
        create(): Apple;
    }
    export class OrangeFactory extends Factory {
        create(): Orange;
    }
    export {};
}
/**
 * 抽象工厂模式
 * - 抽象工厂模式是指当有多个抽象角色时， 使用的一种工厂模式
 * - 抽象工厂模式可以想客户端提供一个接口，是客户端在不必指定产品的具体的情况下，创建多个产品簇中的产品对象
 * */
declare namespace AbstractFactory {
    class Factory {
        createButton(): void;
        createIcon(): void;
    }
    class Button {
        render(): void;
    }
    class Icon {
        render(): void;
    }
    class AppleButton extends Button {
        render(): this;
    }
    class WindowsButton extends Button {
        render(): this;
    }
    class AppleIcon extends Icon {
        render(): this;
    }
    class WindowsIcon extends Icon {
        render(): this;
    }
    export class AppleFactory extends Factory {
        createButton(): AppleButton;
        createIcon(): AppleIcon;
    }
    export class WindowsFactory extends Factory {
        createButton(): WindowsButton;
        createIcon(): WindowsIcon;
    }
    export {};
}
declare let Mac: AbstractFactory.AppleFactory;
declare let Windows: AbstractFactory.WindowsFactory;
