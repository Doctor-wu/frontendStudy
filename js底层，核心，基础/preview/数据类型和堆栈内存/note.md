## 九大数据类型和细节知识

### 数据类型分类

#### 基础数据类型(值类型/原始值类型):

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

#### 引用数据类型:

- ##### object

  1. 普通对象	Map
  2. 实例对象
  3. 日期对象
  4. 正则对象
  5. 数组对象    Set
  6. prototype原型对象
  7. ......

- ##### function

------



### 数据类型的检测

#### typeof

检测出来的结果是字符串，字符串中包含了对应的数据类型

**typeof null检测出来是“object”** 计算机遗留的bug，二进制存储值以000开头了，被误判为object

#### instanceof

#### constructor

#### Object.prototype.otString

------



### 数据类型的转换

#### 显示转换——明显的转换

#### 隐式转换——隐晦的转换

#### 转换规则

- **Number**-把其他数据类型转换成Number类型

  1）特定需要转换成为Number

  ​		Number([value]), parseInt/parseFloat([value])

  2） 隐式转换

  ​		数学运算（特殊情况，+出现在字符串之前不是数学运算，是字符串拼接）

  ​		在==比较的时候, ==两侧数据类型不同时需要转换成相通类型再比较

  ​		......

  **Tips )**

  ​		console.log('')	// 0

  ​		console.log('10')	//10

  ​		console.log('10px')	// NaN	**只要出现非有效数字字符结果都是NaN**

  ​		console.log(true)	//1

  ​		console.log(false)    //0

  ​		console.log(null)	//0

  ​		console.log(undefined)	// **NaN**

  ​		console.log(Symbol(10))    // 直接报错，不能这样转化

  ​		console.log(BigInt(10))    // 10

  ​		// **对象变为数字, 应该先valueOf, 没有原始值再toString转换为字符串，最后把字符串转换为数字**

  ​		// **parseInt机制:  先把输入的值转换成字符串，从字符串第一个字符开始，查找有效数字字符，遇到非有效数		   字就停止查找，如果一个都没找到就是NaN，parseFloat比他多识别一个小数点**

  ​		// **加号即使一边出现字符串或者对象，也不一定是字符串拼接：++/+ 这种情况是数学运算**

  ​			{} + 0 => 0  // 把左边的{}解析成了代码块，代码块不参与运算，运算时只处理了+0

  ​			({} + 0) => "[object Object]0" // 此时{}参与到运算当中了

  ​			0 + {} => "0[object Object]" // 此时{}参与到运算当中了



- **String**-把其他数据类型转换成String类型

  1）能使用的办法

  ​		toString()

  ​		String()

  2）隐式转换

  ​		加号运算的时候，如果有一侧出现字符串，则是字符串拼接

  ​		把对象转换为数字，需要先toString()转换成字符串，再去转换成数字

  ​		基于alert/confirm/prompt/document.write...这些方法输出的内容，都是先把内容转换成字符串，然后再输出

- **Boolean**-把其他数据类型转换成Boolean类型

  1）基于以下方法可以把其他类型转换成布尔类型的值

  ​		! 转换为布尔值后取反

  ​		!! 转换为布尔类型值

  ​		Boolean([val])

  2）隐式转换

  ​		在循环或者判断条件中，条件处理的结果就是布尔值

  **Tips：**

  - **只有“0、NaN、null、undefined、空字符串”转换成布尔值会变成False，其余都是TRUE**

  - **在==比较过程中，数据转换的规则**

    *[类型一样的几个特殊点]*

    {}=={}：false 对象比较的是堆内存的地址

    []==[] : false

    NaN==NaN: false

    *[类型不一样的几个特殊点]*

    null==undefined: true, 但是转换成\===比较的结果就是false（因为类型不一致）,剩下null/undefined和其他任何数据类型值都不相等

    字符串==对象	要把对象转换成字符串

    剩下如果==两边数据类型不一致，都是需要转换成数字再进行比较

  - **字符串的转换**

    把其他类型转换成字符串一般都是直接“”包起来，只有{}普通对象调取toString是调取的Object.prototype.toString, 不是转换为字符串，而是检测数据类型， 返回结果是 "[object Object]"



## 堆栈内存

### JS底层运行机制之堆栈内存
![](C:\Users\uu\Desktop\珠峰\js底层，核心，基础\preview\imgs\02.png)
