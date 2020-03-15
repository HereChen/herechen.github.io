---
date: 2015-09-15 21:23:07 PM
layout: post
title: JavaScript 阅读摘抄
categories: reading
---

## JavaScript 模式

[JavaScript 模式, Stoyan Stefanov, 中国电力出版社, 2012](http://book.douban.com/subject/11506062/)

- 只有五种基本类型不是对象: 数值类型、字符串类型、布尔类型、空类型和未定义类型.
- 原型是一个对象, 并且创建的每一个都会自动获取一个 Prototypes 属性, 该属性指向一个新的空对象.
- 任何变量, 如果未经声明, 就是全局对象所有.
- 使用 var 创建的全局变量不能删除; 不使用 var 创建的隐含全局变量可以删除.
- 只是用一个 var 在函数顶部进行变量声明是一种非常有用的模式.
- JavaScript 允许在函数的任一地方声明多个变量, 无论在哪里声明, 效果都等同于在函数顶部进行声明. 这就是所谓的提升.
- for 循环

    ```js
    // 第一种
    // 每次循环都需要访问数据长度
    for (var i = 0; i < myarray.length; i++){
        // 操作
    }

    // 第二种
    var i, myarray = [];
    for (i = myarray.length; i--) {
        // 操作
    }

    // 第三种
    var myarray = [],
        i = myarray.length;
    while (i--) {
        // 操作
    }
    ```

- for-in 循环

    ```js
    for (var i in man){
        if (man.hasOwnProperty(i)) {
            console.log(i, ":", man[i]);
        }
    }
    ```

- 不要增加内置的原型
- switch 模式(case 后面加 break)

    ```js
    switch (inspect_me) {
        case 0:
            result = "zero";
            break;
        case 1:
            result = "one";
            break;
        default:
            result = "unknown";
    }
    ```

- 及时对象初始化模式

    ```js
    ({
        maxwidth: 600,
        maxheight: 400,

        gimmeMax: function () {
            return this.maxwidth + "x" + this.maxheight;
        }

        init: function () {
            console.log(this.gimmeMax);
            // ....
        }
    }).init();
    ```

- 模块模式

    ```js
    MYAPP.utilities.array = (function () {
        // 依赖
        var uobj = MYAPP.utilities.obejct;
        // 私有属性 ...
        // 私有方法 ...
        isArray = function () {...},
        inArray = function () {...};
        // 揭示共有 API
        return {
            isArray: isArray,
            indexof: inArray
        }
    })
    ```

- 各种设计模式: 单体模式, 工厂模式, 迭代器模式, 装饰者模式, 策略模式, 外观模式, 代理模式, 中介者模式, 观察者模式

## 编写可维护的 JavaScript

[编写可维护的 JavaScript, Nicholas C. Zakas, 人民邮电出版社, 2013](http://book.douban.com/subject/21792530/)

- ECMAScript5 引入了“严格模式”, 在代码中加入 `"use strict";` 以严格模式执行代码. 严格模式下使用未声明变量或 `with` 等不规范的语句会报错. 对于需要多个文件拼合, 建议将 `"use strict";` 放置于函数内顶部, 避免其中一些文件使用了非严格模式而可能报错. 严格模式若置于函数外部, 整个文件都将采用严格模式执行.
- 将 JavaScript 从 CSS 中抽离, 避免使用 CSS 表达式, 比如

    ```css
    .box {
        width: expression(document.body.offsetWidth + "px");
    }
    ```

- 将 CSS 从 JavaScript 中抽离, 不直接修改 DOM 元素的 style 属性, 通过 CSS 类名的操作实现样式更改.

    ```css
    /* 样式 */
    .reveal{
        color: red;
    }
    ```

    ```js
    /* javascript */
    // 好的写法 - 原生方法
    element.className += "reveal";

    // 好的写法 - HTML5
    element.classList.add("reveal");

    // 好的写法 - YUI
    Y.one(element).addClass("reveal");

    // 好的写法 - jQuery
    $(element).addClass("reveal");

    // 好的写法 - Dojo
    dojo.addClass(element, "reveal");
    ```

- 将 JavaScript 从 HTML 中抽离, 不直接将事件写于 HTML 中

    ```html
    <!-- 不好的写法 -->
    <button onclick="doSomthing()" id="action-btn">Click Me</button>
    ```

    ```js
    // 好的写法
    var btn = document.getElementById("action-btn");
    btn.addEventListener("click", doSomthing, false);
    ```

- 将 HTML 从 JavaScript 中抽离

  - 从服务器加载, 比如采用 Ajax, 从服务器加载内容.
  - 客户端模板, 在 HTML 中预留 "插槽" (比如注释语句,或既定格式的字符串写入标签属性中), 然后通过 JavaScript 替换.

- 避免使用全局变量(尽可能少的使用全局变量, 使用单一变量)

    ```js
    var MaintaniableJS = {};

    MaintainableJS.Book = function(title) {
        this.title = title;
        this.page = 1;
    }
    ```

- 零全局变量, 实现方法是使用一个立即执行的函数调用并将所有脚本放置其中

    ```js
    (fucntion(win) {
        "use strict";
        var doc = win.document;
        // 在这里定义其他变量
        // 其他相关代码
    }(window));
    ```

- 不要分发事件对象, 一个事件对象包含很多和事件相关的额外信息, 而一般只用到其中的一部分.

    ```js
    // 好的写法
    // 获取位置并定位
    var MyApplication = {
        handleClick: function (event) {
            // 假设事件支持 DOM Level2
            event.preventDefault();
            event.stopProgation();

            // 传入应用逻辑
            this.showPopup(event.clientX, event.clientY);
        },

        showPopup: function(x, y) {
            var popup = document.getElementById("popup");
            popup.style.left = x + "px";
            popup.style.top = y + "px";
            popupclassName = "reveal";
        }
    };

    addListener(element, "click", function(event) {
        MyApplication.handleClick(event);
    });
    ```

- 阻止修改: 锁定对象

    ```js
    var person = {
        name: "Nicholas"
    };
    console.log(Object.isExtensible(person));//true
    Object.preventExtensions(person)
    console.log(Object.isExtensible(person));//false
    person.age = 25; // 严格模式下会报错
    console.log(Object.isSealed(person));//false
    Object.seal(person);
    console.log(Object.isSealed(person));//true
    console.log(Object.isFrozen(person));//false
    Object.freeze(person);
    console.log(Object.isFrozen(person));//true
    ```

- 基本目录结构

  - `_build_` 用来放置最终构建后的文件, 理想情况下这个目录不应该提交.
  - `_src_` 用来放置源文件, 包括用来进行文件分组的子目录.
  - `_test_` 用来放置测试文件

## JavaScript 启示录

[JavaScript启示录, Cody Lindley, 人民邮电出版社, 2014](http://book.douban.com/subject/25837367/)

- 原始值不是对象
- 函数总有返回值
- call 传输多个分开的参数, apply() 传递多个参数组成的数组
- 创建函数时, 系统会 (在后台) 创建一个名为 this 的关键字, 它链接到运行该函数的对象.
- 除 this 和 arguments 以外的所有变量都遵循词法作用域规则.
- 用新对象替换 prototype 属性会删除默认构造函数属性.

## Effective JavaScript: 编写高质量 JavaScript 代码的 68 个有效方法

[Effective JavaScript, David Herman, 机械工业出版社, 2014](http://book.douban.com/subject/25786138/)

- 只有 NaN 不等于它自身，可以用这个特点检测是否是 NaN, 而不用 isNaN 函数
- 使用立即调用的函数表达式创建局部作用域

    ```js
    (function(){console.info("code here");})();
    ```

- `C.prototype` 用于建立由 `new C()` 创建的对象原型, `Object.getPrototypeOf(obj)` 是 ES5 中用来获取 obj 对象的原型对象的标准方法, `obj._proto_` 是获取 obj 对象的原型对象的非标准方法.
- 在原型中存储方法, `User.prototype.method = function(){}`.
- 在闭包中存储私有数据.

## JavaScript 性能优化

[JavaScript 性能优化:度量、监控与可视化, Tom Barker, 机械工业出版社, 2014](http://book.douban.com/subject/25854153/)

浏览器内核(渲染引擎, rendering engine): Firefox(Gecko), Chrome(WebKit, Blink), Safari(WebKit), IE(Trident), Opera(Presto, WebKit, Blink).

浏览器 JavaScript 引擎: Firefox(SpiderMonkey), Chrome(V8), Safari(JavaScriptCore), IE(Chakra), Opera(Carakan)

主要是讲工具或者自己构建工具来分析 JavaScript 的性能。一个基本流程是利用 [WebPagetest](http://www.webpagetest.org/) 的 API，通过 PHP 收集数据，然后用 R 分析和可视化数据。后面再升级了一下这个工具，添加了浏览器对象来获取数据 (window.performance)。还介绍了日志工具... 总之这本书是关于分析性能工具的书.

## Web 性能实践日志

[Web 性能实践日志, Stoyan Stefanov, 人民邮电出版社, 2014](http://book.douban.com/subject/25891125/)

- 大而化小, 同类相聚, 让缓存时间更长, 让加载更智能.
- 将资源放入 localStorage, 同时考虑 localStorage 本地读取性能
