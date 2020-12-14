declare function factory<T>(Cstr: {
    new (): T;
}): T;
interface Calculate<T> {
    <U>(a: T, b: T): U;
}
declare let sum: Calculate<number>;
declare function swap<A, B>(tuple: [A, B]): [B, A];
interface LengthWise {
    length: number;
}
declare function logger<T extends LengthWise>(val: T): void;
declare let obj: {
    length: number;
};
declare type withLengthObj = typeof obj;
