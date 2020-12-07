function* make(array: any): Iterable<any> {
    for (let i = 0; i < array.length; i++) {
        if (Array.isArray(array[i])) yield* make(array[i]);
        else yield array[i];
    }
}

let genArray: () => Array<any> | number = function () {
    let res = Math.random();
    return res > .1 ? [res, genArray()] : res;
}

// let arr = [1, 2, [3, 4], 5, [6, [7, 8]]];

let arr = genArray();
console.log(arr);
console.log(...make(arr));
