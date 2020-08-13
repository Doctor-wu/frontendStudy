## HTML语义化--如何写出更优的html



### H4常用标签汇总

#### 基本文档

html, head, body...

#### 基本标签

h1~h6, p, br,  hr, \<!-- -->

#### 文本格式化

strong, b, em, i, small, strong, del, sub, sup ...

#### 链接

a, link

#### 图片

img, map, area

#### 区块

div,  span

#### 三大列表

ul li, ol li, dl dt dd

#### 表格

table, caption, th, tr, td, thead, tbody, tfoot

#### 框架

iframe

#### 表单

form, input, select option, textarea, button, label

#### 实体

&lt, &gt, &copy, &nbsp...



### H5常用标签

#### 图形新元素

canvas

#### 新多媒体元素

audio, video, source, embed, track

#### 新表单元素

deatalist, keygen, output

#### 新的语义和结构元素

article, aside, bdi, command, details, dialog, summary, figure,figcaption, footer, header, mark, meter, na, progress, ruby, rt, rp, section, time, wbr



### 什么叫语义化

指对文本内容的结构化（内容语义化），选择合乎语义的标签（代码语义化），便于开发者阅读，维护和写出更优雅的代码的同时，让浏览器的爬虫和辅助技术更好的解析。



**通俗理解：** 用正确的标签做正确的事



### 语义化的好处

- 利于SEO优化（也就是搜索引擎的抓取，搜索引擎的爬虫也依赖于标记来确定上下文和各个关键字的权重）
- 在样式丢失的时候，还是可以比较好的呈现效果
- 更好的支持各种终端
- 利于团队的开发和维护，W3C给我们定了一个标准，如果团队中都遵循这个标准，那么代码的差异就会缩小，在开发和维护的时候就可以提高效率

### 如何写出更优的html

- **结构搭建上**

  采用HTML5标准时开头应该加上<!DOCTYPE html>

  

  应该在head标签中引入CSS文件，这样浏览器可以在输出HTML之前获取CSS信息

  
  
  在body标签的末尾引入JS文件，这样可以在页面显示之后再编译JS文件，以加快页面读取速度，同时有助于JS对页面中的元素进行操作
  
  
  
  对元素的操作应该添加在JS代码中，而不要在html中添加，后期难以维护



- **代码校验**

  在项目中加入校验过程，在代码编辑器中使用HTMLHint这类的代码校验插件，也可以在build的时候使用HTMLHint with Grunt这类校验工具

  

  尽量采用HTML5标准

  

  确保正确的HTML层级：嵌套元素时确保元素首尾完整

  
  
  在所有不能自动结束的元素末尾添加结束标签
  
  
  
  li结束标签不是必须的，所以有些热嗯认为可以不写li，这可以接受，但是ul和ol标签一定要加
  
  video和audio元素必须要有结束标签



- **良好的代码排版**

  在项目中保持统一风格的HTML代码

  

  使用代码编辑器帮助排版

  

  在HTML中使用缩进来分层更易于阅读

  
  
  用更直接易读的放视写HTML代码，主义标签的相互嵌套关系
  
  
  
  元素要按常规放置，比如footer元素最好放在HTML页面的底部
  
  
  
  同一所有的引号使用规则



- **语义化设计**

  标题使用h1~h3  列表使用ul或ol

  

  在适当的地方使用HTML5的标签

  

  正文中的文本内容使用p标签，内容的结构化可以使用HTML5的新元素或div

  

  修改文字样式时，em和strong比i和b要更好，因为前者语义化更好

  

  form中要包含label元素，input要有type和placeholder以及其他必要属性

  

  尽量减少使用无意义标签，例如span和div
  
  
  
  尽量不使用标签本身的css属性，例如b, font, s等标签，如果需要这些样式，那么使用css样式来添加
  
  
  
  在需要强调的部分使用strong，em，但是尽量使用css样式来描述
  
  
  
  使用表格时，标题用caption，表头用thead，主体部分用tbody包裹，尾部用tfoot包围。表头和一般单元格要区分开，表头用th，单元格用td
  
  
  
  列表搭建时，使用ul无序列表和ol有序列表来定义列表
  
  
  
  每个input标签对应的说明文本和对应的input的关联起来，或者直接在label中嵌套控件



- **布局规范**

  p标签用来放文字而不是用来布局。在浏览器自身的样式中默认p有margin和其他样式

  

  想实现换行可以使用block元素或者css的display属性，尽量避免使用br来换行，文字内容中的换行可以用br，但通常也很少这样用

  

  不要滥用div，w3c对div的描述是：当没有其他元素可用的时候才能使用div，如果想让link和img这类元素能够在结尾换行，可以在样式中添加display：block，这样要比把他们放进div或者使用br来换行要好很多

  

  必须知道哪些是块级元素，这样就可以避免把块级元素放到div里面，比如列表就不需要放到div里

  
  
  table是用来放表格数据的不是用来布局的
  
  
  
  Flex box越来越流行，学一学没有坏处
  
  
  
  盒子模型一定要掌握，必须知道什么时候用padding，什么时候用margin
  
  
  
  使用margin的规则：通常情况下，margin都是添加在元素的bottom和right，有时也可以是top和left。无论如何，尽量避免同时在bottom和top，或者right和left添加margin，可以用last-of-type选择器来去掉最后一个子元素的margin



- **标签嵌套的规范**

  块级元素可以包含内联元素或某些块元素，但内联元素不能包含块元素，它只能包含其它的内联元素

  块级元素不能放在p标签里（p标签里应该放文字）

  有几个特殊的块级元素只能包含内联元素不能再包含块级元素：h1~h6, p, dt

  ul,li/ol,li/dl,dt,dd拥有父子级关系，ul,ol下都只能跟li，dl下只能跟dt,dd

  a标签不能嵌套a标签



- **网站代码优化**

  要多为用户考虑，不同的设备条件，使用环境以及输入法等都会给你的HTML带来不同的体验

  网页的title, keywords, description一定要写，要精简全面

  网页使用语义化代码

  a标签要设置title属性；外部链接还要设置rel属性--rel="nofollow"，nofollow值会使得网络爬虫不顺着链接爬出

  所有的标题建议使用h1标签，样式可以用css设置

  br标签只能用于文本的换行

  table一定要使用caption设置表格题目

  strong用来设置重标，em设置斜体

  img标签一定要设置其alt属性
