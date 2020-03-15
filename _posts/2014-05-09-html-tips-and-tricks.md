---
date: 2014-05-09 17:19:49
layout: post
title: HTML Tips and Tricks
categories: technology
---

1. 让代码更加可读：一是要让阅读者更方便阅读，二是让机器容易阅读。对比下面的两种方法。

    ```html
    <div id="header"></div>
    <div id="sidebar"></div>
    <div id="main-content"></div>
    <div id="footer"></div>

    <header></header>
    <aside></aside>
    <section></section>
    <footer></footer>
    ```

2. 更多的是用标记 (section,header...)，在需要的时候使用 div。
3. 让老的 IE 支持一些无法解析的标签样式，可以使用 [html5shim](https://code.google.com/p/html5shim/)。
4. 为浏览器提供 HTML 内容的信息 (mircodata)：在标签中对内容的属性进行说明。查看 [schema.org](http://schema.org/)。
5. 区分标签的方法：在结尾处加入注释。

    ```html
    <div class="main">
    </div><!-- end of main -->
    ```

6. 用 meta 标签来描述网页内容的信息。
7. 显示版权标志 `&copy;`。
8. 可编辑的内容。让显示的 HTML 内容可以编辑。

    ```html
    <p contenteditable="true">this paragraph can be edited.</p>
    ```

9. 检查邮件的有效性。使用这种方法并不能保证浏览器都持支。

    ```html
    <form>
        <label for="email">Email Address</label>
        <input name="email" id="email" type="email">
        <button type="submit">Submit</button>
    </form>
    ```

10. Required Form Fields，即必须输入此栏。

    ```html
    <input name="email" id="email" type="email" required>
    ```

11. Validating Patterns，对输入作检查，输入指定格式的内容。用正则表达式来指定格式。查看 [html5pattern.com](http://html5pattern.com)

    ```html
    <!-- +99(99)9999-9999 -->
    <input name="phone" id="phone" type="text" required pattern="[\+]\d{2}[\(]\d{2}[\)]\d{4}[\-]\d{4}" title="please enter a valid email">
    ```

12. 社交分享信息提供，有的分享工具可以直接从网页中提取信息，但也可以自己提供。下面是一个示例。

    ```html
    <meta property="og:title" content="This is a title of article">
    <meta property="og:type" content="blog">
    <meta property="og:image" content=".../pic.jpg">
    <meta property="og:url" content="http://...">
    <meta property="og:description" content="descript here">
    ```
