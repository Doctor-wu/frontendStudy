import { hasChanged, hasOwn, isArray } from "@vue/shared";
import { track, trigger } from "./effect";
import { TrackOpTypes, TriggerOpTypes } from "./operators";
import { reactive } from "./reactive";

// ref 内部使用的是defineProperty
export function ref(value) {
  // 将普通类型变成一个对象, 也可以是对象，但是一般情况下对象用reactive更合理
  return createRef(value);
}

export function shallowRef(value) {
  return createRef(value, true);
}

class RefImpl {
  public _value; // 表示声明了一个_value属性 但是没有赋值
  public readonly __v_isRef = true; // 表示是一个ref属性
  constructor(public rawValue, public shallow) {
    this._value = shallow ? rawValue : reactive(rawValue);
  }

  get value() {
    track(this, TrackOpTypes.GET, 'value');
    return this._value;
  }
  
  set value(newValue) {
    if (hasChanged(this._value, newValue)) {
      this.rawValue = newValue;
      this._value = newValue;
      trigger(this, TriggerOpTypes.SET, 'value', newValue);
    }
  }
}

function createRef(rawValue, shallow = false) {
  return new RefImpl(rawValue, shallow);
}

class ObjectRefImpl {
  public readonly __v_isRef = true; // 表示是一个ref属性
  constructor(public target, public key) {
  }

  get value() {
    return this.target[this.key];
  }

  set value(newValue) {
    this.target[this.key] = newValue;
  }
}
// 将某一个key对应的值转换成ref
export function toRef(target, key) { // 可以将一个对象的属性变成ref
  return new ObjectRefImpl(target, key);
}

export function toRefs(object: Object | Array<unknown>) {
  const ret = isArray(object) ? new Array(object.length) : {};
  for (const key in object) {
    if (hasOwn(object, key)) {
      ret[key] = toRef(object, key);
    }
  }
  return ret;
}