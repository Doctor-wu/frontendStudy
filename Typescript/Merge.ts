// Merge = Compute + Omit<U,T>
import {Omit} from "./Overwrite";

export {};
type O1 = {
    id: number;
    name: string;
}
type O2 = {
    id: number;
    age: number;
}


type Compute<A extends any> = A extends Function ? A : { [K in keyof A]: A[K] };
type R1 = Compute<{ x: 'x' & { y: 'y' } }>;


type Merge<O1 extends object, O2 extends object> = Compute<O1 & Omit<O2, keyof O1>>

type R2 = Merge<O1, O2>;
// let obj:R2 = {}
// {id:number, name:string, age:number};
