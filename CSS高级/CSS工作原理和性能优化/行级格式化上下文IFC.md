## 行级格式化上下文IFC

IFC叫做内联格式化上下文

内部的元素从包含块的顶部开始排列，从左到右排列成一行形成的一个矩形盒子叫做line-box；



### IFC的布局规则

盒子是水平一个接着一个的排列，水平的margin，内边距，边框是可以有的。

垂直方向上的对齐可能是顶部对齐，底部对齐也可能是**基线对齐(默认)**；

行框中的内联盒子的高度小于行框高度时，内敛盒子的垂直方向的对齐方式取决于vertical-align属性。

当一个行框水平不能容纳内联盒子时，他们会在垂直方向上产生多个行框，他们上下一个挨着一个，但是不会重叠。

一般来说，行框的左边界紧挨着包含容器的左边界，行框的右边界紧挨着包含容器的右边界。然而，浮动盒子可能存在于包含边框边界和行框边界之间。



### IFC的作用

水平居中: 当一个块要在环境中水平居中的时候，设置其为inline-block则会在外层产生IFC，通过text-align: center则可以使其水平居中。

垂直居中：创建一个IFC，用其中一个元素撑开父元素高度，然后设置其vertical-align: middle，其他行内元素可以在此父元素下垂直居中。