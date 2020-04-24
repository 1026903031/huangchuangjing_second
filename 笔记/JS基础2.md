# 作用域 #
## 作用域概念 ##
限定代码所用到变量名字的可用性范围就是这个名字的作用域
**以减少名字冲突**

js的作用域（es6）分为全局作用域，局部作用域。
**无块级作用域**，到了es6才有，即{}里面的

### 全局作用域 ###
即整个script标签，或者一个单独的js文件

### 局部作用域 ###
即在函数作用域，这个代码名字只在函数内部起作用

## 变量的作用域 ##

根据作用域不同可分为，全局变量和局部变量

### 全局变量 ###
在全局作用域下的变量

**若在函数内部没有声明，直接赋值的变量称为全局变量**

### 局部变量 ###
在局部作用于下的变量，即函数内的变量，只能在函数内使用

**函数的形参也是局部变量**

### 从执行效率看变量 ###

全局变量只有在浏览器关闭才会销毁，占内存
当我们程序执行完毕就会销毁，比较节省内存

## 作用域链 ##
根据内部函数可以访问外部函数变量的机制，用**链式查找**（一层层查找）决定哪些数据可以被内部访问，就成为作用域链

**就近原则**


# 预解析 #

## 预解析概念 ##
```
console.log(num);

```
程序运行报错（案例一）

```
console.log(num);
var num = 10;
```
返回值为undefined（案例二）

```
fun();

var fun = function() {
	console.log(10);
}
```
程序运行报错（案例三）

**JavaScript引擎js分两步，预解析和代码执行**
### 预解析 ###
预解析会把js里面的所有 var 还有 function 提升到当前作用域的最前面

### 代码执行 ###
按照书写顺序从上往下执行

## 变量预解析 ##
变量提升，把所有**变量声明**提升到当前作用域的最前面，不赋值
所以我们就知道为什么**案例1~3**程序结果会是那样。

## 函数预解析 ##
函数提升，把所有**函数声明**提升到当前作用域的最前面，不调用

# 对象 #

## 对象概念 ##

**一个**具体事物
JavaScript中对象是**属性**（特征）和**方法**（行为）组成的

使对象表达结构更清晰

## 创建对象 ##

### 字面量创建对象 ###
对象字面量：就是用花括号**{}**里面包含了表达这个具体事物（对象）的属性和方法

```
var obj = {};		//创建一个空对象

var obj1 = {
	name: "213",
	age: "213",
	sex: "213",
	sayHi:function() {
		console.log('hi');
	}
}
```

里面的属性或方法我们采用键值对的形式
键 属性名 ： 值 属性值；

多个属性值用逗号隔开
方法冒号后是一个匿名函数

#### 使用对象 ####
对象名.属性名
```
console.log(obj.name);
```

对象名['属性名（）']
```
console.log(obj['age']);
```

对象名.方法名（）
```
obj.sayHi();
```


### new Object 创建对象 ###
通过等号 = 赋值方法添加对象的属性和方法

```
var obj = new Object();		//创建一个空对象
obj.age = 18;
obj.sex = 'boy';
obj.sayHi:function() {
		console.log('hi');
}
```
### 构建函数创建对象 ###
因为前面创建对象方式一次只能创造一个
函数可以创建多个对象
即构造函数，里面非普通代码，而是封装对象

先列出相同的属性

**构造函数泛指，对象特指**
```
//构造
function 构造函数名（形参1，形参2，形参3） {
	this.属性 = 值（形参）;
	this.方法 = function(形参) {	
		console.log(形参)；
	}
}

//使用
new 构造函数名(实参1，实参2，实参3);

//创建对象
var XXX = new 构造函数名(实参1，实参2，实参3);

//使用方法
XXX.方法('实参');
```

构造函数的首字母要大写
构造函数返回不需要return，且返回的是一个对象

## new关键字 ##
**new在执行时**
1. new 构造函数可以在内存中创建一个空的对象
2. this 指向new创建的空对象
3. 执行代码就给空对象添加属性和方法
4. 返回对象

## 遍历对象属性 ##
不能用for
用 for in 遍历
> 常用变量为 k 或者 key
> 很少用这个来遍历方法


```
for(var 变量 in 对象) {
	console.log(变量);		//变量输出  属性名
	console.log(对象[变量]);		//输出 属性值
}
```


# JS内置对象 #

## 内置对象 ##

