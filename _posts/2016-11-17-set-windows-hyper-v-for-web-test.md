---
date: 2016-11-17 23:59
layout: post
title: Hyper-V 安装配置及网页兼容测试
categories: technology
---

## 安装 Hyper-V

1. Control Panel\Programs -> Turn Windows Features on or off -> Hyper-V 里面各项全勾选
2. 重启系统
3. 多出一项 Hyper-V Manager, 搞定

## Hyper-V 安装问题

1. 安装前可以 cmd 执行 `systeminfo` 命令, 需要保证最后一项 Hyper-V 的子项(三项)都是 Yes
2. Turn Windows Features on or off -> Hyper-V 这里如果不能勾选, 说明硬件不支持
3. Turn Windows Features on or off -> Hyper-V 如果只有其中的 Hyper-V Hypervisor 不能勾选, 需要进入 BIOS, 将与 CPU 虚拟技术(Visualization)的某个项(根据电脑不同而不同)设置为 `Enable`

## 虚拟机(Windows)安装

1. 首先到 [Download virtual machines](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) 下载 HyperV(Windows) 版的虚拟机
2. 解压下载下来的虚拟机 zip 压缩包
3. 打开 Hyper-V Manager, 并在 Actions 栏下, 通过 Import Virtual Machine... 项选择解压后的虚拟机文件夹
4. 安装完成后, 点击 Start 即可启动, 点击启动的虚拟机缩略图可进入系统

安装的 Windows 虚拟机可以通过调节分辨率以适应当前屏幕的大小(虚拟机内的系统屏幕可能会比较小).

## 网络配置

1. 创建 Virtual Switch
    - 选择 External 创建: Actions -> Virtual Switch Manager... -> 选择 External -> Create Virtual Switch
    - 选择有线驱动: 下面的 External network 有两种选择方式, 一种是选择无线网卡的驱动, 一种是选择有线网卡的驱动, 例如, 无线驱动 Intel(R) Dual Band Wireless-AC 3160 和有线驱动 Realtek PCIe GBE Family Controller. 主机链接 wifi 情况下, 选择无线驱动, 在虚拟机中无需配置即可链接外网; 主机网线连网情况下, 需要将稍后配置 IP.
    - 确认
2. 为虚拟机选择以上配置的网络: 安装的虚拟机栏 Settings... -> Network Adapter -> Virtual Switch 下选择刚才新建的项
3. 虚拟机 IP 配置: 将虚拟机内的 Windows 配置和主机相同的网段, 举例, 主机和虚拟机 IP 配置分别如下
    - 主机: (IP address: 192.168.100.251, Subnet mask: 255.255.255.0, Default gateway: 192.168.100.1, Prefered DNS server: 114.114.114.114)
    - 虚拟机: ((IP address: 192.168.100.252, Subnet mask: 255.255.255.0, Default gateway: 192.168.100.1, Prefered DNS server: 114.114.114.114))
4. 关闭防火墙: 完成第三步后已经可以连接外网, 为了让虚拟机和主机互相 ping 通, 需要关闭虚拟机和主机的防火墙. 主机 ping 虚拟机: `ping 192.168.100.252`, 虚拟机 ping 主机: `ping 192.168.100.251`

总结: 以 External 方式选择有线网卡创建 Virtual Switch, 然后将虚拟机 IP 配置成和主机相同网段, 然后关闭防火墙.

## 虚拟机内访问主机发布网站

通过网络配置, 虚拟机内可以通过主机的 ip 访问主机本地发布的网站.

1. 例如主机本地发布网站访问方式为: http://127.0.0.1:8080
2. 虚拟机内访问主机发布的网站: http://192.168.100.251:8080 (http://主机IP:8080)

如果数据库不在本地, 之前使用的代理(nodejs http-proxy)是在主机上的, 那么, 当前的一个方案如下:

1. 主机发布网站绑定 http://192.168.100.251:8080
2. 虚拟机内用 nodejs http 新建代理

        var httpProxy = require('http-proxy')
        // 创建反向代理服务器
        var proxyOptions = {
            router: {
                'localhost/xxx-website/':'192.168.100.251:8080',
                'localhost/': '服务器域名orIP'
            }
            
        };
        var proxyServer = httpProxy.createServer(proxyOptions)
        proxyServer.listen(80, function(err){
            console.log('local anti-proxy server listening on port 80');
        });

3. 虚拟机内浏览器访问 localhost/xxx-website/

## 其他

(1) 主机共享文件夹

文本复制粘贴可用通过虚拟机顶部的 Clipboard 实现. 主机和虚拟机之间的文件共享可以参考[Win7如何分享局域网并设置共享文件夹账户和密码](http://jingyan.baidu.com/article/ceb9fb10ddf6c08cad2ba017.html).

(2) IP 脚本设置

微软提供的虚拟机包使用有时限, 并且测试的时候通常是多个虚拟机, 手动设置 IP 显得麻烦, 可用脚本自动设置(管理员执行脚本).

    REM refer: http://www.howtogeek.com/103190/change-your-ip-address-from-the-command-prompt/
    REM netsh interface ipv4 set address name="YOUR INTERFACE NAME" static IP_ADDRESS SUBNET_MASK GATEWAY
    REM netsh interface ipv4 set dns name="YOUR INTERFACE NAME" static DNS_SERVER

    netsh interface ipv4 set address name="Local Area Connection" static 192.168.100.252 255.255.255.0 192.168.100.1
    netsh interface ipv4 set dns name="Local Area Connection" static 114.114.114.114

## 参考

- [Hyper-V 安装](https://msdn.microsoft.com/en-us/virtualization/hyperv_on_windows/quick_start/walkthrough_install)
- [硬件支持查看](http://social.technet.microsoft.com/wiki/contents/articles/1401.hyper-v-list-of-slat-capable-cpus-for-hosts.aspx)
- [BIOS 中设置虚拟技术启用](http://superuser.com/questions/568425/hyper-v-virtualisation-disabled-in-firmware)
- [虚拟机联网配置](http://jingyan.baidu.com/article/ca2d939d2e39aeeb6d31ce42.html)
- [虚拟机屏幕分辨率设置](https://blogs.msdn.microsoft.com/virtual_pc_guy/2013/07/09/configuring-wide-screen-resolutions-in-a-hyper-v-virtual-machine/)
