import { TrackOpTypes } from "./operators";

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