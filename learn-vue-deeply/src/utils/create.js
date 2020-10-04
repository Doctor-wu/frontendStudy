import Vue from 'vue';

function create(Component, config) {
    const vm = new Vue({
        // h是createElement，返回VNode
        // 需要挂载才能生成真实dom
        render: h => h(Component, {
            props: config
        })
    }).$mount(); // 不指定宿主元素，则会创建真实dom，但不会有追加挂载操作

    // 获取真实dom
    document.body.appendChild(vm.$el);

    const comp = vm.$children[0];

    comp.remove = function () {
        document.body.removeChild(vm.$el);
        vm.$destroy();
    }

    return comp;
}

export default create;