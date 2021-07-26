import { createVNode } from "./vnode";

export function createAppAPI(render) {
  return function(rootComponent, rootProps) {
    const app = {
      _props: rootProps,
      _component: rootComponent,
      _cantainer: null,
      mount(container) {
        // let vnode = {};
        // render(vnode, container);
        // console.log(container, rootComponent, rootProps, rendererOptions);

        // 1.根据组件配置创建虚拟节点
        // 2.将虚拟节点和容器获取到后调用render方法进行渲染

        // 创造虚拟节点
        const vnode = createVNode(rootComponent, rootProps);
        // 调用render
        render(vnode, container);


        app._cantainer = container;
      }
    }
    return app;
  }
}