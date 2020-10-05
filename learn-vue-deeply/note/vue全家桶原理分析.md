## Vue全家桶原理分析



### vue-router源码实现

#### 需求分析

- 作为一个插件存在:实现VueRouter类和install方法
- 实现两个全局组件:router-view用于显示匹配组件内容,router-link用于跳转
- 监控url变化:监听hashchange或popstate事件
- 响应最新url:创建一个响应式的属性current,当它改变时获取对应组件并显示
