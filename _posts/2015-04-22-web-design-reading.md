---
date: 2015-04-19 9:52:30 AM
layout: post
title: Web 设计阅读摘抄
categories: reading
---

## 精通CSS: 高级Web标准解决方案 (第2版)

1. 应该根据“它们是什么”为元素命名，而不应该根据“它们的外观如何”来命名。
2. 显示人、地点或日期类型信息：微格式（page-12）
    - 用于日期、日历和事件：hCalendar
    - 用于人之间的关系：hCard
    - 用于产品说明：hProduct
    - 用于原料和烹饪步骤：hRecipe
    - 用于产品和事件审查：hReview
    - 用于博客帖子等片段式内容：hAtom
    - <http://microformats.org>
3. 链接图标（下划线，外链接）
4. 图像映射：标示图片中的事物。(图片和映射内容放在一个 div 中。外层加 position:relative，内层用 positoin:absolute)
5. 等高列
    - 设置容器 position:relative
    - 设置元素 position:absolute, bottom:0

## 响应式Web设计实践

1. 对大屏幕支持

    ```css
    @media all and (min-width:1300px){
      .main section{
        column-count:2;
        colum-gap:1.5em;
        column-rule:1px dotted #ccc;
      }
    }
    ```

2. 延迟加载图片(将图片链接放置 data-src 属性中，待页面加载完成，通过 JavaScript 加载图片。)
3. 通过媒体检查在不同的设备加载图片（或不在移动设备加载图片）
4. Adobe Shadow 设备测试

## 渐进增强的Web设计

1. 备用背景颜色：设置备用背景颜色，以防图片未能加载或被禁用
2. 避免内联JavaScrip：比如onclick或者onmousemove应避免添加到HTML中。
3. 在内容就绪时运行脚本：document.body.onload, $(document).ready()
4. 通过评分组件是实现评分 jQuery.starRating.js
