---
date: 2019-09-11 10:16:32
layout: post
title: Hyper-V 使用总结
categories: technology
---

## Hyper-V 启用

查看 [Install Hyper-V on Windows 10](https://docs.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v) 和 [Hyper-V 安装配置及网页兼容测试](/post/set-windows-hyper-v-for-web-test/)。

```powershell
# PowerShell 启用 Hyper-V
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All
```

## Hyper-V 应用概述

1. 前端兼容性调试，主要针对 IE 兼容性调试. 可下载 [Download virtual machines](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) 导入到 Hyper-V。
2. 可用 Hyper-V 搭建 Linux 服务器，比如安装 CentOS。
3. 部分工作需要在 Ubuntu 等 Linux 上完成，需要安装虚拟机。

## IE 兼容性测试

> <https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/>

可参考 [HYPER-V 安装配置及网页兼容测试](/post/set-windows-hyper-v-for-web-test/).

## Linux 服务器 (CentOS 7.3)

> <http://blog.csdn.net/chris_111x/article/details/52313797>

**准备**: 需要提前准备以下两个文件.

1. [Linux Integration Services](https://www.microsoft.com/en-us/download/details.aspx?id=55106)
2. CentOS-7-x86_64-Everything-1611.iso, <http://mirrors.163.com/centos/>

**安装配置(配置网络)**: 配置网络, 以连接外网.

1. Hyper-V 配置，Virtual Switch Manager 配置 External 网络(注意选择正确的 External Network)，CentOS 虚拟机选择配置的网络。
2. Hyper-V，Media -> DVD Drive -> Insert Disk...，选择 LinuxIC-4.1.3-2.iso (Linux Integration Services)。
3. CentOS 配置。

    ```bash
    # 安装 LinuxIC
    mount /dev/cdrom /media
    cd /media
    ./install.sh

    # 配置网络
    # ONBOOT=no 改成 ONBOOT=yes
    vi /etc/sysconfig/network-scripts/ifcfg-eth0
    # 重启网路
    service network restart
    # 查看 ip
    ip address
    ```

## Hyper-V 使用

**利用已经安装的虚拟机创建新的虚拟机** 复制已经安装的虚拟机的硬盘文件，可以避免重复配置，快速创建虚拟机。以 `centos-template.vhdx` 为例。

1. vhdx 文件（硬盘文件）默认位置在 `C:\Users\Public\Documents\Hyper-V\Virtual hard disks\`.
2. 复制 `centos-template.vhdx` 并更名为 `centos-demo.vhdx` (**复制前先关闭虚拟机**).
3. 新建虚拟机，在 Connect Virtual Hard Disk 选择 Use an existing virtual hard disk，然后选择 `centos-demo.vhdx`.

**Ubuntu Hyper-V generation 2** 选择generation 1可以直接进行安装，generation 2启动后无法安装，需要先配置 Security Boot。

1. 创建虚拟机时选择 generation 2。
2. 设置完成后. Setting -> Security -> (Security Boot -> Template: Microsoft UEFI Certificate Authority)。
3. 打开配置的 Ubuntu，进行安装。

**Ubuntu 屏幕分辨率设置** 安装Ubuntu后，实际屏幕（分辨率）可能会比实际的小，并且在设置中不能更改分辨率。

```bash
# https://superuser.com/questions/518484/how-can-i-increase-the-hyper-v-display-resolution
sudo apt install linux-image-extra-virtual
sudo gedit /etc/default/grub
# 1920x1080 分辨率
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash video=hyperv_fb:1920x1080"
sudo update-grub
# 重启系统
```

**主机与虚拟机交换文件（Linux）** 下面的方式与和服务器交换文件是同一种方式。

1. 确认虚拟机已安装`openssh-server`。以Ubuntu桌面端为例，它有客户端，没有服务端。

    ```bash
    sudo apt install openssh-server
    # 配置位置 /etc/ssh/sshd_config

    sudo service ssh restart
    ```

2. 安装 FileZilla，File -> Site Manager... -> New Site -> Protocol 选择 SFTP 配置账号（默认端口是22，没有更改的情况下无需配置）。

**Windows 屏幕分辨率设置** 设置分辨率即可更改屏幕大小。

**主机重启系统后，虚拟机无法联网** 可尝试切换 External Network，再切换回来。

## 阅读

* [Introduction to Hyper-V on Windows 10](https://docs.microsoft.com/en-us/virtualization/hyper-v-on-windows/about/)
* [Should I create a generation 1 or 2 virtual machine in Hyper-V?](https://docs.microsoft.com/en-us/windows-server/virtualization/hyper-v/plan/should-i-create-a-generation-1-or-2-virtual-machine-in-hyper-v#centos-and-red-hat-enterprise-linux-guest-operating-system-support) 这里有一份 generation 1、generation 2 系统支持信息的表格。
