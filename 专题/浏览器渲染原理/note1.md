# 浏览器渲染原理

本质上，浏览器是方便一般互联网用户通过界面解析和发送HTTP协议的软件



## 浏览器内核知识



### 浏览器内核定义

我们可以初步认为浏览器中**负责将表示页面的字符转换成可视化图像的模块**就是**浏览器内核**



### 网页内容的组成

- doctype：提供浏览器HTML版本信息，告诉浏览器用什么版本的协议解析
- head: HTML头部
  - meta：元数据信息
    - charset:  此特性声明当前文档所使用的字符编码
    - http-equiv: 客户端行为，如渲染模式，缓存等
    - name[keywords]: 搜索引擎使用
    - name[description]: 搜索引擎使用
    - name[viewport]: **浏览器视口设置**
  - link
  - script：需要在body前完成加载或运行的脚本
- body: HTML实体
  - script：需要在body解析时加载或运行的脚本

![](./browserRender1.png)



#### 重要组件

- HTML解释器：解释HTML文本的解释器。HTML文本 -> DOM树
- CSS解释器：遇到级联样式表时，需要使用级联样式表解释器。为DOM对象计算出样式信息
- JavaScript引擎：遇到JS代码时，需要使用JavaScript解释器，并使得JS代码有调用DOM接口和CSSOM的能力
- 布局：结合CSS，计算出每个DOM对象的大小位置信息
- 绘图：将经过布局计算的DOM节点绘制成图像











