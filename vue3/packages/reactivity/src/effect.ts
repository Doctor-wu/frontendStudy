import { isArray, isIntegerKey } from "@vue/shared";
import { TrackOpTypes, TriggerOpTypes } from "./operators";

export function effect(fn: Function, options: any = {}) {
  // 需要让这个effect变成响应式的effect, 可以做到数据变化重新执行
  const effective = createReactiveEffect(fn, options);

  if (!options.lazy) {
    effective();
  }

  return effective;
}

let eid = 0;
let effectStack = [];
let activeEffect = null;
function createReactiveEffect(fn: Function, options: any = {}):Function {
  const effective = function reactiveEffect() {
    if (!effectStack.includes(effective)) {
      try {
        effectStack.push(effective);
        activeEffect = effective;
        return fn();
      } finally {
        effectStack.pop();
        activeEffect = effectStack[effectStack.length - 1];
      }
    } else {
      console.warn('circular assign effect!');
    }
  };
  effective.id = eid++; // 区分effect
  effective._isEffect = true; // 用于标识这个是响应式effect
  effective.raw = fn;
  effective.options = options;

  return effective;
}

const targetMap = new WeakMap();
export function track(target, type:TrackOpTypes, key) {
  if (activeEffect) {
    // target对应的Map
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map));
    }
    // target对应的Map中 对应的key对应的Set
    let deps = depsMap.get(key);
    if (!deps) {
      depsMap.set(key, (deps = new Set));
    }
    if (!deps.has(activeEffect)) {
      deps.add(activeEffect);
    }
  }
}

// 找属性对应的effect 让其执行 (数组，对象)
export function trigger(target, type: TriggerOpTypes, key?, newValue?, oldValue?) {
  // 如果这个属性没有收集过effect 那不需要做任何操作
  const depsMap = targetMap.get(target);
  if (!depsMap) return;

  // 将所有要执行的effect 全部存到一个新的集合中，最终一起执行
  const effects = new Set();
  const add = effectsToAdd => {
    if (effectsToAdd) {
      effectsToAdd.forEach(effect => {
        effects.add(effect);
      });
    }
  }

  //  1. 看修改的是不是数组的长度 因为该长度影响比较大
  if (key === 'length' && isArray(target)) {
    depsMap.forEach((dep, key) => {
      // 如果对应的长度 有依赖收集需要更新
      if (key === 'length' || (isIntegerKey(key) && key > newValue)) { // 如果更改的长度小于收集的索引，那么这个索引也需要触发effect重新执行
        add(dep);
      }
    });
  } else {
    // 可能是对象
    if (key !== undefined) {
      add(depsMap.get(key));
    }
    // 如果修改数组中的某一个索引
    switch (type) {
      case TriggerOpTypes.ADD:
        if (isArray(target) && isIntegerKey(key)) {
          add(depsMap.get('length'));
        }
    }
  }

  effects.forEach((effect: any) => {
    if (effect.options.scheduler) {
      return effect.options.scheduler();
    }
    effect();
  });
}