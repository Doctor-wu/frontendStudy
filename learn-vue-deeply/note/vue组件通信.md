## Vue组件通信

- props
- vuex
- eventbus
- $ref

### 自定义事件

在写一些通用组件时不方便使用vuex(侵入性太强)，就需要使用vue自带的组建通信方式

- #### 边界情况

  - $parent

    ```javascript
    this.$bus.emit, this.$bus.on
    // 如果是兄弟组件则可以用$parent替代
    this.$parent.emit, this.$parent.on
    // 效果一样
    ```

  - $children

  - $root

  - $refs

  - provide/inject

    能够实现祖先和后代传值

    ```javascript
    // parent  
    provide(){   // 提供
        return {
            foo: "foo"
        }
    }

    // child
    inject: ["foo"] // 注入
    inject: {
        bar: { // 防止重名
            from: "foo"
        }
    }

    // 该方法传递的值不是响应式的
    ```



- #### 非prop特性

  - $attrs

    包含了父作用域中不作为prop被识别(且获取)的特性绑定(class和style除外)。当一个组件没有声明任何prop时，这里会包含所有父级作用域的绑定(class和style除外)，并且可以通过v-bind="$attrs"传入内部组件--在创建高级别的组件时非常有用。

  - $listeners

    类似attrs，父组件给子组件绑定事件后(<child @click="xxx">xx</child>), 子组件内可以通过$listeners访问父级的回调函数，子组件可以直接 v-on="$listeners"，$listeners会被展开并监听。**主要用途是子组件里可以用到父组件的methods**
