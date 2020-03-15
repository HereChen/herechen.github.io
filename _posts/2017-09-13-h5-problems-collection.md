---
date: 2017-11-02 16:49:26
layout: post
title: 嵌入APP页面/H5的问题收集及解决
categories: technology
---

## JS异步请求设置 title, 原生无法获取 title

```javascript
// 请求 callback 中添加
// 原理: 利用iframe的加载可以局部刷新页面，从而使<title>被重新渲染
document.title = 'test';
var iframe = document.createElement('iframe');
iframe.style.visibility = 'hidden';
iframe.style.width = '1px';
iframe.style.height = '1px';
iframe.onload = function () {
    setTimeout(function () {
        document.body.removeChild(iframe);
    }, 0);
};
document.body.appendChild(iframe);
```

- [webview下改变title无法生效](http://www.jianshu.com/p/7372ac57b8ea)

## jsp 页面中无法获取 Session 值

客户端登录的时候服务端设置了 Session, 但 WebView 打开一个 jsp 页面无法获取 Session 中对应的值.

> 混合开发方式的APP中使用WebView来访问登录服务器，需要做到session同步处理。

同步方案有两种: 1 ) 使用Cookie来实现; 2 )使用URL回显来实现.

- [webAPP session同步处理解决方案](https://my.oschina.net/ljc94/blog/777589)

## APP 浏览器内核

写了一个页面, 在 iOS 上, 有的手机可以打开, 有的手机不可以. 最后发现不是 APP 的问题, 是前端兼容性的问题. 在 [Can I Use](https://caniuse.com) 上查了下 Fetch, 10.3 以下都不支持.

问题的关键在于误以为 APP 使用的内核是自带的, 不同手机相同版本微信和 QQ 上试了没问题, 以为是其他原因导致的. 实际上, Android, 微信和 QQ 使用的是应用自带的浏览器内核; iOS 上, 应用使用的是 Safari 提供的内核.

也因此, 可以在 iOS 上的微信或者QQ直接发链接查看 H5, 测试是否存在问题, 而不用每次进入 APP.

## 时间无法解析 (new Date(), Date.parse())

由于不同平台的时间格式支持上的原因, 在 iOS 上会出现时间解析失败的情形.

```javascript
console.log(new Date('2017-10-16 00:00:00'))
// Invalid Date
console.log(Date.parse('2017-10-16 00:00:00'))
// NAN
```

为了适配各个平台, 可采用以下做法.

```javascript
var arr = '2017-10-16 00:00:00'.split(/[- :]/),
    date = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
console.log(date);
```

- [Javascript date parsing on Iphone](https://stackoverflow.com/questions/5324178/javascript-date-parsing-on-iphone)

## 文本框聚焦

具体场景是, 应用 Framework7, 点击搜索框后, 需要跳转到单独的搜索页面, 并聚焦到搜索框. 安卓和 iOS 两者需要不同的方式处理, 安卓不能直接聚焦, 而 iOS 需要通过其他元素事件触发后对输入框聚焦. 安卓不能直接聚焦的原因待查.

```javascript
$('input[type=search]').on('focusin', function () {
  // for Android
  setTimeout(function(){
    $('.js-searchfocus').focus();
    }, 60);
  // for iOS
  $('.js-searchfocus').focus();
});
```

- [Mobile Safari Autofocus text field](https://stackoverflow.com/questions/6287478/mobile-safari-autofocus-text-field)

## 微信内核相关

> 微信6.1版本以上的android用户，都是使用的QQ浏览器的X5内核。5.4-6.1之间的版本，若用户安装了QQ浏览器就是使用的X5内核，若用户未安装浏览器，使用的是系统内核。[微信浏览器到底是什么内核？ - 杨秋实的回答 - 知乎](https://www.zhihu.com/question/22082084/answer/39066794)

> X5 升级了 Webkit -> Blink [微信 Web App 开发最佳实践](https://feday.fequan.com/%E5%BE%AE%E4%BF%A1%20Web%20App%20%E5%BC%80%E5%8F%91%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5-%E6%B1%9F%E5%89%91%E9%94%8B.pdf)

> 微信iOS客户端将于2017年3月1日前逐步升级为WKWebview内核，需要网页开发者提前做好网站的兼容检查和适配。[iOS WKWebview 网页开发适配指南](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1483682025_enmey)
