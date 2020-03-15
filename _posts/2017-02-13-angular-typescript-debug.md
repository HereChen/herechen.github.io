---
date: 2017-02-13 15:52:42
layout: post
title: Angular2 TypeScript 调式
categories: technology
---

采用 TypeScript 编写 Angular 应用时, 可以有两种调试方案: 在浏览器中调试和在编辑器中调试. 调试的对象自然是 TypeScript. 目前知道的方案有以下几种:

1. 采用 [quickstart](https://github.com/angular/quickstart) 的方案, 可以直接在浏览器中调试 TypeScript. 
2. 采用 [Angular CLI](https://github.com/angular/angular-cli) 新建项目, 需要浏览器在 JS 中设置断点, 然后跳转到对应的 TS 源码处.
3. 在第二种方案的基础上, 另外一种方案则是在 Visual Studio Code 中调试 TypeScript. 

quickstart 的方案调式起来很方便, 浏览器可以直接 TS 里面设置断点, 但是需要加额外的 JS 辅助. 第二种方案需要在 JS 中设置断点, 麻烦在于要找到 TS 中对应编译出来的 JS 位置. 第三种方案可以直接在 VSCode 中设置 TS 断点, 浏览器运行到对应位置时暂停并跳转到 VSCode, 能够在 VSCode 中进行调试.

第三种方案的配置过程如下:

1. VSCode 安装 Debug in Chrome
2. 配置 lunch.json (文件找不到可以 F5 弹出提示后配置)

    ````json
    {
        "version": "0.2.0",
        "configurations": [
            {
                "type": "chrome",
                "request": "launch",
                "name": "Launch Chrome",
                "url": "http://localhost:4200",
                "sourceMaps": true,
                "webRoot": "${workspaceRoot}"
            },
            {
                "name": "Attach to Chrome, with sourcemaps",
                "type": "chrome",
                "request": "attach",
                "port": 9222,
                "sourceMaps": true,
                "webRoot": "${workspaceRoot}",
                "url": "http://localhost:4200/*"
            }
        ]
    }
    ````

3. 关闭 Chrome, `chrome --remote-debugging-port=9222` 启动
4. Chrome 不要打开 F12 开发工具, VSCode 中 F5
5. VSCode 中 TypeScript 代码设置断点
