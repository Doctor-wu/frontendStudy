## CSS选择器



### 基本选择器

### 层次选择器

### 伪类选择器

#### 动态伪类选择器

#### 目标伪类选择器

#### 语言伪类选择器

#### UI元素状态伪类选择器

#### 结构伪类选择器

#### 否定伪类选择器

### 伪元素

### 属性选择器



### CSS选择器权重和优先级

### CSS三大特性

#### 继承性

#### 优先级

##### *优先级的等级*

- 0级（0）：通配选择器（*），选择符(+，>，~，空格 ，||)
- 1级（1）：元素，关系，伪元素
- 2级（10）：类选择器，属性选择器，伪类
- 3级（100）：ID选择器
- 4级（1000）：style内联选择器
- 5级（10000）：!important



##### *优先级的计算规则*

权重顺序：!important > 行内样式 > id选择器 > 类选择器 > 标签选择器 > 通配符 > 继承 > 浏览器默认



##### *选择器权重*

!important 优先级最高

元素属性 优先级高

相同权重 后写的生效



#### 层叠性



### CSS选择器命名

- 驼峰命名法

- 帕斯卡命名法

  和驼峰命名法的区别就是首字母也大写

- 匈牙利命名法（下划线分割）

- BEM命名法

  B(block)E(element)M(modifier)

  block代表了跟高级别的抽象或组件

  block__element 代表.block的后代，用于形成一个完整的.block整体

  block--modifier 代表.block的不同状态或不同版本，用于修饰

  air-table{} 块

  air-table__footer{}  元素

  air-table--full 修饰符

### CSS中选择器中的正则表达式

选择器与JS相同

#### CSS属性选择器版本

- CSS2.1属性选择器

  直接匹配：

  ***[attr]***	只要有attr这个属性就可以匹配上

  ***[attr = "val"]***	除了要有属性名而且值要想等

  ***[attr ~= "val"]***	有这个属性并且属性名里含有这个单词就行

  ***[attr |= "val"]***	有这个属性且属性值开头必须是val这个**单词**或开头是val-的**单词**

  ​	attr = bar  √

  ​	attr = bar-val √

  ​	attr = barval ×

  ​	attr = bar val ×

- CSS3属性选择器

  正则匹配：

  ***[ attr ^= 'val' ]***

  以val开头就行

  ***[ attr $= 'val' ]***

  以val结尾

  ***[ attr *= 'val' ]***

  出现过val就可以

- CSS4属性选择器

  ***[ attr = 'val' i ]***

  忽略大小写匹配，兼容性不太好

### AMCSS开发模式简介

Attribute Modules for CSS，借助HTML属性来进行CSS相关开发

优点：每个属性有效的声明一个单独的命名空间，用于封装样式信息，从而产生更易于阅读和维护的HTML和CSS；

```html
/* 传统类名写法 */
<div class="button button-large button-blue">Button</div>

.button{...}
.button-large{...}
.button-blue{...}

/* AMCSS写法 */
<div button="large blue">Button</div>
<div am-button=:"large blue">Button</div>(避免属性名称冲突)
[am-button]{...}
[am-button~="large"]{...}
[am-button~="blue"]{...}
```















