// 拷贝数组，兼容类数组 浅克隆

function toArray() {
    // 方法1
    // let arr = [];
    // for (let i = 0; i < arguments.length; i++) {
    //     arr.push(arguments[i])
    // }
    // return arr;

    // 方法2
    return [].slice.call(arguments);
}

// console.log(toArray(1, 2, 3, 4, 5));

/**
 * 数组和对象的深克隆/浅克隆
 */


/**
 * @Object
 */

let obj = {
    a: 100,
    b: [10, 20, 30],
    c: {
        x: 10
    },
    d: /^\d+$/
};

// 实现对象的克隆有哪些方法

// let newObj = Object.assign({}, obj); 浅克隆

// let newObj = {...obj}; 浅克隆

// let newObj = JSON.parse(JSON.stringify(obj)); 深克隆但是有缺陷，undefined属性无法被stringify