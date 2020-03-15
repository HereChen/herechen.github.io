---
date: 2015-7-24 13:44:45
title: jekyll 环境搭建 (ubuntu)
categories: technology
---

之前的 jekyll 博客环境是搭建在 windows 7 上的，搭建之初就遇到了不少问题 (软件版本和中文乱码等)。由于这些问题，备份了 ruby 的安装目录文件，这样每次重装系统之后就可以延用上次搭建的环境 (只需要简单的配合 Devit 即可)。

由于一直都延用同样的环境，jekyll 版本没有升级，也就不能尝试新的特性。时隔一年，此次在硬盘上安装了三个系统(windows 7 x64,windows 10 x64, ubuntu 15.04 x64), 打算在 ubuntu 上搭建 jekyll 的环境。以下就是这次环境搭建过程的记录，整个过程要比在 windows 上轻松。

## 搭建的流程

1. 安装 ruby

        $ sudo apt-get install ruby

2. 更改 rubygems 镜像

        $ gem sources --remove https://rubygems.org/
        $ gem sources -a https://ruby.taobao.org/

3. 安装 ruby-dev

        $ sudo apt-get install ruby-dev

4. 安装 jekyll

        $ gem install jekyll

## 测试 jekyll

    $ jekyll new myblog
    $ cd myblog
    $ jekyll server

在浏览器中输入 http://localhost:4000 预览新建的博客。

## 关于 nodejs

官网的环境需求中是要求安装 nodejs 的，目前没仔细探究用于何处。提一下安装过程。

1. 官网下载安装包 [nodejs](https://nodejs.org/)
2. 解压和安装

        $ tar -zxf node-v0.12.7.tar.gz
        $ cd node-v0.12.7
        $ ./configure && make && sudo make install

## 总结

当前使用的 jekyll 2.5.3，server 之后更改博客不需要重启 (更改配置文件除外)。对以前的博客作了一些更改，添加了 css 预处理器 sass，并压缩了 css, 对页头页脚和 head 部分模块化。额外的，压缩了 html，通过 [jekyll-compress-html](https://github.com/penibelst/jekyll-compress-html) 实现。另外还有一些其他更改，这些更改一方面是参考的之前测试 jekyll 的示例博客，也参考了[官方文档](http://jekyllrb.com/docs/home/) (由此添加和更改了一些配置)。另外，换用 ubuntu 的一个好处在于还可以使用 Atom 编辑器，要比在 windows 上好用。

## 问题、解决方案、参考

- [RubyGems 镜像 - 淘宝网](http://ruby.taobao.org/)
- [Installing/Building Node.js](https://github.com/joyent/node/wiki/Installation#installing-on-linux)
- [ERROR: Error installing jekyll: ERROR: Failed to build gem native extension](http://stackoverflow.com/questions/22460117/error-error-installing-jekyll-error-failed-to-build-gem-native-extension)
- [How to install jekyll?](http://askubuntu.com/questions/305884/how-to-install-jekyll)
- [Generating SSH keys](https://help.github.com/articles/generating-ssh-keys/)
- [jekyll document](http://jekyllrb.com/docs/home/)
