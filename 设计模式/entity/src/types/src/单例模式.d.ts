/**
 * 普通单例
 *  缺点是类的使用者必须知道这是一个单例模式的类，并且主动调用获取实例的方法
 * */
declare namespace NormalSingle {
    class Single {
        name: string;
        constructor(name: string);
        static getInstance: (name: string) => Single;
    }
}
declare let s1: NormalSingle.Single;
declare let s2: NormalSingle.Single;
/**
 * 透明单例模式
 *  类的使用者正常使用即可
 * */
declare namespace TransparentSingle {
    class Single {
        name?: string;
        static instance?: Single;
        constructor(name: string);
    }
}
declare let s3: TransparentSingle.Single;
declare let s4: TransparentSingle.Single;
/***
 * 创建单例函数的函数
 * @param Cstr
 * @constructor
 */
declare function CreateSingle<T>(Cstr: ICstr<T>): (...args: Array<any>) => T;
interface ICstr<T> {
    new (...args: Array<any>): T;
}
declare class My {
    name: string;
    constructor(name: string);
    getName(): string;
}
declare class You {
    age: number;
    constructor(age: number);
    getAge(): number;
}
declare let mySingle: (...args: Array<any>) => My;
declare let youSingle: (...args: Array<any>) => You;
