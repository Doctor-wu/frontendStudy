/**
 * 普通单例
 *  缺点是类的使用者必须知道这是一个单例模式的类，并且主动调用获取实例的方法
 * */

namespace NormalSingle {
    export class Single {
        public name: string;

        constructor(name: string) {
            this.name = name;
        }

        static getInstance: (name: string) => Single = (function () {
            let instance: Single; // 闭包


            return function (name: string) {
                if (!instance) {
                    instance = new Single(name);
                }

                return instance;
            };
        })()
    }
}

let s1 = NormalSingle.Single.getInstance("doctorwu");
let s2 = NormalSingle.Single.getInstance("doctorwu666");

console.log(s1, s2, s1 === s2);


/**
 * 透明单例模式
 *  类的使用者正常使用即可
 * */


namespace TransparentSingle {

    export class Single {
        public name?: string;
        static instance?: Single = undefined;

        constructor(name: string) {
            if (!Single.instance) {
                this.name = name;
                Single.instance = this;
            }

            return Single.instance;
        }
    }
}


let s3 = new TransparentSingle.Single("doctorwu666");
let s4 = new TransparentSingle.Single("doctorwu");

console.log(s3, s4, s3 === s4);


/***
 * 创建单例函数的函数
 * @param Cstr
 * @constructor
 */

function CreateSingle<T>(Cstr: ICstr<T>) {
    let instance: T;
    return function (...args: Array<any>) {
        if (!instance) {
            instance = new Cstr(...args);
        }
        return instance;
    }
}

// export interface Constructable<T> {
//
//     new(...args: any[]): T
// }


interface ICstr<T> {
    new(...args: Array<any>): T;
}

class My {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    getName() {
        return this.name;
    }
}

class You {
    constructor(public age: number) {
    }

    getAge() {
        return this.age;
    }

}

let mySingle = CreateSingle(My);
let youSingle = CreateSingle(You);
console.log(mySingle("dtwu"), mySingle("doctorwu"), mySingle("dtwu") === mySingle("doctorwu"));
console.log(youSingle("doctorwu"), youSingle("dtwu"), youSingle("dtwu") === youSingle("doctorwu"));
console.log(youSingle("dtwu212").getAge());
console.log(mySingle("dtwu2432").getName());

