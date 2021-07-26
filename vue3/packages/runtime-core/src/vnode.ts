// createVNode 创建虚拟节点

import { isArray, isObject, isString, ShapeFlags } from "@vue/shared";

// h方法和createAPp类似
export const createVNode = (type, props, children = null) => {
  // 可以根据type 来区分是组件还是普通的元素

  const shapeFlag = isString(type) ?
    ShapeFlags.ELEMENT : isObject(type) ?
      ShapeFlags.STATEFUL_COMPONENT : 0

  const vnode = { // 一个对象来描述对应的内容，虚拟节点有跨平台的能力
    __v_isVnode: true,
    type,
    props,
    children,
    component: null,
    key: props && props.key, // diff 算法会用到key
    el: null, // 稍后会将虚拟节点和真实节点对应起来
    shapeFlag, // 判断出自己的类型和儿子的类型
  }
  normailizeChildren(vnode, children);
  return vnode;
}

function normailizeChildren(vnode, children) {
  let type = 0;
  if (children == null) { // 不对儿子进行处理
    
  } else if (isArray(children)) {
    type = ShapeFlags.ARRAY_CHILDREN;
  } else {
    type = ShapeFlags.TEXT_CHILDREN;
  }

  vnode.shapeFlag |= type;
}