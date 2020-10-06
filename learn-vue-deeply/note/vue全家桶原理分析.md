## Vue全家桶原理分析



### vue-router源码实现

#### 需求分析

- 作为一个插件存在:实现VueRouter类和install方法
- 实现两个全局组件:router-view用于显示匹配组件内容,router-link用于跳转
- 监控url变化:监听hashchange或popstate事件
- 响应最新url:创建一个响应式的属性current,当它改变时获取对应组件并显示



### vuex原理解析

#### 任务分析

**实现一个插件:声明Store类,挂载$store**
Store具体实现:

- 创建响应式的state,保存mutations、actions和getters
- 实现commit根据用户传入type执行对应mutation
- 实现dispatch根据用户传入type执行对应action,同时传递上下文
- 实现getters,按照getters定义对state做派生