## 解释型语言 ##
JavaScript是解释型语言，即编译一步运行一步进行

Java是编译型语言，把所有内容编译完再运行

## 注释 ##

```
//  单行注释   ctrl+/

/*
    多行注释   shift + alt + a
*/
```

## 输入与输出 ##

### alert ###
浏览器弹出警示框 （输出）

### console.log ###
浏览器控制台打印输出信息 （输出）

### prompt ###
浏览器弹出输入框，用户可输入 （输入）
**输入的值是字符型的**

## 变量 ##
存放数据的容器
内存里的一块空间，用于存放数据

### 声明变量与赋值 ###
**var**

```
var age;  //声明了age变量
age = 10;  //age变量赋值

var age = 10； //声明并赋值（变量的初始化）
```
### 用变量存储用户输入的信息 ###
获得输入框中用户输入的信息

```
var myname = prompt('请输入你的名字');
```

输出用户输入的信息
```
alert(myname + '早上好');
```

### 扩展 ###

1. 更新变量后原有值会给覆盖

2. 可同时声明多个变量

3. 声明不赋值，输出**undefined** 即未定义

4. 不声明不赋值，使用报错

5. 赋值不声明，可以使用，但不提倡

### 命名规范 ###

- 由字母，数字，下划线，美金符号组成
- 严格区分大小写
- 不能以数字开头
- 不能是关键字 保留字
- 驼峰命名法
- 变量名有意义（尽量用英文单词）
- 变量一般用名词，函数一般用动词

## 数据类型 ##

不同数据占用内存的空间是不同的，把数据分为存储空间不同的数据，以充分利用存储空间，这便是不同的数据类型

**JS 的变量数据类型是只有在程序运行过程中，根据等号右边的值来确定的**

**JS 是动态语言，即变量的数据类型可以变化**


### 1. **Number** ###

数字型（整型值，浮点型值），默认值为0

#### 数字型进制 ####
```
//输出时默认转换为十进制
var num1 = 010  //数字8，数字前面加0，表示八进制
var num2 = 0xa  //数字10，数字前面加0x，表示十六进制（0~f）
```

#### 数字型范围（最大值&最小值） ####
```
console.log(Number.MAX_VALUE);  //输出最大值
console.log(Number.MIN_VALUE);  //输出最小值
```

#### 特殊值 ####

无穷大：Infinity；超过最大值范围
无穷大：-Infinity；超过最小值范围
NaN：非数值

#### isNaN()方法 ####
用来判断非数字，是数字返回false，不是数字返回true。



### 2. **Boolean** ###
布尔值类型（true -- 1，false -- 0）， 默认值为false

```
var flag = true;
console.log(flag + 1); 	//输出值为2，true相当于1参与加法运算。
```

### 3. **String** ###
字符串类型，在js里，字符串都带双引号或者单引号， 默认值为""

#### 引号嵌套 ####
可以用双引号在外，单引号在内进行镶嵌（反过来也可以）

#### 转义字符 ####
以 \ 开头，且写在引号里面

> 换行：\n
> 斜杠：\\
> 单引号:\'
> 双引号:\*
> tab缩进:\t
> 空格::\b

#### 长度 ####
检测获取字符串长度用length
```
a = str.length;  //a的数值为str字符串长度
```

#### 拼接 ####
字符串 ＋ 其他类型 = 新的字符串

```
alert(myname + '早上好' + 233);

alert(123 + 233);				//这样输出的数字之和
```

### 4. **Undefined** ###
未定义值
```
var a;
console.log(a + 'a');   //输出字符串 undefineda
console.log(a + 1);		//输出NaN ，非数字
```
### 5. **Null** ###
空值 (学习对象时会深入)

```
var a = null;
console.log(a + 'a');   //输出字符串 nulla
console.log(a + 1);		//输出1
```

### typeof检测 ###
typeof 可以检测获取变量的数据类型

```
console.log(typeof num); //输出变量类型

var a = null;
console.log(typeof a); //输出的不是null，而是object。
```

> 控制台颜色也可以看出变量类型，数字：蓝色，字符串：黑色，布尔：淡蓝色，undefined和null为灰色


### 数据类型的转换 ###

#### 转字符串 ####

1. toString（）
```
//数字转字符串
var num =10;
var str = num.toString();
```

