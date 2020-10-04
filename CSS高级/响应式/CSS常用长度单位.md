## CSS常用长度单位

### px

固定单位，写死，常用于PC单位

### em

1em = 父元素字体大小

### %

相对单位 相对于父元素的大小

### rem

相对单位 root element font-size

```css
html{
    /* 默认 1rem = 16px */
    /* font-size: 16px; */
    /* 为了方便计算，会把根元素的font-size设置为100px */
    font-size: 100px;
    /*
    	两种方法实现rem
    	1. 媒体查询
    	2. js计算clientWidth
    */
}


/* 
	750设计稿    100px
	320          对应            42.667px；

	750设计稿    100px
	375          对应            50px；

	750设计稿    100px
	414          对应            55.2px；
*/
```





### vw,vh

相对单位 view width 视口宽度

相对单位 view height 视口高度

将视口平分为100等分