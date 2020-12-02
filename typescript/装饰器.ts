namespace classDecorator {
    let replaceClass = (custom: any) => function (constructor: Function) {
        return class {
            // 只能多，不能少
            name!: string;// 不能没有
            eat!: Function;// 不能没有
            custom: any;

            constructor(name: string) {
                this.name = name;
                this.custom = custom;
            }
        }
    }

    @replaceClass({
        gender: "male",
        age: 20
    })
    class People {
        name!: string;
        eat!: Function;

        constructor(name: string) {
            this.name = name;
        };
    }

    // console.log(new People("Doctorwu"))

}

// 属性装饰器
// 装饰属性
// 装饰方法

namespace propertyDecorator {

    // 属性装饰器
// 装饰属性
// 装饰方法


// 如果装饰的是实例属性的话，target是构造函数原型
    function upperCase(target: any, propertyKey: string) {
        let value = target[propertyKey];
        const getter = () => value;
        const setter = (newVal: string) => {
            value = newVal.toUpperCase()
        }

        if (delete target[propertyKey]) {
            Object.defineProperty(target, propertyKey, {
                get: getter,
                set: setter,
                enumerable: true,
                configurable: true
            })
        }
    }

// 如果装饰的是静态属性的话，target是构造函数本身
    function staticPropertyDecorator(target: any, propertyKey: string) {
        console.log(target, propertyKey, propertyKey);
    }


// 如果装饰的是实例属性(方法属性)的话，target是构造函数原型
    function noEnumerable(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(target, propertyKey, descriptor
            // , target === Person.prototype /* true */
        );
        descriptor.enumerable = false;
    }

    function toNumber(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let oldMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            return oldMethod.apply(this, args.map(i => parseFloat(i)))
        }
    }


    class Person {
        @upperCase
        name: string = "Doctorwu";

        @staticPropertyDecorator
        public static age: number = 10;

        @noEnumerable
        getName() {
            console.log(this.name)
        }

        @toNumber
        sum(...args: any[]) {
            return args.reduce((accu: number, item: number) => accu + item, 0)
        }
    }

    let doctorwu = new Person();
    console.log(doctorwu.name);
    doctorwu.getName()
    console.log(doctorwu.sum('1', '2', 3))

}


// 参数装饰器
namespace paramDecorator {
    // target 静态成员就是构造函数 非静态成员就是构造函数原型 methodName 这个参数所属方法的名称 paramIndex 参数的索引
    function addAge(target: any, methodName: string, paramIndex: number) {
        console.log(target, methodName, paramIndex);
        target.age = 10;
    }

    class Person {
        age!: number;

        login(username: string, @addAge password: string) {
            console.log(username, password, this.age)
        }
    }

    let p = new Person();
    p.login("1", "2");
}
