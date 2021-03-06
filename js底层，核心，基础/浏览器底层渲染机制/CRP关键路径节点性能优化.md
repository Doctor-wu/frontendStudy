##  CRP关键路径节点性能优化

**CRP(Critical Rendering path):浏览器关键节点优化**



**浏览器具体的解析过程： GUI渲染线程**

- 自上而下解析完所有HTML标签/各种节点后，DOM TREE就生成了

- 但是过程中会遇到一些比较特殊的

  - link href="xxx.css"

    浏览器会分配一个新的HTTP网络线程去加载资源文件

    不会阻碍DOM树的渲染

  - ```html
    <style>...</style>
    不用请求新的资源文件，但是此时样式还没有处理，浏览器会做一个记录
    他会等待所有的CSS资源加载回来之后，按照先后顺序依次渲染CSS从而生成CSSOM树
    否则会导致先写的网络加载回来的样式覆盖掉写在后面的样式

    @import 'xxx.css' 导入式,也是分配HTTP网络线程去加载文件，但此时GUI渲染线程会被阻塞
    ```

- 遇到script内嵌代码会立即执行JS，阻碍DOM TREE渲染

- 遇到script外链js代码的，也会阻碍DOMTREE渲染,同时会分配一个HTTP网络线程去加载资源文件,加载回来后立即执行JS,如果JS没有异步执行,直接获取DOM元素是获取不到的

- **什么情况下会引发回流**

  元素在视口中的大小或者方位发生变化

  元素的删除或者新增

  元素的display控制显示隐藏





### **性能优化**

- 内联样式表中不用@import；

- link放在文档前面(尽可能提前加载，这样等DOM树加载完，我们的资源可能也加载回来了) / 当代浏览器的功能愈发完善，像chrome有预解析会扫描节点中的link和src属性，找到外部资源后进行预加载；

- 如果样式代码比较少的情况下，尽可能使用内嵌式，可以减少HTTP请求，移动端开发内嵌优先；

- 如果使用link 尽可能将样式写进一个资源文件，这样可以减少http请求

- 减少DOM（利用伪元素），减少DOM的层级嵌套，以及标签语义化(当代前端开发，开始只是把首屏的结构/内容写出来；页面滚动时，再基于JS创建其他屏幕的结构和内容 => 骨架屏/SSR => 客户端骨架屏，开始首屏结构都没有，只有一个loading/占位图而已)

- 把script放到页面底部(先渲染DOM TREE,再执行JS,也可以获取到DOM元素了)

- async/defer 给script设置的属性

  async是开辟HTTP网络线程加载资源文件,此时DOM TREE渲染继续,但是资源一旦加载回来,停止DOM　TREE的渲染,先执行JS代码(不考虑引入顺序,谁现在回来先执行谁)

  defer也是开辟HTTP网络线程加载资源文件,DOM TREE也继续渲染,但是在DOM TREE构建完成前,资源以及加载回来了,也先不执行,等到DOM TREE构建完成后,按照声明顺序以此执行JS代码, **defer不兼容低版本浏览器**

- 图片合并(精灵图)/ base64(base64 会新增大概33%的图片文件体积)/svg(浏览器处理svg效率较低,不如png)

- 图片懒加载

- 回流和重绘的重要优化手段

  一旦回流，那么分层和重绘一定会发生，单纯的重绘不会影响回流，所以优化的重点在回流上

  - 操作DOM大小或位置这些会导致回流的属性时尽量写在一起，这样浏览器会对其进行相应的优化
  - box.style.xxx作为RHS 或者window.getComputedStyle(box).xxx或者 box.clientHeight|Width|Top|Left 或者 box.offsetHeight|Width|Top|Left 或者 box.scrollHeight|Width|Top|Left会刷新浏览器的渲染队列，会导致多次回流
  - **样式分离读写**：把修改样式和读取样式的操作分离开

- ....





**window.onload触发条件: **所有资源都加载完成(DOM TREE/CSS/图片等资源);

**DOMContentLoaded触发条件: **DOM TREE加载完成即可

正常情况下img加载会阻碍DOM TREE渲染,但是新浏览器有做处理

浏览器同一域名下HTTP线程一般只有6-7个
