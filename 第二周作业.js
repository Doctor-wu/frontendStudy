//=>浅克隆：只复制对象或者数组的第一级内容
//=>深克隆：克隆后数组的每一级都和原始数组没有关联
//那么请说出，浅克隆都怎么去实现，如何实现深度克隆
let obj = {
    a: 100,
    b: [10, 20, 30],
    c: {
        x: 10
    },
    d: /^\d+$/
};

let arr = [10, [100, 200], {
    x: 10,
    y: 20
}];

const shallowClone = function(param) {
    if (Array.isArray(param)) return param.slice(0);
    return Object.assign({}, param);
}

function deepClone(obj) {
    const constructor = obj.constructor;
    if (obj === null) return obj;
    if (typeof obj !== "object") return obj;
    if (/^RegExp|Date$/i.test(constructor.name)) return new constructor(obj);
    let clone = new constructor();
    for (const key in obj) {
        if (!obj.hasOwnProperty(key)) break;
        clone[key] = deepClone(obj[key]);
    }
    return clone;
    // if (Array.isArray(param)) {
    //     let array = [];
    //     Object.keys(param).forEach((key) => {
    //         if (!!param[key] && typeof param[key] === 'object') {
    //             array[key] = clone(param[key]);
    //         } else {
    //             array[key] = param[key];
    //         }
    //     })
    //     return array;
    // } else if (!!param && typeof param === 'object') {
    //     let obj = {};
    //     Object.keys(param).forEach((key) => {
    //         if (!!param[key] && typeof param[key] === 'object') {
    //             obj[key] = clone(param[key]);
    //         } else {
    //             obj[key] = param[key];
    //         }
    //     })
    //     return obj;
    // } else {
    //     return param;
    // }
}

let newArr = deepClone(arr);
let newObj = deepClone(obj);

obj.b.push(40);
arr[1].push(300);

console.log(obj, newObj);
console.log(arr, newArr);