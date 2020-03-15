---
date: 2017-02-27 14:04:57
layout: post
title: H5 Android 内嵌示例
categories: technology
---

1. 安装 Android Studio
2. 新建 Android 项目, 更改 MaiinActivity

        public class MainActivity extends AppCompatActivity {

            private WebView webview;

            @Override
            protected void onCreate(Bundle savedInstanceState) {
                super.onCreate(savedInstanceState);
                // setContentView(R.layout.activity_main);

                webview = new WebView(this);
                webview.getSettings().setJavaScriptEnabled(true);
                try {
                    //设置打开的页面地址
                    webview.loadUrl("http://192.168.209.178:8080");
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
                setContentView(webview);
            }
        }

3. 新建一个本地 http-server, 内容包括一个 index.html, html 内容任意写一些内容
4. 启动 Android 项目

备注:

1. loadUrl, IP 不能用 `127.0.0.1`, 可采用本机 IP.
2. 本地资源可用 `file:///android_asset/index.html`, 文件放到 `src/main/assets/` 下.

refer:

1. [error connection refused](http://stackoverflow.com/questions/4905315/error-connection-refused)
2. [ 用android studio创建第一个安卓程序加载html5页面](http://blog.csdn.net/tan397844313/article/details/50708945)
