# 移动端APP文件浏览方案

思路: 前端第三方库解析文件浏览; Android 第三方库解析文件浏览, 或者改造 Webview; iOS 采用对应的库.

## iOS

1. [QuickLook Framework](https://developer.apple.com/library/content/documentation/FileManagement/Conceptual/DocumentInteraction_TopicsForIOS/Articles/UsingtheQuickLookFramework.html)

## Android

1. [Apache POI](http://poi.apache.org/)
2. SDK [腾讯浏览服务](https://x5.tencent.com)

## 前端

1. PDF: <https://github.com/mozilla/pdf.js/>

## 现成的服务

1. 微软: https://view.officeapps.live.com/op/view.aspx?src=
2. google：https://docs.google.com/viewer?url=

```
<iframe src='https://view.officeapps.live.com/op/embed.aspx?src=http://remote.url.tld/path/to/document.doc' width='1366px' height='623px' frameborder='0'>This is an embedded <a target='_blank' href='http://office.com'>Microsoft Office</a> document, powered by <a target='_blank' href='http://office.com/webapps'>Office Online</a>.</iframe>
```

## 扩展

- [android webview 快速实现office文档在线预览展示（doc,docx,xls,xlsx,ppt,pptx）](http://blog.csdn.net/qianxin2222/article/details/52288420)
- [ZhongXiaoHong/superFileView](https://github.com/ZhongXiaoHong/superFileView)
- [Android应用内展示word、excel、pdf、ppt等文件](https://www.jianshu.com/p/3f57d640b24d)
