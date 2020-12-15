declare class Calculator {
    sum: Sum;
    minus: Minus;
    mutiply: Mutiply;
    divider: Divider;
    constructor();
}
declare class Sum {
    execute(a: number, b: number): number;
}
declare class Minus {
    execute(a: number, b: number): number;
}
declare class Mutiply {
    execute(a: number, b: number): number;
}
declare class Divider {
    execute(a: number, b: number): number;
}
