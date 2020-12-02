abstract class Animal {
    name!: string;

    abstract speak(): void
}

class Cat extends Animal {
    speak(): void {
        console.log("喵喵喵");
    }
}

let cat = new Cat();
cat.speak();
