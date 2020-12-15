class Power {
    charge() {
        return "220V";
    }
}

class Adaptor {
    public power: Power = new Power();

    charge(powerUsage: string) {
        let v = this.power.charge();
        console.log(`${v}=>${powerUsage}`);
    }
}

class Laptop {
    public power: Adaptor = new Adaptor();

    use() {
        this.power.charge("20V");
    }
}

let surface = new Laptop();
surface.use();
