import { extend, hasChanged, hasOwn, isArray, isIntegerKey, isNumber, isObject } from "@vue/shared";
import { track, trigger } from "./effect";
import { TrackOpTypes, TriggerOpTypes } from "./operators";
import { reactive, readonly } from "./reactive";

function createGetter(
  isReadonly = false,
  shallow = false
) {
  return function get(target, key, receiver) {
    const res = Reflect.get(target, key, receiver);

    if (!isReadonly) {
      // 不是仅读的，就收集依赖，数据改变后更新对应的视图
      track(target, TrackOpTypes.GET, key);
    }

    if (shallow) {
      return res;
    }

    if (isObject(res)) {
      return isReadonly ? readonly(res) : reactive(res);
    }

    return res;
  }
};

function createSetter(
  shallow = false
) {
  return function set(target, key, value, receiver) {
    const oldValue = Reflect.get(target, key, receiver);
    // 判断对象中是否已经存在对应的key
    const hasKey = isArray(target)
      && isIntegerKey(key)
      ? Number(key) < target.length
      : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    
    if (!hasKey) {
      // 新增的值
      trigger(target, TriggerOpTypes.ADD, key, value);
    } else if (hasChanged(oldValue, value)) {
      // 修改的值
      trigger(target, TriggerOpTypes.SET, key, value, oldValue);
    }

    // 当数据更新时，通知对应属性的effect重新执行

    return result;
  }
}

const get = createGetter();
const shallowGet = createGetter(false, true);
const readonlyGet = createGetter(true);
const shallowReadonlyGet = createGetter(true, true);

const set = createSetter();
const shallowSet = createSetter(true);

const readonlyObject = {
  set: (target, key) => {
    console.warn(`set on key [${key}] failed , [${key}']s originValue is ${target[key]}`);
  }
};

export const mutableHandlers = {
  get,
  set,
};

export const shallowReactiveHandlers = {
  get: shallowGet,
  set: shallowSet,
};

export const readonlyHandlers = extend({
  get: readonlyGet,
}, readonlyObject);

export const shallowReadonlyHandlers = extend({
  get: shallowReadonlyGet,
}, readonlyObject);
