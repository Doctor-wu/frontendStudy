declare type R4 = Exclude<'a' | 'b' | 'c' | 'd', 'a' | 'b' | 'c'>;
declare type R5 = Extract<'a' | 'b' | 'c' | 'd', 'a' | 'b' | 'c'>;
declare type R6 = NonNullable<'a' | null | undefined>;
declare function getUser(a: string, b: number): {
    name: string;
    age: number;
};
declare type getUserType = typeof getUser;
declare type ReturnUser = ReturnType<getUserType>;
declare let u: ReturnUser;
declare type ParamsType = Parameters<getUserType>;
declare class Person {
    name: string;
    constructor(name: string);
    getName(): string;
}
declare type Params = ConstructorParameters<typeof Person>;
declare type PersonInstance = InstanceType<typeof Person>;
