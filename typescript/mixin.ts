interface AnyObject{
    [prop:string]:any
}

function mixin<T, U>(one: T, two:U):T&U{
    const result = <(T&U)>{};
    for(let key in one)
        (<T>result)[key] = one[key];
    for(let key in two)
        (<U>result)[key] = two[key];

    return result;
}

const x = mixin({name:"doctorwu"},{age:20});
console.log(x.name, x.age);
