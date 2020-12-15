declare function before(beforeFn: Function, ...factoryArgs: Array<any>): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
declare function takeMoney(money: string): void;
declare namespace DecoratorPattern {
    class My {
        name: string;
        constructor(name: string);
        buy(money: string, goods: string): void;
    }
}
declare let dtwu: DecoratorPattern.My;
