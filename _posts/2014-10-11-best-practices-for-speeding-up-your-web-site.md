---
date: 2014-10-11 12:00:10
layout: post
title: 网站性能优化的黄金法则
categories: technology
---

[https://developer.yahoo.com/performance/rules.html](https://developer.yahoo.com/performance/rules.html)

## Content (10)

- Make Fewer HTTP Requests
- Reduce DNS Lookups
- Avoid Redirects
- Make Ajax Cacheable
- Postload Components
- Preload Components
- Reduce the Number of DOM Elements
- Split Components Across Domains
- Minimize Number of iframes
- Avoid 404s

## Server (7)

- Use a Content Delivery Network (CDN)
- Add Expires or Cache-Control Header
- Gzip Components
- Configure ETags
- Flush Buffer Early
- Use GET for Ajax Requests
- Avoid Empty Image `src`

## Cookie (2)

- Reduce Cookie Size
- Use Cookie-Free Domains for Components

## CSS (4)

- Put Stylesheets at Top
- Avoid CSS Expressions
- Choose `<link>` Over `@import`
- Avoid Filters

## JavaScript (6)

- Put Scripts at Bottom
- Make JavaScript and CSS External
- Minify JavaScript and CSS
- Remove Duplicate Scripts
- Minimize DOM Access
- Develop Smart Event Handlers

## Images (4)

- Optimize Images
- Optimize CSS Sprites
- Do Not Scale Images in HTML
- Make favicon.ico Small and Cacheable

## Mobile (2)

- Keep Components Under 25 KB
- Pack Components Into a Multipart Document