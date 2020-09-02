## steps功能符深入理解

逐帧动画，资源较大，使用steps()

### steps()语法

贝塞尔曲线

linear，ease...

**steps**(number, position)  number表示把一帧动画分成了几段，position表示动画是从时间段的开头连续还是末尾连续，支持start和and两个关键字，默认是end

start 会忽略开始帧

end 会忽略结束帧



steps(1) 可以用来做逐帧动画，1帧只显示一张图片

