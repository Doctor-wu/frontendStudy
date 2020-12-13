export {};

type Proxy<V> = {
    get(): V;
    set(value: V): void;
}

type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>
}

function proxify<T extends object>(obj: T): Proxify<T> {
    let result = <Proxify<T>>{};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            type KeyType = typeof key;
            result[key] = {
                get: (): T[KeyType] => {
                    return obj[key];
                },
                set: (value: T[KeyType]) => {
                    obj[key] = value;
                }
            }
        }
    }
    return result;
}

interface Props {
    name: string,
    age: number
}

let props: Props = {
    name: "doctorwu",
    age: 20
}

let proxyProps = proxify<Props>(props);

console.log(proxyProps.name.get());
proxyProps.name.set("dtwu66");
console.log(proxyProps.name.get());


function unProxify<T>(p: Proxify<T>): T {
    let result = {} as T;
    for (const key in p) {
        result[key] = p[key].get();
    }

    return result;
}

let originProps = unProxify<Props>(proxyProps);
console.log(originProps);
