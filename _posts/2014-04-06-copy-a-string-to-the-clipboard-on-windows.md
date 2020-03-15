---
date: 2014-04-06 15:48:41 +0800
layout: post
title: 系统剪贴板读取和写入 (Windows、Python)
categories: technology
---

我一直希望可以通过快捷的方式复制当前的时间，并且还要能够按既定的格式。于是，就开始考虑怎么向 Windows 系统的剪贴板写入内容，然后直接 Ctrl+V 就可以了。Google 上一搜索，果然是都已经有了，选择了其中精简的 Python 拿出来。

系统：Windows7 x64，Python：3.4.0。
鉴于有几个方法在当前使用存在问题，这里针对性的选择几个可用的。

### 向剪贴板写入字符串

```python
import os
def addToClipBoard(text):
    command = 'echo ' + text.strip() + '| clip'
    os.system(command)

#example
addToClipBoard('Hello, I am a string.')
```

在安装了 Python 的前提下，执行这段代码，或者在 CMD 中输入这段代码文件名并回车，然后，新建一个 txt，Ctrl+V 就可以测试是否成功。

### 向剪贴板写入系统时间

```python
import os
def addToClipBoard(text):
    command = 'echo ' + text.strip() + '| clip'
    os.system(command)

import time
timestr = time.strftime("%Y-%m-%d %H:%M:%S",time.localtime(time.time()))
addToClipBoard(timestr)
```

### 读取剪贴板内容

```python
from tkinter import Tk
r = Tk()

# read the clipboard
c = r.clipboard_get()
print(c)
```

### 扩展阅读

+ 向剪贴板写入内容：[How do i copy a string to the clipboard on windows using python?](http://stackoverflow.com/questions/579687/how-do-i-copy-a-string-to-the-clipboard-on-windows-using-python)
+ 获取系统时间：[Python 获得系统时间](http://blog.csdn.net/menglei8625/article/details/7575809)
+ 读取剪贴板内容：[How do I read text from the (windows) clipboard from python?](http://stackoverflow.com/questions/101128/how-do-i-read-text-from-the-windows-clipboard-from-python)
+ 读取剪贴板内容：[How to read data from clipboard and pass it as value to a variable in python?](http://stackoverflow.com/questions/16188160/how-to-read-data-from-clipboard-and-pass-it-as-value-to-a-variable-in-python)
+ Windows 下 Python 的执行：[How do I make Python scripts executable?](https://docs.python.org/3/faq/windows.html#id3)
