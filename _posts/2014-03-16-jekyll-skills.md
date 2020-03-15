---
date: 2014-04-11 21:31:18
layout: post
title: Jekyll 博客搭建略记
categories: technology
---

用 Jekyll 搭建自己的博客，利用别人的模板，建一个博客想来还是比较简便的。在环境搭建好之后只需要专注于博客布局以及内容。

## 为什么选择 Jekyll

知乎上有一篇 [FarBox、Jekyll、Octopress、ghost、marboo、Hexo、Medium、Logdown、prose.io，这些博客程序有什么特点？](http://www.zhihu.com/question/21981094) 这里提到了多种博客，其中的 WordPress 是最先听说的，多以 “臃肿” 耳闻，另外也发现一些博客主从 WordPress 转到了 Jekyll。Jekyll 还有个衍生的版本 Octopress，是基于 Jekyll 的。个人比较青睐 “原生”，另外也是由于找到的多是 Jekyll 博客主及其模板。Github 也是支持 Jekyll 的，这样就可以直接用 Github 的服务器及其非完全的自定义域名。

需要提到的是，Jekyll 是由 Ruby 开发的博客系统，并根据源文件生成静态网页。

## 要点提要

在本地安装 Jekyll 及其配套工具，再注册 GitHub 账号，本地编辑，并将内容上传到 GitHub，用 GitHub 的服务器和域名。基本的流程可以是这样的：

1. 下载工具 Ruby、Git、DevKit。
2. 建立 DevKit 和 Ruby 之间的依赖关系 （依赖第1步）。
3. 通过 Ruby 下载 jekyll （依赖第1步）。
4. 注册 GitHub 账号，在 GitHub 上创建一个库。
5. 配置 ssh。（依赖第4步）
6. 链接本地和 GitHub 的库，开始建博客，最后提交。

剩下的细节根据后面的具体描述逐步来做就行了。关于环境搭建在本文末尾一篇 jekyll 安装文章中描述的比较详细。

## 环境与工具

环境：Windows 7  
Ruby：[http://rubyinstaller.org/downloads/](http://rubyinstaller.org/downloads/)  
DevKit：[http://rubyinstaller.org/downloads/](http://rubyinstaller.org/downloads/)  
git：[http://git-scm.com/downloads](http://git-scm.com/downloads)  
Jekyll：[http://jekyllrb.com/](http://jekyllrb.com/)

<hr><center>我是分割线</center><hr>

## GitHub

注册一个 [GitHub](https://github.com/) 账号，并新建一个 respository，用来放博客。

接下来又几个需要注意的：

- master 和 gh-pages：在 git 中用到，后者是作为项目主页。
- ssh 和 https：用后者每次提交需要输入密码，前者需要配置 ([查看](http://www.blogways.net/blog/2013/04/10/generating-ssh-keys-4-github.html))。 两者对应的 remote add 方式不同，前者为 git@github.com:XXXX/YYYY.git，后者为 https://github.com/XXXX/YYYY.git。ssh 方式时 respository 可以建为 XXXX.github.io。 

## DevKit 配置

- 解压下载的 DevKit，通过 CMD 或者 Git Bash 执行，`cd DevKitPath` ，`DevKitPath` 表示  DevKit 的路径，需要修改。
- 初始化 `ruby dk.rb init`。
- 打开文件夹中的 config.yml，在最后一行添加 `- C:\Program\Ruby`。  
- 在 CMD 中执行命令 `ruby dk.rb install`。

## 安装 jekyll

- 安装 `gem install jekyll`  。
- 卸载 `gem uninstall jekyll`。    
- 在建好博客后，可以通过本地预览效果，命令是 `jekyll server`。

## ssh 配置

配置步骤如下

1. 在用户目录（比如：`C:/User/HereChen`）新建 `.ssh` 文件夹，或者通过 `mkdir .ssh` 创建。
2. `cd .ssh`，并执行 `ssh-keygen -t rsa -C "your_email@example.com"`。
3. 连续三次回车，可以不用输入内容。第一次是指写入的文件名，默认为 `id_rsa`，后两次为密码。
4. 将 `.pub` 后缀文件中的内容复制出来，登陆 GitHub，找到页顶的设置项，然后设置其中的 ssh 项，添加刚才复制的内容。

## git 指令

    git init // 当前项目 git 化  
    git add . // 当前目录加入 git 跟踪  
    git add filename // 当前文件 filename 参加 git 跟踪  
    git commit -m "XXXX" // 提交信息，交给 git 经管，提交到本地库  
    git remote add origin git@github.com:XXXX/YYYY.git // 与 GitHub 上项目链接 (ssh 方式)  
    git push -u origin master // 将本地库提交到 GitHub 上，另一种是 gh-pages  
    git rm -rf directory // 删除库中指定文件夹 directory 所有内容  
    git rm filename // 删除库中指定文件 filename 内容   
    git clone git＠github.com:XXXX/YYYY.git // 将 GitHub 上的项目下载下来 
	git pull // 把服务器上的 “拉” 下来，与本地的合并

一切妥当后，常用的是：

    git add .  
    git commit -m "XXXX"  
    git push -u origin master  

## 中文错误

jekyll server 本地查看可能会出现 GBK 错误。更改 Ruby 目录中的文件 `convertible.rb`，我的路径是

    C:\Program\Ruby\lib\ruby\gems\2.0.0\gems\jekyll-1.4.2\lib\jekyll

原来的文件内内容是

    File.read_with_options(File.join(base, name),merged_file_read_opts(opts)) 

更改后为

    File.read_with_options(File.join(base, name),:encoding=>"utf-8")  

由于版本不同,语句上会存在一定一些差异，未必完全一样。

## 网站分析

网站分析，目的在于了解网站的访问情况，此博客使用的是 [Google Analytics](https://www.google.com/intl/zh-CN/analytics/)。
注册后，将里面的 script 拷贝到 default.html 模板的 body 标签结束前即可。

## 评论与分享

本站使用的是说多的评论，同样，注册一个 [duoshuo](http://duoshuo.com/) 账号，然后然后会有一个对应的 script。也可以用[友言](http://www.uyan.cc/)作为社交评论。至于社交分享，可以使用[加网](http://www.jiathis.com)。另外，百度也提供了一套数据分析以及分享等脚本，可在[百度分享](http://share.baidu.com)获得。

<hr><center>我是分割线</center><hr>

## 快速创建一个博客模板

jekyll 有一部分是关于博客信息的设置段，每次建都要重复这些复制粘贴，实在不方便。这里就有一个快速新建模板的项目，[地址](https://github.com/jsw0528/jekyll-cli)。最开始了解到这个项目则是在一篇博文上，[使用jekyll-cli快速写blog](http://jser.me/2014/03/25/%E4%BD%BF%E7%94%A8jekyll-cli%E5%BF%AB%E9%80%9F%E5%86%99blog.html)。

安装命令

    npm install -g jekyll-cli

安装之后，可以通过下面的指令来新建模板

	jkl post 我是博客模板

这样新建出来会直接包含时间前缀。如果需要以英文作为文件名，也就是中文转拼音，则可加入参数，以如下形式新建

	jkl post -p 我是博客模板

仅仅这样还不够，因为这样只有默认的几项参数包含在模板内，于是我更改了其中的 `post.js` 对应内容。

## 重装系统之后要做的

重装系统之后大概需要做三件事情

- 环境搭建
- ssh 配置
- 将博客克隆下来 (git clone xxx.git)。

对于环境搭建部分，在重装前如果能够直接将 Ruby 打包就更加方便，只需要解压和配置，剩去了一些下载和可能的问题。如果 DevKit 没有直接打包并在系统重装后解压，需要重新建立依赖关系。

## 扩展阅读及参考

- 博客搭建入门：[搭建一个免费的，无限流量的Blog----github Pages和Jekyll入门](http://www.ruanyifeng.com/blog/2012/08/blogging_with_jekyll.html)  
- git 指令：[git - 简明指南](http://rogerdudler.github.io/git-guide/index.zh.html)  
- 中文乱码：[Jekyll在Windows下面中文编码问题解决方案](http://www.cnblogs.com/aleda/articles/Jekyll-in-Windows-following-Chinese-encoding-problem-solutions.html)    
- 环境搭建：[jekyll安装与应用](http://www.cnblogs.com/BeginMan/p/3549241.html)  
- DevKit 配置：[Development Kit](https://github.com/oneclick/rubyinstaller/wiki/Development-Kit)
- SSH 配置：[generating-ssh-keys](https://help.github.com/articles/generating-ssh-keys)