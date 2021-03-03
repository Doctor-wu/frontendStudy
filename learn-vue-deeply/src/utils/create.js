import Vue from "vue";

function create(Component, config) {
  // 获取构造函数

  // 1. Vue.extend
  const Ctor = Vue.extend(Component); // 通过Vue.extend获得通过组件配置构造的组件的构造函数
  const comp = new Ctor({
    propsData: config,
  }).$mount(); // 获取组件实

  document.body.appendChild(comp.$el);

  comp.remove = function() {
    document.body.removeChild(comp.$el);
    comp.$destroy();
  };

  // 2. render
  // const vm = new Vue({
  //     // h是createElement，返回VNode
  //     // 需要挂载才能生成真实dom
  //     render: h => h(Component, {
  //         props: config
  //     })
  // }).$mount(); // 不指定宿主元素，则会创建真实dom，但不会有追加挂载操作

  // // 获取真实dom
  // document.body.appendChild(vm.$el);

  // const comp = vm.$children[0];

  // comp.remove = function () {
  //     document.body.removeChild(vm.$el);
  //     vm.$destroy();
  // }

  return comp;
}

export default create;
