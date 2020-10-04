// var class2type = {},
//     toString = class2type.toString,
//     hasOwn = class2type.hasOwnProperty,
//     fnToString = hasOwn.toString,
//     ObjectFunctionString = fnToString.call(Object);

// "String Number Boolean Date Symbol RegExp Function Error Object BigInt Array GeneratorFunction".split(" ").forEach(name => {
//     class2type[`[object ${name}]`] = name.toLowerCase()
// })

// function toType(obj) {
//     // 识别 null / undefined
//     if (obj == null) {
//         return obj + "";
//     }

//     return typeof obj === "object" || typeof obj === "function" ?
//         class2type[toString.call(obj)] || "object" :
//         typeof obj
// }


/*
 * JQ中数据类型检测的处理 
 */
var class2type = {};
var toString = class2type.toString; //Object.prototype.toString
var hasOwn = class2type.hasOwnProperty; //Object.prototype.hasOwnProperty
var fnToString = hasOwn.toString; //Function.prototype.toString
var ObjectFunctionString = fnToString.call(Object); //"function Object() { [native code] }"
var getProto = Object.getPrototypeOf; //获取对象原型链__proto__指向的原型

// 建立数据类型检测的映射表 [object Xxx]:xxx
["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Object", "Error", "Symbol", "BigInt", "GeneratorFunction"].forEach(name => {
    class2type[`[object ${name}]`] = name.toLowerCase();
});

// toType：数据类型检测的公共方法
function toType(obj) {
    // null/undefiend
    if (obj == null) {
        return obj + "";
    }
    // 基本数据类型检测基于typeof
    // 引用数据类型检测基于Object.prototype.toString.call
    return typeof obj === "object" || typeof obj === "function" ?
        class2type[toString.call(obj)] || "object" :
        typeof obj;
}

// 检测是否为函数
var isFunction = function isFunction(obj) {
    // i.e., `typeof document.createElement( "object" ) === "function"`
    return typeof obj === "function" && typeof obj.nodeType !== "number";
};

// 检测是否为window对象
var isWindow = function isWindow(obj) {
    // window.window===window
    return obj != null && obj === obj.window;
};

// 检测是否为数组或者类数组
function isArrayLike(obj) {
    // length:对象的length属性值或者是false
    // type:获取检测值的数据类型
    var length = !!obj && "length" in obj && obj.length,
        type = toType(obj);

    // 函数和window一定不是数据或者类数组（但是他们确实有length属性）
    if (isFunction(obj) || isWindow(obj)) {
        return false;
    }

    // type === "array"：数组
    // length === 0：我们认为其是一空的类数组集合
    // (length - 1) in obj：对于非空集合，我们认为只要最大索引在对象中，则证明索引是逐级递增的（不准确）
    return type === "array" || length === 0 ||
        typeof length === "number" && length > 0 && (length - 1) in obj;
}

// 验证是否为空对象：主要是看当前对象中是否存在私有属性
function isEmptyObject(obj) {
    var name;
    for (name in obj) {
        if (!obj.hasOwnProperty(name)) break;
        return false;
    }
    return true;
}

// 是否为纯粹的对象
function isPlainObject(obj) {
    var proto, Ctor;

    // 基于toString.call返回结果不是[object Object]则一定不是纯粹的对象
    if (!obj || toString.call(obj) !== "[object Object]") {
        return false;
    }

    // 获取当前对象所属类的原型
    proto = getProto(obj);

    // Object.create(null)：创建一个空对象，但是没有__proto__
    if (!proto) return true;

    // Ctor：获取当前对象所属类的constructor
    // 纯粹对象的特点：直属类的原型一定是Object.prototype（DOM元素对象/自定义的实例对象...都不是）
    Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
    return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
}