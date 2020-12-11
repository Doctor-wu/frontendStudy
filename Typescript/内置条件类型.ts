// Exclude
// type Exclude<T, U> = T extends U?never:T;
type R4 = Exclude<'a'|'b'|'c'|'d', 'a'|'b'|'c'>
// type R4 = 'd'


// Extract
// type Extract<T, U> = T extends U?T:never;
type R5 = Extract<'a'|'b'|'c'|'d', 'a'|'b'|'c'>
// type R5 = 'a'|'b'|'c'


// NonNullable
// type Extract<T> = T extends null | undefined? never : T;
type R6 = NonNullable<'a'| null | undefined>;
// type R6 = 'a'


// ReturnType
// type ReturnType<T> = T extends (...args: any[]) => infer R ? R : T;

function getUser(a:string, b:number){
    return {
        name: 'doctorwu',
        age: 20
    };
}

type getUserType = typeof getUser;
type ReturnUser = ReturnType<getUserType>;
let u: ReturnUser = { // 类型可用
    name: 'dtwu',
    age: 21
}


// Parameters
// type Parameters<T> = T extends (...args:infer P) => any ? P :never;
type ParamsType = Parameters<getUserType>; // [string, number]


//ConstructorParameters

class Person {
    name:string;
    constructor(name:string){
        this.name = name;
    }
    getName(){
        return this.name;
    }
}

// type ConstructorParameters<T extends new(...args:any)=>any> = T extends new (...args: infer P) => any ? P : never;
type Params = ConstructorParameters<typeof Person>;

// InstanceType
// type InstanceType<T extends new(...args:any)=>any> = T extends new (...args:any) => infer R ? R : any;
type PersonInstance = InstanceType<typeof Person>;
