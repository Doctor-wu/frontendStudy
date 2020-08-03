## 九大数据类型和细节知识

### 数据类型分类

1. #### 基础数据类型(值类型/原始值类型):

   - ##### number

     数字类型中比较奇怪的值

     NaN不是有效数字，但是属于number类型，NaN和任何值都不相等包括自己，可以用isNaN检测

     isNaN在检测时，会检测传入的值是不是有效数字，如果传入的值不是数字类型的值，会先隐式转换为数字类型，然后再检测是否为有效数字

   - ##### string

   - ##### undefined

   - ##### null

   - ##### boolean 

   - ##### symbol    通过symbol函数创建一个唯一值

   - ##### bigInt    大数据值，在超过最大安全数后面加n

2. #### 引用数据类型:

   - ##### object

     1. 普通对象	Map
     2. 实例对象
     3. 日期对象
     4. 正则对象
     5. 数组对象    Set
     6. prototype原型对象
     7. ......

   - ##### function

### 数据类型的检测

- #### typeof

  检测出来的结果是字符串，字符串中包含了对应的数据类型

  **typeof null检测出来是“object”** 计算机遗留的bug，二进制存储值以000开头了，被误判为object

- #### instanceof

- #### constructor

- #### Object.prototype.otString

## 堆栈内存