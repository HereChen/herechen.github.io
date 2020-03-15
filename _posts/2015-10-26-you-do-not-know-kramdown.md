---
date: 2017-07-14 14:00:37
title: 你不知道的 kramdown
categories: technology
---

目前写博客及接口文档都用 markdown，了解一下解析器提供的功能，还是挺有用的。kramdown 的语法相对于通常的 markdown 语法有所增强。这里描述几个比较实用的语法。

## 介绍

kramdown 是一款基于 Ruby markdown 解析工具，是 markdown 的超集。

> kramdown is a fast, pure-Ruby Markdown-superset converter.

官网地址：<http://kramdown.gettalong.org/>。官网介绍号称

> It is probably the fastest pure-Ruby Markdown converter available (September 2014), being about 3x faster than Maruku and about 4.5x faster than BlueFeather.

## 代码块

代码块生成 HTML 标签后带 class 属性。代码块生成用 `~~~` 包裹。

``` html
<pre>
    <code class="language-ruby"></code>
</pre>
```

( 1 ) 方法一

``` markdown
~~~
def what?
  42
end
~~~
{: .language-ruby}
```

( 2 ) 方法二

``` markdown
~~~ ruby
def what?
  42
end
~~~
```

## 表格

``` markdown
标签        | 描述
:---------- | :---
`<article>` | 定义文章。
`<wbr>`     | 定义视频。
{: class="table"}
```

## 脚注

``` markdown
This is a text with a
footnote[^1].

[^1]: And here is the definition.
```

## 数学公式
