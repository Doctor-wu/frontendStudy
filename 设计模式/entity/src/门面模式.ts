class Calculator {
    public sum: Sum;
    public minus: Minus;
    public mutiply: Mutiply;
    public divider: Divider;

    constructor() {
        this.sum = new Sum();
        this.minus = new Minus();
        this.mutiply = new Mutiply();
        this.divider = new Divider();
    }
}

class Sum {
    execute(a: number, b: number) {
        return a + b;
    }
}

class Minus {
    execute(a: number, b: number) {
        return a - b;
    }
}

class Mutiply {
    execute(a: number, b: number) {
        return a * b;
    }
}

class Divider {
    execute(a: number, b: number) {
        return a / b;
    }
}


console.log(new Calculator().divider.execute(8, 2))
