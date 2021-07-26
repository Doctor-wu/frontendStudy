// runtime-dom 核心就是 提供domAPI方法
// 操作节点，操作属性的更新

import { createRenderer } from "@vue/runtime-core";
import { extend } from "@vue/shared";
import { nodeOps } from "./nodeOps";
import { patchProp } from "./patchProp";

// 节点操作就是增删改查
// 属性操作 添加 删除 更新 (样式，类，事件，其他属性)

// 渲染时用到的所有方法
const rendererOptions = extend({ patchProp }, nodeOps);

// vue中 runtime-core 提供了核心的方法 来处理渲染 他会使用runtime-dom中的api进行渲染
export function createApp(rootComponent, rootProps = null) {
  const app: any = createRenderer(rendererOptions).createApp(rootComponent, rootProps);
  let { mount } = app;
  app.mount = function (container) {
    // 清空容器的操作
    container = nodeOps.querySelector(container);
    container.innerHTML = '';
    mount(container);
    // 将组件渲染成dom元素 进行挂载
  }
  return app;
}

// 用户调用的是runtime-dom -> runtime-core
// runtime-dom 是为了解决平台差异的 (浏览器差异)