2. String（）	//强制转换
```
//数字转字符串
var num =10;
console.log(String(num));
```
3. 加号拼接字符串    //隐式转换
```
//数字转字符串
var num =10;
console.log(num + '');			
```

#### 转数字 ####
1. parseInt（）	
转整数,不会进1，会去掉后面字母，若前面有字母则输出NaN
```
var str = '10';
console.log(parseInt(a));	
```
2. parseFloat（）	
转浮点,会去掉后面字母，若前面有字母则输出NaN
```
var str = '1.9';
console.log(parseFloat(a));	
```
3. Number（）	转数值
```
var str = '10';
console.log(Number(a));	
```
4. 隐式转换 （- / *）
```
var str = '10';
console.log(a - 0);	
console.log(a * 1);	
console.log(a / 1);	
```

#### 转布尔 ####

Boolean（）
```
//输出false

console.log(Boolean(''));	
console.log(Boolean(0));	
console.log(Boolean(NaN));	
console.log(Boolean(null));	
console.log(Boolean(undefined));

//其余的均输出true	
```

## 运算符 ##
不太想打了，C语言都学过
> === 全等     （要求值和数据类型都要一直）
> ！== 全不等
> == 会转型 即 18 == '18'

### 短路运算（逻辑中断） ###
有多个值的时候，左边的表达式可以确定结果，就不继续运算右边表达式的值

1. 逻辑符与：``表达式1&&表达式2``  若1为真，则返回2；若1为假，则返回1 
2. 逻辑符或：``表达式1||表达式2``  若1为真，则返回1；若1为假，则返回2

## 顺序结构 ##

## 分支结构 ##
大致都明白，不打加一

### if语句 ###
if语句
if else语句
if else if语句

### swich语句 ###
default（case）：除case情况所执行的

### 三元表达式 ###

## 循环结构 ##

### for循环 ###

### 镶嵌for循环 ###

### while循环 ###

### do while循环 ###

### continue 与 break的区别 ###

## 数组Array ##
一组数据的集合
### 创建数组 ###
1. new关键字创建
```
var arr = new Array(); //创建了一个数组
```
2. 数组字面量创建
即 [ ]
```
var arr = []; //创建一个空的数组
var arr = [1，2，'123',true]; //创建一个数组，可以放任意类型，称其为数组元素
```

### 使用数组之中的元素 ###
```
console.log(arr[1]);
```

### 遍历数组 ###
从头到尾访问一次
用for循环实现

### 数组长度 ###
数组名.length 返回数组元素个数

这使得遍历更加方便
```
for (var i = 0; i < arr.length; i++) {
	console.log(arr[i]);
}
```

### 数组新增元素 ###
1. 通过修改length长度
length是可读写的
```
var arr = [1,2,3];
arr.length = 5;			//使得arr数组元素变为 5 
console.log(arr);		//输出后两个为 empty 空元素，即undefined。
```

2. 通过索引号增加数组元素
```
var arr = [1,2,3];
arr[3] = 4;
```

> 若直接给数组名赋值，会覆盖之前的数组元素



## 函数 ##

### 声明函数 ###

```
function 函数名() {
	//函数体
}
```
### 调用函数 ###
```
函数名（）;
```

### 函数封装 ###
把一个或多个功能通过函数的方式封装起来，对外提供一个简单接口。

### 参数 ###
实参：实际的参数

形参：形式上的参数

```
function 函数名(形参1，形参2...) {
	//函数体
	return 返回需要的结果; //只能返回一个值,没有return求返回值是undefined。
}

函数名(实参1,实参2...)
```

```
function 函数名(形参1，形参2...) {
	//函数体
	return [结果1，结果2...];      //返回需要的结果
}

var last = 函数名(实参1,实参2...)
```

**实参与形参个数不同时**
实参多于形参： 有几个形参就取多少个。
实参小于形参： 剩余形参看作不声明变量，即undefined。

### arguments的使用 ###
当我们不知道有多少参数传递时，可以使用arguments。
```
function fn(){
	console.log(arguments);	//里面存储了所有传递过来的实参
	console.log(arguments.length);
	console.log(arguments[2]);
}

fn(1,2,3)
```

arguments为伪数组：有length，有索引号，但没有真正数组的方法 pop（） push（）等等

### 函数表达式（匿名函数） ###
```
var 变量名 = function(形参) {
	//函数体
}

变量名 （实参）;
```
