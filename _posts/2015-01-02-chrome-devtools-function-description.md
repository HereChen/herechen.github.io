---
date: 2017-11-17 10:15:57
layout: post
title: Chrome DevTools
categories: technology
---

F12 进入开发模式, 或者 Inspect Element（检查元素）.

## Elements

1. HTML 元素可以拖动, 从而更换位置; HTML元素内容可以更改.
2. 通过上下左右键, 可以实现元素上下切换, 元素的展开收缩.
3. 右键可以选择编辑HTML、添加元素属性、删除元素、复制元素路径.
4. 在 Styles 栏, 可以通过上下键调整属性值; <kbd>Alt</kbd> + 上下键则以小数调整; <kbd>Shift</kbd> + 上下键以10为单位调整.
5. <kbd>Shift</kbd> + 鼠标左键点击颜色值, 可以更改颜色的表示方式.
6. 在 Computed 栏可以修改元素的边框布局.
7. Event Listeners 可以查看选中元素的绑定事件; 选择函数, 右键可以查看函数的定义.

## Sources

1. 在 Elements 栏, 选中对应元素, <kbd>Ctrl</kbd> + 鼠标左键点击 Styles 栏的样式, 可以定位到 CSS 源文件对应的位置。(在 scss 中, 点击属性值, 可以定位到变量的定义处。).
2. Sources 栏下, 进入 js 文件, 可以进行 js 调试.
3. Sources 栏下的 Snippets 可以添加常用的代码片段.
4. Console 输出：`console.group('')`, `console.groupEnd('')`; `console.time('')`, `console.timeEnd()`; `console.log('')`; `console.error('')`.

## Network

1. 点击 Name 加载进入的资源名链接, 可以查看详细信息(Headers, Response...), 或者右键可直接复制详细信息.
2. 点击 Initiator 定位资源加载对应的位置.
3. 查看资源的加载消耗时间.

## Timeline

1. 查看事件的时间消耗 (由此可以作针对性优化).

## Rendering

1. Rendering 可用于查看页面渲染相关的内容.
2. 启用 Show paint rectangles 可以查看页面交互时哪些元素会重新渲染, 由此减少不必要的渲染.
3. 启用 Show FPS meter 可以查看 GPU 的使用情况.

## 快捷键

| 快捷键 | 作用 |
| ----- | ----- |
| <kbd>Ctrl</kbd> + <kbd>P</kbd> | 文件导航 |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> | 功能导航 |

## 其他

1. 其他的一些功能 Profiles、Audits、Resources.....
2. Firefox 是 gecko 内核, Chrome 是 webkit 内核, 但两者在一些快捷方式上和功能上式类似的.
3. Emulation 可以仿真屏幕大小和设备.
4. 扩展应用: PageSpeed Insights, jQuery Debugger, SnappySnippet.
5. Chrome Snippets [https://bgrins.github.io/devtools-snippets/](https://bgrins.github.io/devtools-snippets/).
6. 设置Preferences可选择主题(Theme).
7. 对当前元素截图: <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd> 选中元素, <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> 输入 `node` 选择 `Capture node screenshot`.
8. 对选择区域截图: <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd>, <kbd>Ctrl</kbd>+ 鼠标右键选择区域, 松开鼠标右键后对选择区域截图.
