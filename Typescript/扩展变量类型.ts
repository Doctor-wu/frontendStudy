// 扩展局部变量的类型
// declare var String: StringConstructor;
//
// interface StringConstructor {
//     new(value?: any): String;
//
//     (value?: any): string;
//
//     readonly prototype: String;
// }
//
// interface String {
//     toString(): string;
// }

// 相同名称的多个interface会进行合并
interface String {
    double(): string;
}

String.prototype.double = function () {
    // @ts-ignore
    return this+this;
}

let result = "hello".double();// hellohello
console.log(result)
