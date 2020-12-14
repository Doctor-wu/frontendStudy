declare type Func<T extends any[], R> = (...a: T) => R;
export default function compose(): <R>(a: R) => R;
export default function compose<F extends Function>(f1: F): F;
export default function compose<A, T extends any[], R>(f1: (a: A) => R, f2: Func<T, A>): Func<T, R>;
export default function compose<A, B, T extends any[], R>(f1: (a: B) => R, f2: (a: A) => B, f3: Func<T, A>): Func<T, R>;
export default function compose<A, B, C, T extends any[], R>(f1: (a: C) => R, f2: (a: B) => C, f3: (a: A) => B, f4: Func<T, A>): Func<T, R>;
export default function compose<R>(f1: (a: any) => R, ...funcs: Function[]): (...args: any[]) => R;
export {};
