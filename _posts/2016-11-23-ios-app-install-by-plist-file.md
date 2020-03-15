---
layout: post
date: 2016-11-23 20:10:53
title: IOS 应用浏览器下载安装(plist, ipa)
categories: technology
---

本文主要是记录和总结, plist 方式安装可以直接看参考.

## IOS 应用安装方式

1. App Store 下载安装: 直接到 App Store 下载安装, 或在 Safari 中点击链接跳转到 App Store 下载安装.
2. 通过PC端工具安装: 将应用 ipa 文件放到电脑, 然后通过电脑上的工具安装到手机上.
3. Safari 直接下载安装: 通过 plist 文件, 直接下载安装

测试版本频繁发布, 并且只做内测, 采用第三种方式比较合适. 

## Safari 直接下载安装

基本思路是页面中点击链接到 plist 文件的地址, 进行解析, 然后从解析的 ipa 下载地址下载安装. plist 文件中填写应用信息, 并且该文件需要放到有证书的 https 下.

**第一步** 准备 plist 文件, 大概格式如下

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>items</key>
    <array>
        <dict>
            <key>assets</key>
            <array>
                <dict>
                    <key>kind</key>
                    <string>software-package</string>
                    <key>url</key>
                    <string>ipa下载地址, 可以是直接的地址, 也可以是接口, 响应是 ipa 地址就行</string>
                </dict>
            </array>
            <key>metadata</key>
            <dict>
                <key>bundle-identifier</key>
                <string>开发者证书用户名</string>
                <key>bundle-version</key>
                <string>1.0</string>
                <key>kind</key>
                <string>software</string>
                <key>title</key>
                <string>APP名称, 下载安装的时候会显示</string>
            </dict>
        </dict>
    </array>
</dict>
</plist>
```

**第二步** 页面中的下载链接

```html
<a title="iPhone" href="itms-services://?action=download-manifest&url=https://xxx/xxx/xxxxx.plist">
```

url 后填写 plist 文件的地址, plist 文件需要放在有证书的 https 域名下.


## 参考

- [plist苹果安装包实现](https://segmentfault.com/q/1010000000623121)
