---
date: 2014-12-16 11:52:23
layout: post
title: 谈 CSS 学习以及使用的经验
categories: technology
---

任何一本书都可能把 CSS 的大部分内容描述一遍。而就我的学习和使用来看，可以通过有序的方法来学习 CSS。本文只讲方法，CSS 的具体修饰不作描述，算是一个学习备份，来日若是忘却了，学习起来也会比较快。

接下来的这个 `demo.html` 将在下文讲解中用到。

```html
<html>
<head>
    <meta charset="UTF-8">
</head>
<body>
    <h2>h2 tag</h2>
    <div class="class1">class1</div>
    <div class="class2">class2</div>
    <div id="main">
        <h2>h2 in main</h2>
    </div>
</body>
</html>
```

## 如何在 HTML 中应用 CSS

我们可以通过三种方式对 HTML 的内容作修饰。第一种是直接引用外部文件 (比如：`cssfile.css`)。

```html
<link rel="stylesheet" type="text/css" href="cssfile.css">
```

第二种是在 HTML 文件头中嵌入 CSS 样式。

```html
<style type="text/css">
    h2{font-size: 100px;}
</style>
```

第三种是直接写入标签中。

```html
<div style="font-size:20px">Font-Size</div>
```

综合起来，HTML 可以是这样的 (选择一种方法即可)。鉴于方便修改的缘故，通常选择第一种方法。

```html
<html>
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="cssfile.css">
    <style type="text/css">
        h2{font-size: 100px;}
    </style>
</head>
<body>
    <h2>h2 tag</h2>
    <div style="font-size:20px">Font-Size</div>
</body>
</html>
```

## 如何选择要修饰的内容

修饰某一个或多个标签、标签内容有三种方式：直接通过标签名修饰、通过唯一的 ID 修饰、通过 class 修饰。首先，考虑修饰单一的标签、ID 和 class。

```css
h2{font-size:100px;} /* 通过标签 */
.class1{font-size:50px;} /* 通过 class */
#main{background:gray;} /* 通过 ID */
```

并列修饰(修饰多个)。

```css
.class1,.class2,h2,div{font-size:100px;}
```

嵌套修饰(修饰子标签)，下面两者对于给出的 `demo.html` 具有相同效果。

```css
#main h2{color: #980000;} /* main id 下的 h2 标签 */
div h2{color: #980000;} /* div 下的 h2 标签 */
```

对于嵌套的情况，可以是嵌套多层的、隔层的，并且可以标签名、ID、class 并用。

## 进阶：CSS样式的组织

对要实现的效果都胸有成竹之后，更多的考虑在于如何组织CSS。这里的组织指的是CSS的嵌套和分解，通过良好的组织达到较好的可读性和可维护性。这可以通过学习其他框架来提高这种组织的能力，比如 Bootstrap。通过学习Bootstrap至少可以让人发现两个值得关注的地方：元素的共性和特性的分解；元素嵌套关系的组织。

另外，为了保持与HTML尽量分离，通常是用元素的 `class` 来修饰元素，其次是标签名。`class` 里面样式的并列体现了样式的“分解”。

## 其他

1. CSS 中用 `/* */` 作为注释标记
2. 修饰语句通过分号隔开 `h2{font-size:100px;color:red;}`
3. 查看 HTML 内容的 CSS 修饰：在浏览器中右键选择检查元素，可以实现查看、修改、添加
4. Firefox 提供了 3D 查看效果来查看 HTML 的层结构
5. 由于浏览器解析不同，需要考虑 CSS 样式的兼容性，为多个浏览器适配
6. 考虑 CSS 之间是否会存在冲突。比如，通过标签设置为一种颜色，但是在另外的地方又通过 ID 设置为另外一种颜色。这可能使得修饰达不到预期的效果。
7. CSS 样式的精简。通过适当的分解 CSS，通过并列嵌套等修饰内容，减少冗余的 CSS。
8. CSS 一方面可以实现基本的对内容的修饰，也可以实现与用户的交互响应。
9. 一个标签中的多个 class 通过空格来分开，比如 `<div class="class1 class2></div>"`。
10. 子选择器 `body > div > div > blockquote{ margin-left: 30px; }`。
11. 兄弟选择器 `.post h1 + p:first-line{ font-variant: small-caps; }`, `.post h1 ~ p{...}`。
12. 属性选择器 `div[class*="post"]{color: #EEE;}`, `input[type="text"]{width=200px;}`。
13. 伪元素 `ul li:first-child{...}`, `ul li:nth-child(2n+1){...}`, `.clearfix:after{clear:both;}`, `a:active{...}`, `p:first-letter{...}`, `.post > p:first-of-type:first-line{...}`, `input:not([type="submit"]){...}`, ...。
