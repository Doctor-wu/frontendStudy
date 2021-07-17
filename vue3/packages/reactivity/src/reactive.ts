import { isObject } from "@vue/shared";
import { mutableHandlers, readonlyHandlers, shallowReactiveHandlers } from "./baseHandlers";

export function reactive(target) {
  return createReactiveObject(target, false, mutableHandlers);
};

export function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers);
};

export function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers);
};

export function shallowReadonly(target) {
  return createReactiveObject(target, true, shallowReactiveHandlers);
};

const reactiveMap = new WeakMap(); // 会自动垃圾回收，不会造成内存泄漏
const readonlyMap = new WeakMap();

export function createReactiveObject(target, isReadonly: boolean, baseHandlers) {
  // 如果目标不是对象，那就没法拦截
  if (!isObject(target)) {
    return target;
  }

  const proxyMap = isReadonly ? reactiveMap : readonlyMap;

  const exisitProxy = proxyMap.get(target);
  if (exisitProxy) return exisitProxy;

  const proxy = new Proxy(target, baseHandlers);
  proxyMap.set(target, proxy); // 将要代理的对象和对应的代理结果缓存起来

  return proxy;
};