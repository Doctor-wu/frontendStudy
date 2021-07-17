'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isObject = function (value) { return typeof value === 'object' && value !== null; };
var extend = Object.assign;

function effect(fn, options) {
    if (options === void 0) { options = {}; }
    // 需要让这个effect变成响应式的effect, 可以做到数据变化重新执行
    var effective = createReactiveEffect(fn, options);
    if (!options.lazy) {
        effective();
    }
    return effective;
}
var eid = 0;
var effectStack = [];
var activeEffect = null;
function createReactiveEffect(fn, options) {
    if (options === void 0) { options = {}; }
    var effective = function reactiveEffect() {
        if (!effectStack.includes(effective)) {
            try {
                effectStack.push(effective);
                activeEffect = effective;
                return fn();
            }
            finally {
                effectStack.pop();
                activeEffect = effectStack[effectStack.length - 1];
            }
        }
        else {
            console.warn('circular assign effect!');
        }
    };
    effective.id = eid++; // 区分effect
    effective._isEffect = true; // 用于标识这个是响应式effect
    effective.raw = fn;
    effective.options = options;
    return effective;
}
var targetMap = new WeakMap();
function track(target, type, key) {
    if (activeEffect) {
        // target对应的Map
        var depsMap = targetMap.get(target);
        if (!depsMap) {
            targetMap.set(target, (depsMap = new Map));
        }
        // target对应的Map中 对应的key对应的Set
        var deps = depsMap.get(key);
        if (!deps) {
            depsMap.set(key, (deps = new Set));
        }
        if (!deps.has(activeEffect)) {
            deps.add(activeEffect);
        }
    }
}

function createGetter(isReadonly, shallow) {
    if (isReadonly === void 0) { isReadonly = false; }
    if (shallow === void 0) { shallow = false; }
    return function get(target, key, receiver) {
        var res = Reflect.get(target, key, receiver);
        if (!isReadonly) {
            // 不是仅读的，就收集依赖，数据改变后更新对应的视图
            console.log('收集', target, key);
            track(target, 0 /* GET */, key);
        }
        if (shallow) {
            return res;
        }
        if (isObject(res)) {
            return isReadonly ? readonly(res) : reactive(res);
        }
        return res;
    };
}
function createSetter(shallow) {
    return function set(target, key, value, receiver) {
        var result = Reflect.set(target, key, value, receiver);
        // 当数据更新时，通知对应属性的effect重新执行
        return result;
    };
}
var get = createGetter();
var shallowGet = createGetter(false, true);
var readonlyGet = createGetter(true);
var shallowReadonlyGet = createGetter(true, true);
var set = createSetter();
var shallowSet = createSetter();
var readonlyObject = {
    set: function (target, key) {
        console.warn("set on key [" + key + "] failed , [" + key + "']s originValue is " + target[key]);
    }
};
var mutableHandlers = {
    get: get,
    set: set,
};
var shallowReactiveHandlers = {
    get: shallowGet,
    set: shallowSet,
};
var readonlyHandlers = extend({
    get: readonlyGet,
}, readonlyObject);
extend({
    get: shallowReadonlyGet,
}, readonlyObject);

function reactive(target) {
    return createReactiveObject(target, false, mutableHandlers);
}
function shallowReactive(target) {
    return createReactiveObject(target, false, shallowReactiveHandlers);
}
function readonly(target) {
    return createReactiveObject(target, true, readonlyHandlers);
}
function shallowReadonly(target) {
    return createReactiveObject(target, true, shallowReactiveHandlers);
}
var reactiveMap = new WeakMap(); // 会自动垃圾回收，不会造成内存泄漏
var readonlyMap = new WeakMap();
function createReactiveObject(target, isReadonly, baseHandlers) {
    // 如果目标不是对象，那就没法拦截
    if (!isObject(target)) {
        return target;
    }
    var proxyMap = isReadonly ? reactiveMap : readonlyMap;
    var exisitProxy = proxyMap.get(target);
    if (exisitProxy)
        return exisitProxy;
    var proxy = new Proxy(target, baseHandlers);
    proxyMap.set(target, proxy); // 将要代理的对象和对应的代理结果缓存起来
    return proxy;
}

exports.effect = effect;
exports.reactive = reactive;
exports.readonly = readonly;
exports.shallowReactive = shallowReactive;
exports.shallowReadonly = shallowReadonly;
//# sourceMappingURL=reactivity.cjs.js.map
