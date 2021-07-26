var VueRuntimeDOM = (function (exports) {
  'use strict';

  var isObject = function (value) { return typeof value === 'object' && value !== null; };
  var extend = Object.assign;
  var isArray = Array.isArray;
  var isString = function (value) { return typeof value === 'string'; };
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var hasOwn = function (target, key) { return hasOwnProperty.call(target, key); };

  // createVNode 创建虚拟节点
  // h方法和createAPp类似
  var createVNode = function (type, props, children) {
      // 可以根据type 来区分是组件还是普通的元素
      if (children === void 0) { children = null; }
      var shapeFlag = isString(type) ?
          1 /* ELEMENT */ : isObject(type) ?
          4 /* STATEFUL_COMPONENT */ : 0;
      var vnode = {
          __v_isVnode: true,
          type: type,
          props: props,
          children: children,
          component: null,
          key: props && props.key,
          el: null,
          shapeFlag: shapeFlag,
      };
      normailizeChildren(vnode, children);
      return vnode;
  };
  function normailizeChildren(vnode, children) {
      var type = 0;
      if (children == null) ;
      else if (isArray(children)) {
          type = 16 /* ARRAY_CHILDREN */;
      }
      else {
          type = 8 /* TEXT_CHILDREN */;
      }
      vnode.shapeFlag |= type;
  }

  function createAppAPI(render) {
      return function (rootComponent, rootProps) {
          var app = {
              _props: rootProps,
              _component: rootComponent,
              _cantainer: null,
              mount: function (container) {
                  // let vnode = {};
                  // render(vnode, container);
                  // console.log(container, rootComponent, rootProps, rendererOptions);
                  // 1.根据组件配置创建虚拟节点
                  // 2.将虚拟节点和容器获取到后调用render方法进行渲染
                  // 创造虚拟节点
                  var vnode = createVNode(rootComponent, rootProps);
                  // 调用render
                  render(vnode, container);
                  app._cantainer = container;
              }
          };
          return app;
      };
  }

  var PublicInstanceProxyHandlers = {
      get: function (_a, key) {
          var instance = _a._;
          // 取值时 要访问 setupState Props data
          var setupState = instance.setupState, props = instance.props, data = instance.data;
          if (key[0] === '$') {
              return;
          }
          if (hasOwn(setupState, key)) {
              return setupState[key];
          }
          else if (hasOwn(props, key)) {
              return props[key];
          }
          else if (hasOwn(data, key)) {
              return data[key];
          }
          return undefined;
      },
      set: function (_a, key, value) {
          var instance = _a._;
          var setupState = instance.setupState, props = instance.props, data = instance.data;
          if (hasOwn(setupState, key)) {
              setupState[key] = value;
          }
          else if (hasOwn(props, key)) {
              props[key] = value;
          }
          else if (hasOwn(data, key)) {
              data[key] = value;
          }
          return true;
      }
  };

  // 组件所有的方法
  function createComponentInstance(vnode) {
      // webcomponent 组件需要有“属性” “插槽”
      var instance = {
          vnode: vnode,
          type: vnode.type,
          props: {},
          attrs: {},
          slots: {},
          ctx: {},
          data: {},
          setupState: {},
          isMounted: false,
      };
      instance.ctx = { _: instance };
      return instance;
  }
  function setupComponent(instance) {
      var _a = instance.vnode, props = _a.props, children = _a.children;
      // 根据props 解析出 props 和 attrs ， 将其放到instance上
      instance.props = props; // initProps()
      instance.children = children; // initSlot()
      // 需要先看下 当前组件是不是有状态的组件
      var isStateful = instance.vnode.shapeFlag & 4 /* STATEFUL_COMPONENT */;
      if (isStateful) { // 表示现在是一个带状态的组件
          // 调用当前实例的setup方法，用setup的返回值 填充 setupState和对应的render方法
          setupStatefulComponent(instance);
      }
  }
  function setupStatefulComponent(instance) {
      // 代理  传递给render函数的参数
      instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
      // 获取组件的类型 拿到组件的setup方法
      var Component = instance.type;
      var setup = Component.setup;
      var setupContext = createSetupContext(instance);
      // 有可能没有setup 没有render
      instance.setupState = setup(instance.props, setupContext); // instance 中的props attrs slots emit expose 会被提取出来
      Component.render(instance.proxy);
  }
  function createSetupContext(instance) {
      return {
          attrs: instance.attrs,
          props: instance.props,
          slots: instance.slots,
          emit: function () { },
          expose: function () { },
      };
  }

  function createRenderer(rendererOptions) {
      var mountComponent = function (initialVNode, container) {
          // 组件的渲染流程  最核心就是调用setup拿到返回值， 获取render函数返回的结果来进行渲染
          // 1. 先有实例
          var instance = (initialVNode.component = createComponentInstance(initialVNode));
          // 2. 需要的数据解析到实例上
          setupComponent(instance);
      };
      var processComponent = function (n1, n2, container) {
          if (n1 == null) {
              // 初始化流程
              mountComponent(n2);
          }
      };
      var patch = function (n1, n2, container) {
          // 针对不同类型 做初始化操作
          var shapeFlag = n2.shapeFlag;
          if (shapeFlag & 1 /* ELEMENT */) {
              console.log('元素');
          }
          else if (shapeFlag & 4 /* STATEFUL_COMPONENT */) {
              processComponent(n1, n2);
          }
      };
      var render = function (vnode, container) {
          // core 核心函数; 根据不同的虚拟节点创建对应的真实元素
          // 默认调用render 可能是初始化流程
          patch(null, vnode);
      };
      return {
          createApp: createAppAPI(render),
      };
  }
  // createRenderer 目的是创建一个渲染器
  // 框架都是将组件转换成 虚拟DOM -> 虚拟DOM生成真是DOM挂载到真实页面上

  // 节点操作
  var nodeOps = {
      // 元素操作
      createElement: function (tagName) { return document.createElement(tagName); },
      remove: function (child) {
          var parent = child.parentNode;
          if (parent) {
              parent.removeChild(child);
          }
      },
      insert: function (child, parent, anchor) {
          if (anchor === void 0) { anchor = null; }
          parent.insertBefore(child, anchor);
      },
      querySelector: function (selector) { return document.querySelector(selector); },
      setElementText: function (el, text) { return el.textContent = text; },
      // 文本操作
      createText: function (text) { return document.createTextNode(text); },
      setText: function (node, text) { return node.nodeValue = text; },
  };

  var patchAttr = function (el, key, value) {
      if (value == null) {
          el.removeAttribute(key);
      }
      else {
          el.setAttribute(key, value);
      }
  };

  var patchClass = function (el, value) {
      if (value == null) {
          value = '';
      }
      el.className = value;
  };

  var patchEvent = function (el, key, value) {
      // 对函数的缓存 
      var invokers = el.vei || (el.vei = {});
      var exists = invokers[key];
      if (exists && value) { // 需要绑定事件并且之前存在事件的情况下 去更新事件绑定
          exists.value = value;
      }
      else {
          var eventName = key.slice(2).toLowerCase();
          if (value) {
              var invoker = invokers[key] = createInvoker(value);
              el.addEventListener(eventName, invoker);
          }
          else {
              // 以前绑定了value 现在没有value
              // 移除事件
              el.removeEventListener(eventName, exists);
              invokers[key] = undefined;
          }
      }
  };
  function createInvoker(value) {
      var invoker = function (e) {
          invoker.value(e);
      };
      invoker.value = value; // 为了能随时更改
      return invoker;
  }

  var patchStyle = function (el, prev, next) {
      var style = el.style; // 获取样式
      if (next == null) {
          el.removeAttribute('style');
      }
      else {
          // diff style 新加的要加上  新的没有的要去掉
          if (prev) {
              for (var key in prev) {
                  if (next[key] == null) { // 老的有 新的没有  要去掉
                      style[key] = '';
                  }
              }
          }
          for (var key in next) {
              style[key] = next[key];
          }
      }
  };

  // 针对属性操作
  var isEvent = function (key) { return /^on[^a-z]/.test(key); };
  var patchProp = function (el, key, preValue, nextValue) {
      switch (key) {
          case 'class':
              patchClass(el, nextValue);
              break;
          case 'style':
              patchStyle(el, preValue, nextValue);
              break;
          default:
              // 如果不是事件 才是属性
              if (isEvent(key)) {
                  patchEvent(el, key, nextValue);
              }
              else {
                  patchAttr(el, key, nextValue);
              }
      }
  };

  // runtime-dom 核心就是 提供domAPI方法
  // 节点操作就是增删改查
  // 属性操作 添加 删除 更新 (样式，类，事件，其他属性)
  // 渲染时用到的所有方法
  extend({ patchProp: patchProp }, nodeOps);
  // vue中 runtime-core 提供了核心的方法 来处理渲染 他会使用runtime-dom中的api进行渲染
  function createApp(rootComponent, rootProps) {
      if (rootProps === void 0) { rootProps = null; }
      var app = createRenderer().createApp(rootComponent, rootProps);
      var mount = app.mount;
      app.mount = function (container) {
          // 清空容器的操作
          container = nodeOps.querySelector(container);
          container.innerHTML = '';
          mount(container);
          // 将组件渲染成dom元素 进行挂载
      };
      return app;
  }
  // 用户调用的是runtime-dom -> runtime-core
  // runtime-dom 是为了解决平台差异的 (浏览器差异)

  exports.createApp = createApp;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}));
//# sourceMappingURL=runtime-dom.global.js.map
