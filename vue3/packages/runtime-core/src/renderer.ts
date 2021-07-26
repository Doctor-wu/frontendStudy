import { ShapeFlags } from "@vue/shared";
import { createAppAPI } from "./apiCreateApp"
import { createComponentInstance, setupComponent } from "./component";

export function createRenderer(rendererOptions) {

  const setupRenderEffect = () => {
    
  }

  const mountComponent = (initialVNode, container) => {
    // 组件的渲染流程  最核心就是调用setup拿到返回值， 获取render函数返回的结果来进行渲染
    // 1. 先有实例
    const instance = (initialVNode.component = createComponentInstance(initialVNode));
    // 2. 需要的数据解析到实例上
    setupComponent(instance);
    // 3. 创建一个effect 让render执行
    setupRenderEffect()
  }

  const processComponent = (n1, n2, container) => {
    if (n1 == null) {
      // 初始化流程
      mountComponent(n2, container);
    } else {
      // 组件更新
    }
  }

  const patch = (n1, n2, container) => {
    // 针对不同类型 做初始化操作
    const { shapeFlag } = n2;
    if (shapeFlag & ShapeFlags.ELEMENT) {
      console.log('元素');
    } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
      processComponent(n1, n2, container);
    }
  }

  const render = (vnode, container) => {
    // core 核心函数; 根据不同的虚拟节点创建对应的真实元素

    // 默认调用render 可能是初始化流程
    patch(null, vnode, container);
  }
  return {
    createApp: createAppAPI(render),
  }
}

// createRenderer 目的是创建一个渲染器

// 框架都是将组件转换成 虚拟DOM -> 虚拟DOM生成真是DOM挂载到真实页面上