interface IBuyable {
    buy: (...args: Array<any>) => void;
}
declare class Customer {
    kind: IBuyable;
    constructor(kind: IBuyable);
    buy(money: number): void;
}
declare class Normal implements IBuyable {
    buy(money: number): void;
}
declare class Member implements IBuyable {
    buy(money: number): void;
}
declare class Vip implements IBuyable {
    buy(money: number): void;
}
declare let customer: Customer;
