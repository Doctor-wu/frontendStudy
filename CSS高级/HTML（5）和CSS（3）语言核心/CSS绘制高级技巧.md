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