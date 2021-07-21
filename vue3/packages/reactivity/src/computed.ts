import { isFunction } from "@vue/shared";
import { effect, track, trigger } from "./effect";
import { TrackOpTypes, TriggerOpTypes } from "./operators";


class ComputedRefImpl {
  public dirty = true; // 默认取值时 计算一次
  public _value;
  public effect;
  constructor(public getter, public setter) { // 计算属性默认会产生一个effect
    this.effect = effect(getter, {
      lazy: true, // 默认不执行
      scheduler: () => {
        if (!this.dirty) {
          this.dirty = true;
          trigger(this, TriggerOpTypes.SET, 'value');
        }
      }
    });
  }

  get value() { // 计算属性也要收集依赖
    if (this.dirty) {
      this._value = this.effect();
      this.dirty = false;
    }
    track(this, TrackOpTypes.GET, 'value');
    return this._value;
  }

  set value(newValue) {
    this.setter(newValue);
  }
}



interface visitor {
  get: Function;
  set: Function;
}
export function computed(getterOrOptions: Function | visitor) {
  let getter,
    setter;
  if (isFunction(getterOrOptions)) {
    getter = getterOrOptions;
    setter = () => {
      console.warn('computed value must be readonly');
    }
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }

  return new ComputedRefImpl(getter, setter);
}