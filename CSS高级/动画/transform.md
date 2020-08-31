## transform详解



### translate位移

translate(): 指定对象的2D translation。第一个参数对应x轴，第二个参数对应y轴。如果第二个参数未提供，则默认值为0



### rotate旋转

rotate()：指定对象的2D rotation，首先需要有transform属性的的定义；表示旋转一定的角度



### scale缩放

scale()：指定对象的2D scale。 第一个参数对应X轴，第二个参数对应Y轴。如果第二个参数为空，则默认取第一个参数



### transform-origin元素变换基点

设置或检索对象以某个原点进行转换。该属性提供两个参数值；

如果提供两个，则对应X，Y轴

如果只提供第一个参数，则用于X轴，Y轴取50%；

默认值：50% 50%

**可取值**

percentage 百分比指定坐标值。可以为负值

length 用长度指定坐标值。可以为负值

left 指定原点的横坐标为left

center 指定原点的横坐标为center

right 指定原点的横坐标为right

top 指定原点的纵坐标为top

center② 指定原点的纵坐标为center

bottom 指定原点的纵坐标为bottom



### transform-3D

3D变化：在3D空间中进行变换

3D卡片，3D相册...









