## HTML及拓展

### DOCTYPE

文档声明；

声明帮助浏览器正确的显示网页

定义这个文档的类型，浏览器会先识别这句话，会按照这个类型去解析文档

HTML也有多个不同的版本，只有完全明白页面中使用的确切的HTML版本，浏览器才能完全正确的显示出HTML页面

一般高版本兼容低版本，多以在工作中我们默认写高版本就可以了（HTML５文档声明）

文档声明不区分大小写

文档声明必须放在第一行

必须写文档声明，如果不写会发生怪异事件



### META

meta: 原信息，该标签提供关于HTML文档的元数据。元数据不会显示再页面上，但是对于机器是可读的。他可用于浏览器（如何显示内容或重新加载页面），搜索引擎（关键词），或其他web服务

```html
<meta charset="UTF-8">  声明编码
<meta name="keywords" content="">  页面关键词
<meta name="description" content="">  页面描述
<meta name="author" content="Doctorwu">  定义网站作者
<meta name="viewport" content="width=device-width, initial-scale=1.0">  视口-移动设备
<meta http-equiv="X-UA-Compatible" content="ie=edge">  先使用IE的最新类型
```



### HTML Entity （字符实体）

一个HTML Entity都含有两种转义格式：Entity Name 和 Entity Number

显示HTML保留字符，如<, >, &, " 等（联想到XSS攻击）

表示难以用常规输入设备输入的字符 如 ©， ®， ™ 等

表示给定的字符编码可能无法表达文档字符集的其他字符，如ASCII编码想显示中文，使用&#x6C34表示"水"

#### Entity Name

格式：&entityName;

说明：“&”开头，“;”结尾，以语义的形式描述字符。如字符“<”，英文名称为“less than”, Entity Name为 “\&lt;”,取自“less than”2个单词的首字母。

#### Entity Number

格式：&#entityNumber;

说明：“&#”开头，“;”结尾，以编号的行是描述字符。此编号可以为十进制或十六进制（以"&#x"开头）等数字格式

![](..\imgs\HtmlEntity.jpg)



### SVG矢量图形

SVG指可伸缩矢量图形

SVG用来定义用域网络的基于矢量的图形

SVG使用xml格式定义图形

SVG图像在放大缩小或改变尺寸的情况下其图形质量不会有损失











