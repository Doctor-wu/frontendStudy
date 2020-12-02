function sum(a: number, b: number = 5): number {
    return a + b;
}

type Func<T extends any[], R> = (...a: T) => R;
/* zero functions */
console.log(compose()(1));
console.log(compose(sum)(1));
console.log(compose(sum, sum)(1));
console.log(compose(sum, sum, sum)(1));
console.log(compose(sum, sum, sum, sum)(1));
console.log(compose(sum, sum, sum, sum, sum)(1));
console.log(compose(sum, sum, sum, sum, sum, sum)(1));
export default function compose(): <R>(a: R) => R;

/* one functions */
export default function compose<F extends Function>(f1: F): F;

/* two functions */
export default function compose<A, T extends any[], R>(
    f1: (a: A) => R,
    f2: Func<T, A>
): Func<T, R>;

/* three functions */
export default function compose<A, B, T extends any[], R>(
    f1: (a: B) => R,
    f2: (a: A) => B,
    f3: Func<T, A>
): Func<T, R>;

/* four functions */
export default function compose<A, B, C, T extends any[], R>(
    f1: (a: C) => R,
    f2: (a: B) => C,
    f3: (a: A) => B,
    f4: Func<T, A>
): Func<T, R>;


/* rest */
export default function compose<R>(
    f1: (a: any) => R,
    ...funcs: Function[]
): (...args: any[]) => R;

export default function compose<R>(...funcs: Function[]): (...args: any[]) => R;

export default function compose(...funcs: Function[]) {
    if (funcs.length === 0) {
        return <T>(arg: T): T => arg;
    }
    if (funcs.length === 1) {
        return funcs[0];
    }


    return funcs.reduce((a, b) => (...args: any) => a(b(...args)));
}
