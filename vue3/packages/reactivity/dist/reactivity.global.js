var VueReactivity = (function (exports) {
  'use strict';

  var isObject = function (value) { return typeof value === 'object' && value !== null; };
  var extend = Object.assign;
  var isArray = Array.isArray;
  var isIntegerKey = function (key) {
      if (typeof key === 'symbol')
          return false;
      return String(parseInt(key + '')) === key;
  };
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var hasOwn = function (target, key) { return hasOwnProperty.call(target, key); };
  var hasChanged = function (oldValue, value) { return oldValue !== value; };

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
  // 找属性对应的effect 让其执行 (数组，对象)
  function trigger(target, type, key, newValue, oldValue) {
      // 如果这个属性没有收集过effect 那不需要做任何操作
      var depsMap = targetMap.get(target);
      if (!depsMap)
          return;
      // 将所有要执行的effect 全部存到一个新的集合中，最终一起执行
      var effects = new Set();
      var add = function (effectsToAdd) {
          if (effectsToAdd) {
              effectsToAdd.forEach(function (effect) {
                  effects.add(effect);
              });
          }
      };
      //  1. 看修改的是不是数组的长度 因为该长度影响比较大
      if (key === 'length' && isArray(target)) {
          depsMap.forEach(function (dep, key) {
              // 如果对应的长度 有依赖收集需要更新
              if (key === 'length' || (isIntegerKey(key) && key > newValue)) { // 如果更改的长度小于收集的索引，那么这个索引也需要触发effect重新执行
                  add(dep);
              }
          });
      }
      else {
          // 可能是对象
          if (key !== undefined) {
              add(depsMap.get(key));
          }
          // 如果修改数组中的某一个索引
          switch (type) {
              case 0 /* ADD */:
                  if (isArray(target) && isIntegerKey(key)) {
                      add(depsMap.get('length'));
                  }
          }
      }
      effects.forEach(function (effect) { return effect(); });
  }

  function createGetter(isReadonly, shallow) {
      if (isReadonly === void 0) { isReadonly = false; }
      if (shallow === void 0) { shallow = false; }
      return function get(target, key, receiver) {
          var res = Reflect.get(target, key, receiver);
          if (!isReadonly) {
              // 不是仅读的，就收集依赖，数据改变后更新对应的视图
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
          var oldValue = Reflect.get(target, key, receiver);
          // 判断对象中是否已经存在对应的key
          var hasKey = isArray(target)
              && isIntegerKey(key)
              ? Number(key) < target.length
              : hasOwn(target, key);
          var result = Reflect.set(target, key, value, receiver);
          if (!hasKey) {
              // 新增的值
              trigger(target, 0 /* ADD */, key, value);
          }
          else if (hasChanged(oldValue, value)) {
              // 修改的值
              trigger(target, 1 /* SET */, key, value);
          }
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

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}));
//# sourceMappingURL=reactivity.global.js.map
