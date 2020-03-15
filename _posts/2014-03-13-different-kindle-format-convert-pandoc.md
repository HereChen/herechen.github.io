---
date: 2014-03-13 ‏‎23:52:28
layout: post
title: 不同文档格式转换之 Pandoc
categories: technology
---

不同格式文档方便的相互转换，使得我们可以高效的通过不同方式发布文档，而 Pandoc 正好可以满足这样的部分需求。

## Pandoc 简述
Pandoc 网址：[http://johnmacfarlane.net/pandoc/](http://johnmacfarlane.net/pandoc/)

Pandoc 提供了几种文本格式之间的相互转换，比如：markdown、html、latex。

## Pandoc 使用
Pandoc 安装后，可以直接使用命令执行，Windows 的在 CMD 中执行。

pandoc 使用格式：`pandoc [options（选项）] [input-file（输入文件）]…`

一个简单的示例，将 input.html 转换为 output.tex：`pandoc -o output.tex input.html`

把 input.html 转换为 markdown 格式：`pandoc -f html -t markdown input.html`  
上面这个命令可以理解为“from html to markdown” 。

需要注意的是，转换为 latex 之前可以先删除一些冗余信息，一般保留 body 部分即可。

## 使用感受
而实际上，让我兴奋是可以把他们转换成 latex 文档，然后再转换成 pdf。这就意味着写 latex 文档的话，出于快速搭建文档的目的，可以先用其他简洁的语言先写好主要部分，然后直接转换成 latex 在做进一步细调和加工。

另外，接触到 Pandoc 是由于 [Sphnix](sphinxsearch.com)，而知道 Sphnix 是由于 [Google 编程风格指南](zh-google-styleguide.readthedocs.org)。对于 Sphnix 目前并不太熟悉，获悉它配合一些设置也是可以生成中文 pdf 的 [gutspot.com/2013/06/21/用sphinx制作中文pdf/](gutspot.com/2013/06/21/用sphinx制作中文pdf/)。

## 参考 #
Pandoc 用户指南：[http://www.ituring.com.cn/article/746](http://www.ituring.com.cn/article/746)