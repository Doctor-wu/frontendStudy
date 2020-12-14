interface AnyObject {
    [prop: string]: any;
}
declare function mixin<T, U>(one: T, two: U): T & U;
declare const x: {
    name: string;
} & {
    age: number;
};