### 自定义对象 ###
前面讲的

### 内置对象 ###
JS自带的对象。
math、date、array、string等

### 浏览器对象 ###
后面再讲 JSAPI

## Math对象 ##
```
Math.min(num1,num2....);		//返回最小值

Math.max(num1,num2....);		//返回最大值

Math.ceil(num);				//返回大于num的最小整数

Math.floor(num);			//返回num的整数

Math.round(num);			//四舍五入

Math.abs(num);				//返回绝对值

Math.random();				//返回0~1的一个随机数

```
详情可见https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math

> abs方法会把字符串型转换为数字型
> **Math.round(-1.5);**  输出结果为-1

```
//得到一个两数之间的随机整数，包括两个数在内
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
}

```
## 日期对象 ##
日期对象date是一个构造函数，调用要用到new

**如果没有提供参数，那么新创建的Date对象表示实例化时刻的日期和时间。**

```
new Date();

var date = new Date();
```
**有参数时，用数字型参数获得字符串参数**

```
var date = new Date(2019,10,1);
console.log(date);			//返回的月数为11月

var date = new Date('2019-10-1 8:8:8');
console.log(date);			//返回的正常

```

**方法**

```
var date = new Date();

date.getFullYear();		//返回四位数的年

date.getMonth();			//返回月 0~11

date.getDate();		//返回星期， 0~6

date.getDay();		//返回日

date.getHours();		//返回小时

date.getMinutes();		//返回分

date.getSeconds();		//返回秒

date.getTime();		//返回表示日期的毫秒数,距离1970.1.1的毫秒数  时间戳，都不重复

var date1 = +new Date();     //也是毫秒数（时间戳）
```

**可以用时间戳做出倒计时的效果**

## 数组对象 ##
创建
```
var arr = new Array();		//创建一个空数组，括号里面参数为长度，若参数大于1个，则为数组元素

```
> 用instanceof检测是否为数组，或者用Array.isArray(参数) 方法


方法

```
var arr = [1,2,3];

arr.push(参数);				//追加新元素，参数为数组元素返回值为新数组长度
	
arr.unshift(参数);			//开头新加元素。参数为数组元素返回值为新数组长度

arr.pop();					//删除最后一个元素，返回被删除的那个元素

arr.shift();				//删除第一个元素，返回被删除的那个元素

arr.join(参数);				//将一个数组的所有元素连接成一个字符串并返回这个字符串。参数为每个元素后的符号

arr.reverse();			   //颠倒数组的顺序

arr.sort();					//进行从小到大的符号（冒泡排序），仅个位数

arr.concat(参数);			//连接数组，参数为数组

arr.splice(参数1，参数2);		//删除从索引参数一开始的参数二个项目

arr.indexOf(参数);		//查找元素中第一个索引，不存在返回-1，参数为要查找的元素

arr.lastIndexOf(参数);		//查找元素中最后一个索引，不存在返回-1，参数为要查找的元素
```

```
//从大到小排序
arr.sort(function(a, b) {
  return a - b;
});
```
## 字符串对象 ##
字符串不可变，新赋值后，原来的依旧存在

字符串方法不会修改本身，只会创建一个新的字符串。

```
var stringObject = 'XXX';

stringObject.charAt(索引号);		//根据索引号返回字符

stringObject.chartCodeAt(索引号);		//根据索引号返回字符的ASCII码

stringObject.indexOf(参数1，参数2);		//查找元素中第一个索引，不存在返回-1，参数1为要查找的元素，从索引号参数2开始查找

stringObject.lastIndexOf();		//查找元素中最后一个索引，不存在返回-1，参数1为要查找的元素，从索引号参数2开始查找

stringObject.slice(start,end);		//从start（索引号）开始，截取到end位置

stringObject.subString(start,end);		//从start（索引号）开始，截取到end位置，但不接受负值

stringObject.substr(start,length);		//从start（索引号）开始，length取得个数

stringObject.split('分隔符');		//将字符串变数组

stringObject.replace('替换字符','替换为的字符');		//只替换第一个字符

stringObject.tpUpperCase();			//转大写

stringObject.tpLowerCase();		 //转小写
```

# 数据类型 #

## 简单类型 ##
即值类型
存储的为值
五大数据类型
**null为空对象**
存放在栈

## 复杂类型 ##
即引用类型
即对象
现在栈里面存放在堆里面的地址

