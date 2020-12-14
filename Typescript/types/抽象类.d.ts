declare abstract class Animal {
    name: string;
    abstract speak(): void;
}
declare class Cat extends Animal {
    speak(): void;
}
declare let cat: Cat;
