export declare type SetDifference<A, B> = A extends B ? never : A;
export declare type Omit<T, K extends keyof any> = Pick<T, SetDifference<keyof T, K>>;
