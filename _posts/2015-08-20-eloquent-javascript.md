---
date: 2015-08-22 9:37:05 AM
title: JavaScript 编程精解
categories: reading
---

[JavaScript编程精解,  Marijn Haverbeke, 机械工业出版社, 2012](https://book.douban.com/subject/19933548/)

本书讲的是 ECMAScript 3 版本.

## JavaScript 基础: 值、变量、控制流程

- JavaScript 里有 6 种基本类型的值: number、string、Boolean、object 和 undefined.
- 标准的 JavaScript 数字描述是 64 位的浮点型值. (1 位存储正负, 11 位存储小数点位置, 52 位存储整数. 应将小数视为近似值而不是精确值.)
- `alert("Hello")`, `confirm("Shall we, then?")`, `prompt("Tell me", "...")`
- `isNaN(2)`, `typeof "x"`

## 函数

- 其他函数内部定义的函数可以调用父函数的局部变量.
- 函数是唯一能创建新作用域的地方.
- JavaScript 中的所有东西都是值.
- JavaScript 不会限制传入函数的参数数目. 如果传入的参数过多, 多余的参数则被忽略掉; 如果传入的参数过少, 确实的参数则默认为 undefined.

## 数据结构: 对象与数组

- 删除属性 `delete cat.size`
- 属性名称如果不是一个合法的变量名称, 则不可以用点标记访问, 只能使用中括号的形式访问.
- 判断一个对象是否有某个属性 `var chineseBox = {content:"China"};console.info("content" in chineseBox)`
- 所有值类型都不能改变.
- 比较两个内容相同的不同对象将返回 false.
- `slice(start,end)`,`slice(start)` 截取字符串中的一部分.
- `arguments` 使用属性 0 对应第一个参数, 属性 1 对应第二个参数, 以此类推. 它不是一个真正的数组——它没有想 push 这样的方法; 当向该变量添加属性的时候, 它也不会自动更新 length 属性.
- Math 对象: cos、sin、tan、acos、asin、atan、PI、E.

## 错误处理

- indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置 (`stringObject.indexOf(searchvalue,fromindex)`)  

## 函数式编程

```js
function forEach(array, action){
  for(var i = 0; i < array.length; i++){
    action(array(i));
  }
}

function map(func, array){
  var result = [];
  forEach(array, function(elment){
      result.push(func(element));
    });
  return result;
}
```

## 正则表达式

- 正则表达式写在斜杠(/)之间.
- 中括号 "[" 和 "]" 表示一个字符列表, 只要其中一个字符被找到即可被匹配上.
- `"doubledare.search(/le/)"`, `/a/.test("blah")`
- `^` 匹配字符的开头, `$` 匹配字符的结尾.
- `\s` 匹配任何空字符 (例如 Tab、换行和空格).
- `.` 任何不是换行符的字符.
- `\d` 任意数字.
- `\b` 匹配单词边界 (标点符号、空格、字符的开头或结尾)
- `*` 表示可以重复匹配任意次数(包括零次).
- `+` 至少匹配一次.
- `?` 该元素可选.
- `i` 末尾添加, 表示大小写不区分.
- `|` 表示允许模式在多个元素中选择一个. `var holyCow = /\b(sacred|holy) (cow|bovine|bull)\b/i; holyCow.test("Sacred bovine!");`.
- `()` 括号内匹配部分将添加到数组.
- 字符串有一个 `match` 方法, 接收正则表达式作为参数. 如果匹配失败就返回 null; 如果匹配成功则返回匹配的字符串组成的数组. `"... yes".match(/yes/i)`
- `replace` 替换方法 `"Borobudur".replace(/[ou]/g,"a")`.

## Web 编程: 速成课

- `navigator.userAgent`, `navigator.vendor`, `navigator.platform`

## 浏览器事件

- 在浏览器里, JavaScript 是单线程的.
- 注册事件处理句柄 (IE attachEvent, 其他浏览器 addEventListener)

    ```js
    function registerEventHandler(node, event, handler) {
      if (typeof node.addEventListener == "function")
        node.addEventListener(event, handler, false);
      else
        node.attachEvent("on" + event, handler);
    }

    registerEventHandler(button, "click", function(){print("Click (2)");});
    ```

- 删除事件句柄 (removeEventListener, detachEvent)
- 鼠标相关事件类型: mouseup, mousedown, mousemove, mouseover, mouseout
- 键盘事件: keydown, keyup, keypress
- 事件冒泡可以通过事件对象的 stopPropagation 方法停止, 默认行为通过 preventDefault 方法阻止 (IE 分别是 cancelBubble=true, returnValue=false 实现).
