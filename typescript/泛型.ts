// 泛型工厂
function factory<T>(Cstr: { new(): T }): T {
    return new Cstr();
}


// 泛型接口
interface Calculate<T> {
    <U>(a: T, b: T): U
}

let sum: Calculate<number> = function <U>(a: number, b: number): U {
    return (a + b) as any;
}

console.log(sum<number>(1, 2));


// 多泛型
function swap<A, B>(tuple: [A, B]): [B, A] {
    return [tuple[1], tuple[0]]
}

console.log(swap(["doctorwu", 123456]));


interface LengthWise {
    length: number
}

function logger<T extends LengthWise>(val: T) {
    console.log(val.length);
}

logger("doctorwu");// 传入的参数需要满足Lengthwise
