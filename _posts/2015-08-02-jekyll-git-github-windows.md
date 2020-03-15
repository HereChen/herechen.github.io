---
date: 2015-08-02 7:44:38
title: jekyll, git, github 环境 (windows)
categories: technology
---

在 Windows 上配置 jekyll 的环境可以参考 [Jekyll on Windows](http://jekyllrb.com/docs/windows/#installation) 和 [Run Jekyll on Windows](http://jekyll-windows.juthilo.com/).

## jekyll 说明

摸索了一番, 这两种组合是可行的. 组合1:

- windows-7-en-x64
- python-2.7.10.amd64.msi
- DevKit-mingw64-64-4.7.2-20130224-1432-sfx.exe
- rubyinstaller-2.0.0-p645-x64
- jekyll-2.5.1

组合2:

- windows-7-en-x64
- python-2.7.10.amd64.msi
- DevKit-mingw64-64-4.7.2-20130224-1432-sfx.exe
- rubyinstaller-2.2.2
- jekyll-2.5.3

资源下载

- [python 2.7.1](https://www.python.org/downloads/release/python-2710/)
- [rubyinstaller](http://rubyinstaller.org/downloads/)

## jekyll 安装

1. 更改为淘宝镜像: 

        $ gem sources --remove https://rubygems.org/
        $ gem sources -a https://ruby.taobao.org/

2. 安装 jekyll

        $ gem install jekyll
        # 安装特定版本 gem install jekyll -v '2.0.0.alpha.1'
        # 安装最新预览版本 gem install jekyll --pre

3. 建立 DevKit 与 ruby 依赖

    解压 `DevKit-mingw64-64-4.7.2-20130224-1432-sfx.exe`, 可更改文件夹名为 `rubydevkit`, 在 `rubydevkit` 文件夹下执行

        $ ruby dk.rb init
        # 确认 config.yml 文件添加了 ruby 安装路径, 可手动添加
        $ ruby dk.rb install

4. 测试 jekyll

        $ jekyll new myblog
        $ cd myblog
        $ jekyll server
        # 浏览器进入 http:\\localhost:4000 查看

## git 配置

1. 下载 Windows 版 [Git](http://www.git-scm.com/)
2. 配置全局变量 `user.name`, `user.email`

        $ git config --global user.name "your_name"
        $ git config --global user.email "your_email@example.com"
        $ git config --list
        # 查看所有 git 配置

3. 打开 Git Bash 后的默认路径 (此项根据需求确定是否更改)

    - 添加环境变量 `GITHOME`
    - 右键 Git Bash 选择属性 -> `Start in:`(英文系统) 处改写成 `%GITHOME%`

4. 配置 GiHub 提交快捷别名

        $ git config --global alias.pu push -u origin master
        # 上传用命令 git pu

## GitHub SSH key

也可直接查看原文[Generating SSH keys](https://help.github.com/articles/generating-ssh-keys/).

    # 生成
    $ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
    # 输入后连续回车, 采用默认配置

    $ ssh-add ~/.ssh/id_rsa

    # 
    $ clip < ~/.ssh/id_rsa.pub
    # 头像下方 -> Settingss -> SSH keys -> 
    # Add SSH key -> Key 方框中 Ctrl + V 粘贴 (Title 中为其命个名) 

## 参考

- [Git Configuration](http://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration)
- [Setting your username in Git](https://help.github.com/articles/setting-your-username-in-git/)
- [Setting your email in Git](https://help.github.com/articles/setting-your-email-in-git/)
- [GitHub Help](https://help.github.com/index.html)
- [Change gitbash home directory](http://archive.gregk.me/2011/change-gitbash-home-directory/)