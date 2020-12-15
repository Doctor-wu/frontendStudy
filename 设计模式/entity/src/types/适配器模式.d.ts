declare class Power {
    charge(): string;
}
declare class Adaptor {
    power: Power;
    charge(powerUsage: string): void;
}
declare class Laptop {
    power: Adaptor;
    use(): void;
}
declare let surface: Laptop;
