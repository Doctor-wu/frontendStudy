interface AnyObject{
    [prop:string]:any
}

function mixin<T, U>(one: T, two:U):T&U{
    const result = <(T&U)>{};
    for(let key in one) {
        if((one as Object).hasOwnProperty(key)){
            (<T>result)[key] = one[key];
        }
    }
    for(let key in two){
        if((two as Object).hasOwnProperty(key)){
            (<U>result)[key] = two[key];
        }
    }

    return result;
}

const x = mixin({name:"doctorwu"},{age:20});
console.log(x.name, x.age);
