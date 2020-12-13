export {};

type Proxy<V> = {
    get: () => V;
    set: (value: V) => void;
}

type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>
}

function proxify<T extends object>(obj: T): Proxify<T> {
    let result = <Proxify<T>>{};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            type KeyType = typeof key;
            Object.defineProperty(result, key, {
                get: (): T[KeyType] => {
                    return obj[key];
                },
                set: (value: T[KeyType]) => {
                    obj[key] = value;
                },
                enumerable: true
            });
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

let proxyProps: any = proxify<Props>(props);

console.log(proxyProps.name);
proxyProps.name = "dtwu66";
console.log(proxyProps.name);


function unProxify<T>(p: Proxify<T>): T {
    let result: any = {} as T;
    for (const key in p) {
        result[key] = p[key];
    }

    return result;
}

let originProps = unProxify<Props>(proxyProps);
console.log(originProps);
