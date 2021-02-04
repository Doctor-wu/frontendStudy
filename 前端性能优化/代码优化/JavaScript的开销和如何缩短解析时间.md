## JavaScript的开销和如何缩短解析时间



### JavaScript开销在哪里

- 加载
- 解析&编译
- 执行



### 如何缩短解析时间

- Code splitting代码拆分，按需加载
- Tree shaking 代码减重



### 减少主线程工作量

- 避免长任务
- 避免超过1 KB的行间脚本
- 使用rAF和rIC进行时间调度



### Progressive Bootstrapping

- 可见不可交互vs最小可交互资源集