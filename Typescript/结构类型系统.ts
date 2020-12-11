// 比较参数
// 比较返回值
export {};
type Func = (a: number, b: number) => void;

let sum: Func;

function f1(a: number, b: number): void {
}

sum = f1; // OK

function f2(a: number): void {
}

sum = f2; // OK 参数可以少


function f3(a: number, b: number, c: number): void {
}

// sum = f3; // Error 参数不能多
