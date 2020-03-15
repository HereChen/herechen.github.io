---
date: 2019-09-14 15:26:07
layout: post
title: Markdown 使用总结
categories: technology
---

Markdown 是什么、能做什么、有哪些好的工具。

## 是什么

历史、相关规范。

**规范/语法** 没有统一的标准，工具实现也有差异。

1. [CommonMark](http://commonmark.org/), [commonmark/CommonMark](https://github.com/commonmark/CommonMark), 不包含表格(table)和脚注(footnote)。
2. [GitHub Flavored Markdown](https://github.github.com/gfm/), 简称 GFM，基于 CommonMark，包含扩展的表格，但不包含脚注。相关 [Mastering Markdown](https://guides.github.com/features/mastering-markdown/)、[Basic writing and formatting syntax](https://help.github.com/articles/basic-writing-and-formatting-syntax/)。

## 能做什么

写接口文档、写博客、写书、写幻灯片。

## 工具

**解析** 解析 Markdown 的工具。

| 工具 | 语言 | 特点 |
| --- | --- | --- |
| [kramdown](https://kramdown.gettalong.org/) | Ruby | 提供扩展功能，是 Markdown 的超集 |
| [markedjs/marked](https://github.com/markedjs/marked) | JavaScript | |
| [markdown-it/markdown-it](https://github.com/markdown-it/markdown-it) | JavaScript | 可用插件扩展功能，比如代码高亮 |

**编辑软件** 独立的 Markdown 应用.

| 工具 | 平台 | 作用 | 特点 |
| --- | --- | --- | --- |
| [Typora](https://www.typora.io/) | macOS/Windows/Linux | Markdown 编辑器 | 支持数学公式、流程图；可导出 PDF、HTML |
| [Marp](https://github.com/yhatt/marp) | macOS/Windows/Linux | Mardown 写幻灯片 | 可用 Markdown 写幻灯片 |

**支持 Markdown 的工具/平台** 不是专门的 Markdown 编写工具, 但支持 Markdown.

| 工具 | 平台 | 作用 | 特点 |
| --- | --- | --- | --- |
| [有道云笔记](http://note.youdao.com/) | macOS/Windows/Web/Android/iOS | 笔记应用 | 支持用 Markdown 写笔记 |
| [R Markdown](https://github.com/rstudio/rmarkdown/) | R Package | 报告生成 | Dynamic Documents for R |
| [GitHub](https://github.com/) | Web | 代码托管 | 支持 Markdown 写博客，支持 Markdown 在线预览 |

**插件/扩展** Markdown 辅助插件.

| 工具 | 平台 | 作用 | 特点 |
| --- | --- | --- | --- |
| [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) | Visual Studio Code | Markdown 格式校验提示 | |
| [Markdown Here](https://github.com/adam-p/markdown-here) | Chrome/Firefox/Safari/Opera/Thunderbird/Postbox | Markdown 转换 | 支持 Markdown 写邮件，并转换成正常的内容 |
| [md-page](https://github.com/oscarmorrison/md-page) | 浏览器 | 引入 JS, 在 HTML 页面的 Markdown 语法可直接被解析和查看 | 在 HTML 中编写 Markdown |

md-page 适用于需要网页浏览的文档，可以用来写用户手册或者开发文档，不需要额外的转换。

**Markdown 相关的开发工具** 与开发相关的, 或者需要编写代码的相关应用.

| 工具 | 平台 | 作用 | 特点 |
| --- | --- | --- | --- |
| [Postman](https://www.getpostman.com/) | macOS/Windows/Linux | API 工具 | 支持 Markdown 写接口文档, 可 mock 数据, 可登录账号管理 API |
| [Pandoc](https://github.com/jgm/pandoc) | macOS/Windows/Linux/BSD | 文档格式转换 | 支持 Markdown 转换成其他格式（PDF、LaTeX、docx、HTML 等）|
| [docsify](https://github.com/docsifyjs/docsify) | Web | Markdown 写文档，然后生成网站 | 适合编写开发文档，并需要网页浏览的情况 |

## Markdown 编写建议

* jekyll 博客代码高亮可用 ruby 的语法高亮, 更简洁的做法如下

    ```javascript
    console.log("piece of code")
    ```

* 编写文档, 标题级数太深的情况, 可以尝试用段落替代一级.

    ```markdown
    ### subtitle

    **paragraph title** paragraph description.
    ```
