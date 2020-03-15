---
date: 2014-03-10 11:34:44
layout: post
title: Emacs 和 AUCTeX 的安装与配置
categories: technology
---

Emacs 也算是轻量级的编辑工具，结合 AUCTeX ，再配置一下，编辑、编译、预览据一体化了。

## 说明
- 系统：Windows 7
- 版本：Emacs 24.3.1、AUCTeX 11.87
- 内容：本文只取主要部分说明，细节可从参考中查阅

## 预备资源
- Emacs：[https://www.gnu.org/software/emacs/](https://www.gnu.org/software/emacs/)
、[http://mirror.bjtu.edu.cn/gnu/emacs/](http://mirror.bjtu.edu.cn/gnu/emacs/)
- AUCTeX：
[https://www.gnu.org/s/auctex/‎](https://www.gnu.org/s/auctex/‎)

## 前提要点
- Emacs的配置文件名为 init.el 。
- 通过 C:\Users\Lei\AppData\Roaming\.emacs.d 下的 init.el 加载 Emacs 安装目录下的 init.el 。(修改用户名 Lei )
- 通过Emacs安装目录下的 init.el 来加载设置项，包括 AUCTeX。

## Emacs 和 AUCTeX 配置
下载解压就无需多说，只需注意 AUCTeX 的解压位置和下面设置时的路径对应。另外，下面用到的用户名和安装目录根据需求改变。

**第一步**  
运行 Emacs 目录下 bin 目录中的 addpm.exe （这一步并非关键，用于在开始菜单建立一个菜单项）

**第二步 设置 Emacs 配置文件**  
第一个 init.el：在 C:\Users\Lei\AppData\Roaming\.emacs.d 目录下新建一个 init.el ，内容如下。

    (load "C:/Program/emacs/init.el")

用于加载 Emacs 安装目录下的 init.el 配置文件。如果仅仅为了测试此配置文件(第一个 init.el )是否有效，写入颜色设置，启动Emacs来判断即可，如下为黑色背景设置。

    (set-background-color "black")

**第三步 配置 AUCTeX**  
第二个 init.el ：在 C:\Program\emacs 下新建 init.el ，基本的配置如下。

    (setenv "HOME" "C:/Program/emacs")
    (add-to-list 'load-path "C:/Program/emacs/site-lisp")
    (add-to-list 'load-path "C:/Program/emacs/auctex/site-lisp/site-start.d")
    (load "auctex.el" nil t t)
    (load "preview-latex.el" nil t t)

这里的配置主要目的是为了可以加载 AUCTeX。

## 检查加载 AUCTeX 是否成功
在 Emacs 中新建或拖入后缀 tex 文件后，菜单栏会多出 LaTeX 和 Preview ，这就说明加载了 AUCTeX。

## XeLaTeX 编译配置
在配置文件 init.el 中添加

    (add-hook 'LaTeX-mode-hook 
      (lambda()
      (add-to-list 'TeX-command-list '("XeLaTeX" "%`xelatex%(mode)%' %t" TeX-run-TeX nil t))
      (setq TeX-command-default "XeLaTeX")
      (setq TeX-save-querynil )
      (setq TeX-show-compilation t)
    ))

## Emacs 背景色配置
在配置文件 init.el 中添加

    (set-background-color "black")
    (set-foreground-color "white")

## 简单命令
- C-c C-c 编译
- C-c C-v 预览 PDF

## 参考
安装与配置： [http://blog.sina.com.cn/s/blog_4419b53f0100po34.html](http://blog.sina.com.cn/s/blog_4419b53f0100po34.html)  
安装与配置： [http://emacser.com/auctex.htm](http://emacser.com/auctex.htm)  
Emacs配置文件：[http://chen.junchang.blog.163.com/blog/static/63445192013462389461/](http://chen.junchang.blog.163.com/blog/static/63445192013462389461/)  
背景颜色设置： [http://blog.sina.com.cn/s/blog_63047caf01017hjg.html](http://blog.sina.com.cn/s/blog_63047caf01017hjg.html)  
XeLaTeX编译设置： [http://evan7s.blog.163.com/blog/static/108955356201142393254184/](http://evan7s.blog.163.com/blog/static/108955356201142393254184/)  
AUCTex文档：[www.gnu.org/s/auctex/manual/auctex.pdf](www.gnu.org/s/auctex/manual/auctex.pdf)