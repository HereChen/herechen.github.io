---
date: 2020-03-15 14:08:36
title: LaTeX 使用总结
categories: technology
---

<!-- TOC -->

- [安装 TexLive](#安装-texlive)
- [中文](#中文)
- [package 的引用](#package-的引用)
- [引入格式文件](#引入格式文件)
- [从外部进入 tex 文件](#从外部进入-tex-文件)
- [循环引入 tex 文件](#循环引入-tex-文件)
- [绘图](#绘图)
- [添加 PDF 书签](#添加-pdf-书签)
- [参考文献引用](#参考文献引用)
- [工程文件夹结构](#工程文件夹结构)
- [latexmk: 自动化编译](#latexmk-自动化编译)
- [Beamer 使用](#beamer-使用)
  - [使用 algorithm 错误](#使用-algorithm-错误)
  - [使用 verbatim 错误](#使用-verbatim-错误)
- [工具使用问题](#工具使用问题)
  - [Sublime Text + LaTeXTools：文件分割后使用 cite 提示 no bib files found](#sublime-text--latextools文件分割后使用-cite-提示-no-bib-files-found)
- [资源](#资源)

<!-- /TOC -->

## 安装 TexLive

```bash
# 方法1（Ubuntu）
# <https://www.tug.org/texlive/debian.html>
sudo apt install texlive-full

# 方法2（Ubuntu）
# <https://github.com/scottkosty/install-tl-ubuntu>
wget https://github.com/scottkosty/install-tl-ubuntu/raw/master/install-tl-ubuntu && chmod +x ./install-tl-ubuntu
```

## 中文

宏包 CJK、xeCJK、zhspacing 可以让文档支持中文，CJK 是中文（Chinese）、日文（Japanese）、韩文（Korean）三国文字的缩写。也可以设置 documentclass 为 ctexart。推荐使用 xeCJK 结合 xelatex 编译，相对 CJK 使用简单，并且生成得到的书签目录没有乱码。

**CJK**

```tex
\documentclass{article}
\usepackage{CJK}
\begin{document}
\begin{CJK}{GBK}{song}
    文章内容
\end{CJK}
\end{document}
```

**xeCJK**

```tex
\documentclass{article}
\usepackage{xeCJK}
\begin{document}
    文章内容
\end{document}
```

**ctexart** 应用 `ctexart` 的好处是，特别针对中文排版作了优化。但是，如果设置了中文，并且有持续构建进行编译（仅仅为了查看编译是否成功），需要注意在构建的环境安装对应的中文字体。以上两种方法只要不配置字体，采用系统默认字体，编译是不会报错的。

```tex
\documentclass{ctexart}
\begin{document}
    文章内容
\end{document}
```

reference: [如何评价 xeCJK？，知乎](http://www.zhihu.com/question/26705259)，[xeCJK 宏包，PDF](http://ctan.mirrorcatalogs.com/macros/xetex/latex/xecjk/xeCJK.pdf)。

## package 的引用

```tex
% 单个包引入
\usepackage{pack1}
\usepackage{pack2}
\usepackage{packn}

% 多个包引入
\usepackage{pack1, pack2, packn}
```

在引入的包没有参数设置的情况下，使用第二种要简洁许多。

## 引入格式文件

> [What are .cls and .sty files?  How are they different?](https://tug.org/pracjourn/2005-3/asknelly/nelly-sty-&-cls.pdf)

可以将包的引入、包的设置等等都放入一个 `cls` 或 `sty` 文件中，然后引入，放置在 `\begin{document}` 之前。如果是样式文件, 推荐用 `sty` 后缀, 而不是 `cls`。如果是针对特定类的，则用 `cls`, 反之用 `sty`。

**cls** `cls` 即 classes 表示类文件, 如 `article`、`book`、`beamer`

```tex
\input{format.cls}
```

**sty** `sty` 即 style files, 或称为 packages, 为样式文件.

```tex
% mystyle.sty
\usepackage{mystyle}
```

## 从外部进入 tex 文件

当编写内容比较多事，可以分割为多个文件，然后再一起引入，调试错误也比较方便。

```tex
% latexFileName1.tex
% latexFileName2.tex
\include{latexFileName1} % 不要加 tex 后缀
\include{latexFileName2}
```

**`\input`** 与 `\include` 区别在于，这种方式不会每个文件都从新的一页开始，而是连续的。并且用 `\input` 在编译时对应的 TeX 子文件不会产生编译过程文件(.aux)。

```tex
\input{latexFileName1}
\input{latexFileName2}
```

## 循环引入 tex 文件

> [Calling several tex files with a loop?, stackoverflow](http://tex.stackexchange.com/questions/274743/calling-several-tex-files-with-a-loop)

文件、表格、图片太多，引入太麻烦怎么办？可以使用 `pgffor` 包。

```tex
\foreach \x in {1,...,3}{
    \input{filename-\x}
}
% 引入 filename1.tex, filename2.tex, filename3.tex
```

## 绘图

**图片路径** 通过设置图片路径，不需要再添加图片是带上路径。需要注意，如果是通过一个主 tex 文件包含 (`include` 或 `input`)，图片的相对路径应该是相对与主 tex 文件的。图片放在子文件夹下，可以通过 `\graphicspath` 设置路径，这样就不用在 `\includegraphics` 命令中添加完整路径，而直接引用图片名即可。使用 `\graphicspath` 可以设置单个或多个路径。

{% raw %}
\graphicspath{{imagepath1/}{imagepath2/}...{imagepathn/}}
{% endraw %}

**绘图工具** 编程方式可用 [PGF/TikZ](https://ctan.org/pkg/pgf) 绘图；直观的绘制矢量图可用 [Inkscape](https://inkscape.org)，生成 PDF 后再引入；[drawio](https://github.com/jgraph/drawio) 有在线和本地客户端，可导出 PDF，功能类似 Viso，适合绘制流程图架构图。

1. [How I draw figures for my mathematical lecture notes using Inkscape, 2019](https://castel.dev/post/lecture-notes-2/)

## 添加 PDF 书签

```tex
% 添加书签, 并添加内容间的连接(目录、引用等)
\usepackage{hyperref}
```

## 参考文献引用

bibtex 格式参考文献文件后缀为 `bib`，通过此种方式引入参考文献，可以方便利用文献软件进行管理. 其他的诸多好处可以在[如何在LaTeX写作中管理参考文献?](http://www.zhihu.com/question/23565739/answer/51511029)中查看。

```bash
xelatex main.tex
# 参考文献编译
bibtex main.aux
xelatex main.tex
xelatex main.tex
```

## 工程文件夹结构

样板工程可参考[The-Way-MATLAB-Learning](https://github.com/HereChen/The-Way-MATLAB-Learning)。

1. 文件夹结构。

    ```bash
    .
    ├── main.tex                 # 主文件
    ├── main.sty                 # 样式文件: pakcage 引入及配置等
    ├── Makefile                 # 脚本命令定义
    └── tex                      # 内容
       ├── code                  # 代码
       ├── algorithm             # 算法
       ├── figure                # 图片
       ├── table                 # 表格
       ├── title.tex             # 标题
       ├── abstract.tex          # 摘要
       ├── content.tex           # 目录
       ├── sectionExample.tex    # 示例章节
       ├── appendix.tex          # 附录
       ├── bib.tex               # 参考文献
       └── bib.bib               # 参考文献 Bibtex 文件
    ```

2. `main.tex`

    ```tex
    % main.tex
    \documentclass{article}

    \usepackage{main}                   % 样式

    \begin{document}
      \thispagestyle{empty}
      \include{tex/title}               % 封面
      \setcounter{page}{0}

      \thispagestyle{empty}
      \include{tex/abstract}            % 摘要
      \include{tex/content}             % 目录

      \include{tex/sectionExample}      % 章节
      \include{tex/appendix}            % 附录
      \include{tex/bib}                 % 参考文献
    \end{document}
    ```

3. `tex/content.tex` 目录

    ```tex
    % tex/content.tex
    \tableofcontents
    \listoffigures
    \listoftables
    \lstlistoflistings
    ```

## latexmk: 自动化编译

> [latexmk – Fully automated LaTeX document generation](https://ctan.org/pkg/latexmk)

利用套件里面的 `latexmk` 命令, 可以实现监视文件变化自动编译、清除缓存文件等功能。

```bash
# 清除编译临时文件
latexmk clean

# 预览并自动编译(采用 xelatex, 默认是 pdflatex)
latexmk -pdf -pdflatex="xelatex -interactive=nonstopmode" -pv your.tex

# 简化版
latexmk -pv your.tex
```

如果需要设置常用属性(比如编译采用 `xelatex` 还是 `pdfletx`), 可以了解 `.latexmkrc` 文件的配置。通过编写 Makefile 重复利用相同的编译配置，如下：

```bash
# Makefile
# make all
# make watch
# make clean
PROJNAME=main
.PHONY: $(PROJNAME).pdf all watch clean

all: $(PROJNAME).pdf

$(PROJNAME).pdf: $(PROJNAME).tex
	latexmk -pdf -pdflatex="xelatex -interactive=nonstopmode" -use-make $<

# automatic compile without preview
watch: $(PROJNAME).tex
	latexmk -pdf -pdflatex="xelatex -interactive=nonstopmode" -use-make -pvc -view=none $<

# clean temp files
clean:
	latexmk -c
	rm -f *.lol *.bbl *.auxlock *.synctex.gz tex/*.aux
```

## Beamer 使用

### 使用 algorithm 错误

> [Using Algorithm2e package in Beamer](http://tex.stackexchange.com/questions/174631/using-algorithm2e-package-in-beamer)

- 错误: `! LaTeX Error: Not in outer par mode.`
- 解决: `\begin{algorithm}[H]`, 后加 `[H]`

### 使用 verbatim 错误

> - [Verbatim in beamer showing error: “File ended while scanning use of \@xverbatim.”](http://tex.stackexchange.com/questions/140719/verbatim-in-beamer-showing-error-file-ended-while-scanning-use-of-xverbatim)
> - [beamer's fragile frame as default](http://tex.stackexchange.com/questions/11328/beamers-fragile-frame-as-default)

**错误** `File ended while scanning use of \@xverbatim`

**解决** `\begin{frame}[fragile]`, 对应 `frame` 后加 `[fragile]`

## 工具使用问题

### Sublime Text + LaTeXTools：文件分割后使用 cite 提示 no bib files found

> [No bib files found!??, GitHub](https://github.com/SublimeText/LaTeXTools/issues/228)

**问题描述** 将单个 tex 文件的每一章节分割为独立的 tex 文件，并放置于 include 文件夹下，载主文件中用 `\input` 引入。 此情况下，输入 `\cite{` 提示 `no bib files found`。

**解决方案** 在分割出来的章节 tex 文件首行加入 `% !TEX root = ..\report.tex`。

## 资源

- 网页中使用数学公式：[KaTeX](https://github.com/KaTeX/KaTeX)，[MathJax](https://github.com/mathjax/MathJax)。
- [陈硕，用 LaTeX 排版编程技术书籍的一些个人经验，Github，2013](https://github.com/chenshuo/typeset)
- [The Beauty of LATEX](http://www.nitens.org/taraborelli/latex)：这篇文章介绍了 LaTeX 相对于 Microsoft Office Word 的优点。
- [LaTeX/Modular Documents](https://en.wikibooks.org/wiki/LaTeX/Modular_Documents)：介绍如何组织文件。
- 试卷 document class。[exam](http://www-math.mit.edu/~psh/#ExamCls)。
- 书籍 document class。[tufte-latex](https://github.com/Tufte-LaTeX/tufte-latex), <https://ctan.org/pkg/tufte-latex>。
- 书籍模板。[sisl/tufte_algorithms_book](https://github.com/sisl/tufte_algorithms_book)。
