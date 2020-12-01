interface IBuyable {
    buy: (...args: Array<any>) => void
}


class Customer {
    public kind: IBuyable

    constructor(kind: IBuyable) {
        this.kind = kind;
    }

    buy(money: number) {
        this.kind.buy(money);
    }
}


class Normal implements IBuyable {
    buy(money: number) {
        console.log(`cost ${money}`);
    }
}

class Member implements IBuyable {
    buy(money: number) {
        console.log(`cost ${money * .9}`);
    }
}

class Vip implements IBuyable {
    buy(money: number) {
        console.log(`cost ${money * .8}`);
    }
}


let customer = new Customer(new Normal());
customer.buy(100);
customer.kind = new Member();
customer.buy(100);
customer.kind = new Vip();
customer.buy(100);
