// 递归把接口的属性变成可选项
export {};

interface Company {
    id: number;
    name: string;
}

interface Person {
    id: number;
    name: string;
    company: Company
}

type DeepPartial<T> = {
    [U in keyof T]?: T[U] extends object ? DeepPartial<T[U]> : T[U];
}

type PartialPerson = DeepPartial<Person>;
let p: PartialPerson = {
    id: 1,
    name: "doctorwu",
    company: {
        // 这个company现在也是Partial的
    }
}


// Required
type Required<T> = {
    [U in keyof T] -?: T[U]
}


// Pick
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

interface Person2 {
    name: string;
    age: number;
    gender: number;
}

let person: Person2 = {
    name: "doctorwu",
    age: 20,
    gender: 1
}

type PickPerson = Pick<Person2, 'name' | 'age'>;
// Pick和Extract的区别，Extract是有条件的类型分发


// Record 将一个类型的所有属性值都映射到另一个类型上并创造一个新的类型
type Record<K extends keyof any, T> = {
    [P in K]: T;
};

function mapObject<K extends string | number, T, U>(obj: Record<K, T>, mapFn: (x: T) => U) {
    let result: Record<K, U> = <Record<K, U>>{};
    for (const key in obj) {
        if(obj.hasOwnProperty(key)){
            result[key] = mapFn(obj[key]);
        }
    }
    return result;
}

let obj = {
    count1: 1,
    count2: 2
}
let map = (x: number): string => x * 2 + '';
let newObj = mapObject<string | number, number, string>(obj, map);
