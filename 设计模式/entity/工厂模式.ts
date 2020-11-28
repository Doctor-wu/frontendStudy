
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


class Factory {
    create(type: string) {
        switch (type) {
            case "apple":
                return new Apple("甜");
            case "orange":
                return new Apple("酸");
            default:
                throw new Error("没有想要的产品");
        }
    }
}


new Factory().create("orange").log()
new Factory().create("apple").log()
