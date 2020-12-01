function before(beforeFn: Function, ...factoryArgs: Array<any>) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let oldVal = descriptor.value;
        descriptor.value = function (...args: Array<any>) {
            beforeFn.apply(this, factoryArgs);
            oldVal.apply(this, args);
        }
    }
}


function takeMoney(money: string) {
    console.log(`从家里带了${money}`)
}

namespace DecoratorPattern {
    export class My {
        constructor(public name: string) {
        }

        @before(takeMoney, "10元")
        buy(money: string, goods: string): void {
            console.log(`${this.name}花${money}买了${goods}`);
        }
    }
}

let dtwu = new DecoratorPattern.My("doctorwu");
dtwu.buy("5元", "一瓶枝枝")
console.log(dtwu.name)
