// 组件所有的方法

import { ShapeFlags } from "@vue/shared";
import { PublicInstanceProxyHandlers } from "./componentPublicInstance";

export function createComponentInstance(vnode) {

  // webcomponent 组件需要有“属性” “插槽”
  const instance = { // 组件的实例
    vnode,
    type: vnode.type,
    props: {},
    attrs: {},
    slots: {},
    ctx: {},
    data: {},
    setupState: {}, // 如果setup返回一个对象，这个对象会作为setupstate
    isMounted: false,
  };
  instance.ctx = { _: instance };

  return instance;
}

export function setupComponent(instance) {
  const { props, children } = instance.vnode;

  // 根据props 解析出 props 和 attrs ， 将其放到instance上
  instance.props = props; // initProps()
  instance.children = children; // initSlot()

  // 需要先看下 当前组件是不是有状态的组件
  let isStateful = instance.vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT;

  if (isStateful) { // 表示现在是一个带状态的组件
    // 调用当前实例的setup方法，用setup的返回值 填充 setupState和对应的render方法

    setupStatefulComponent(instance);
  }
}

function setupStatefulComponent(instance) {
  // 代理  传递给render函数的参数
  instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);

  // 获取组件的类型 拿到组件的setup方法
  let Component = instance.type;
  let { setup } = Component;
  let setupContext = createSetupContext(instance);

  // 有可能没有setup 没有render
  instance.setupState = setup(instance.props, setupContext); // instance 中的props attrs slots emit expose 会被提取出来
  Component.render(instance.proxy);
}

function createSetupContext(instance) {
  return {
    attrs: instance.attrs,
    props: instance.props,
    slots: instance.slots,
    emit: () => { },
    expose: () => { },
  }
}