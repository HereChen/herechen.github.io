---
date: 2014/03/30 22:52:18
layout: post
title: Kindle 笔记格式化导出 (MATLAB 版)
categories: projects
---

地址：[KindleClippingsExport](https://github.com/HereChen/KindleClippingsExport)
作者：[HereChen](http://herechen.github.io/)

## 项目描述

本项目旨在提取 Kindle 笔记信息（Kindle Paperwhite），并作分离，然后实现格式化导出。这里的格式化将针对 Markdown，目的在于导出之后可以直接发布。但可以通过修改数据导出部分来实现自定义数据导出。

## 功能描述

- 将笔记分为 bookname author clipping clipping-style location time1 time2，即实现各内容的分离。
- 可以作为数据集导出，如果你需要自定义格式化导出 txt，可以删除其中文件导出部分或自己修改。
- 可以实现通过作者、书名的关键词筛选，同时也可以实现笔记类型的筛选。筛选条件可以是多个。
- 语言支持中文和英文（涉及到根据关键词分离数据，故存在语言支持的限制）。

## 使用描述

调用形式

```matlab
clipExport = KindleClippingsExport(clipImportFile, clipExportFile, varargin)
```

其中， `clipExport` 和 `varargin` 是可选参数。

默认调用形式

```matlab
KindleClippingsExport(clipFile,clipExport,...
  'bookname','','author','','clipstyle','','encoding','UTF-8')
```

1. `clipExport` -- 导出数据
2. `clipImportFile` -- 笔记原始文件，如 `'My Clippings.txt'`
3. `clipExportFile` -- 笔记导出文件名，如 `'exportclip.txt'`
4. `varargin` 为输入参数，包括
    1. `'author'` -- 作者
    2. `'bookname'` -- 书名
    3. `'clipstyle'` -- 剪切类型，比如：`标注`，`Highlight`
    4. `'encoding'`  -- 打开文件编码方式，比如：`'UTF-8'`

每个参数后面设置对应值。

## 示例

```matlab
clipImportFile = 'My Clippings.txt';
clipExportFile = 'ClipExportZhouGuoPing.txt';
KindleClippingsExport(clipImportFile,clipExportFile,...
    'bookname','尼采');
```

导出效果发布后效果：[尼采：在世纪的转折点上 (周国平)](/reading/zhouguoping-Nietzsche-on-turning-point-of-century/)。

## 项目文件

1. `RunKindleClippingsExport.m` -- 一个导出demo
2. `KindleClippingsExport.m` -- 导出函数
3. `My Clippings.txt` -- 样本笔记

## 设计思路

Kindle 笔记的提取依赖于其格式和关键词，以一个实际示例来展示。

```text
==========
假如你愿意，你就恋爱吧 (王小波作品系列) (王小波，李银河)
- Your Highlight at location 212-213 | Added on Friday, 14 March 2014 12:05:02

肉麻是什么呢？肉麻就是人们不得不接受降低人格行为时的感觉。
==========
```

- 每条笔记有四行；
- 笔记之间以 `==========` 分割；
- 标题和作者之间以 `(` 分开，取最后一个括号做分离，并且将省略最后一个反括号；
- 位置以数字读取；
- 笔记类型通过关键词 `Your` 和 `at` 提取；
- 时间通过 `,` 来分割获取；
- 笔记内容直接提取第四行，如果为空将过滤。

Kindle 系统语言为中文时类似。

## Thanks

感谢 [Unkeltao](http://www.unkeltao.com/) 提供在前期数据分离提供的建设性思路。Unkeltao 有个 Ruby 版的笔记导出，值得推荐，[地址](https://github.com/UnkelTao/kindle-note-format)。毕竟 MATLAB 并不是免费的。

另外，此版尚未作更多的测试，若你发现 Bug，诚请相告，thanks in advance！

## 资源

- [unkeltao-kindle-note-format](http://www.unkeltao.com/blog/2014/03/14/kindlebi-ji-zhuan-huan/)
- [kindleclippings](http://www.ruby-doc.org/gems/docs/k/kindleclippings-1.3.2/README_markdown.html)
- [Kindle-Clippings-Export](https://github.com/rydjones/Kindle-Clippings-Export)
- [klipbook](https://github.com/grassdog/klipbook)
- [kindle-clips](https://github.com/minejo/kindle-clips)
- [kindle-clippings](https://github.com/lxyu/kindle-clippings)
