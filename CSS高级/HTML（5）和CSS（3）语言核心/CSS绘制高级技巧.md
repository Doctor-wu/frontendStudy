## CSS绘制高级技巧

### linear-gradient线性渐变

linear-gradient（）函数用于创建一个表示两种或多种颜色线性渐变的图片

- background：linear-gradient(color1,color2,...)
- background：linear-gradient(direction, color1,color2,...)
- background：linear-gradient(angel, color1, color2, ...)



### radial-gradient径向渐变

radial-gradient()函数创建了一个图片，其由一个从原点辐射开的在两个或多个颜色之间的渐变组成

- background：radial-gradient(#e66465, #9198e5, ...);
- background：radial-gradient(closest-side, color1, color2, ...)
- background：radial-gradient(circle at 100%, color1 xx%, color2 xx%, ...)
- background： radial-gradient(ellipse at top, color1, transparent), radial-gradient(ellipse at bottom, color, transparent);



### background-size背景尺寸

检索或设置对象的背景图的尺寸大小

该属性提供2个参数值（特性值cover和contain除外）

如果提供两个，第一个用于定义背景图像的宽度，第二个用于定义背景图像的高度

如果只提供一个，该值用于定义背景图像的宽度，第2个值默认为auto，即高度为auto，此时背景图以提供的宽度作为参照来进行等比缩放

取值情况：length，percentage，auto， cover，contain



### background-origin背景参考原点

设置或检索对象的背景图像计算background-position时的参考原点（位置）

padding-box：从padding区域（含padding）开始显示背景图像

border-box：从border区域（含border开始显示背景图像）

content-box：从content区域开始显示背景图像



### background-clip背景裁剪

指定对象的背景图像向外裁剪的区域

padding-box：从padding区域（不含padding）开始向外裁剪背景

border-box：从border区域（不含border开始向外裁剪背景）

content-box：从content区域开始向外裁剪背景



### border-radius圆角

设置或检索对象使用圆角边框

提供2个参数，2个参数以“/”分割，每个参数允许设置1~4个参数值，第一个参数表示水平半径，第二个参数表示垂直半径，如果第二个参数省略，则默认等于第一个参数

水平半径：如果提供全部四个参数值，将按上左top-left，上右top-right， 下右bottom-right， 下左bottom-left的顺序作用于四个角

垂直半径：遵循以上四点

四个值：第一个值为左上角，第二个值为右上角，第三个值为右下角，第四个值为左下角

三个值：第一个值为左上角，第二个值为右上角和左下角，第三个值为右下角

两个值：第一个值为左上角和右下角，第二个值为右上角和左下角

一个值：四个圆角值相同



### box-shadow盒子阴影

设置或检索对象阴影（不占容器大小）

none：无阴影

length ①：第一个长度值用来设置对象的阴影水平偏移值。可以为负值（一定要设置可以设置为0）

length ②：第二个长度值用来设置对象的阴影垂直偏移值。可以为负值（一定要设置可以设置为0）

length ③：如果提供了第三个长度值则用来设置对象的阴影模糊值。不允许为负值

length ④：如果提供了第四个长度值则用来设置对象的阴影外延值。可以为负值

color：设置对象的阴影的颜色

inset：设置对象的阴影类型为内阴影。该值为空时，则对象的阴影类型为外阴影。