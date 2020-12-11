export {};
type ElementOf<T> = T extends Array<infer E>?E:never; // 把元组转换成联合类型

type Ttuple = [string, number];
type TupleToUnion = ElementOf<Ttuple>;



type T1 = {name:string};
type T2 = {age:number};
type ToIntersection<T> = T extends {a:(x:infer U)=>void, b:(x:infer U)=>void}?U:never;

type T3 = ToIntersection<{a:(x:T1)=>void, b:(x:T2)=>void}>;

let t3:T3; // 类型 T1&T2
