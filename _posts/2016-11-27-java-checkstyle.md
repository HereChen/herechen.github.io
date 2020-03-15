---
date: 2017-10-31 10:14:39
layout: post
title: Java 代码风格检查(checkstyle)
categories: technology
---

本文描述如何用 checkstyle 检查代码风格，其主页地址 <http://checkstyle.sourceforge.net/>，下载地址 <https://sourceforge.net/projects/checkstyle/files/checkstyle/>。checkstyle 有三种使用方式：

1. 结合 Ant 使用，需要下载 checkstyle jar 文件。
2. 结合 Maven 使用，配置文件配置 checkstyle 版本即可。
3. 使用 eclipse 插件，安装 checkstyle 的插件。

使用 Ant 或者 Maven 时，可以自定义代码风格文件，检查自定义的需要检查的项，比如变量命名、每行最长的字符限制等。

## 代码风格检查与修复工作流 (eclipse)

工作流程：

1. 自定义 checkstyle.xml 配置代码风格检查项。
2. 自定义 eclipse 代码风格和格式化处理。
3. 自定义 JAutodoc 文档项目。
4. eclipse 项目导航每个包处 -> 右键 -> JAutodoc 添加文档 -> Source: Clean Up -> Source: Format。
5. checkstyle 检查。
6. 修复 checkstyle 生成报告中需要修复的项。

说明:

1. eclipse 配置 Formatter: Window -> Java -> Code Style -> Formatter (编辑或者直接导入配置文件)。
2. eclipse 配置 Code Templates: Window -> Java -> Code Templates (编辑或者直接导入配置文件)。
3. Clean Up 可以自动修复一些格式问题，比如 if-else 语句没有大括号的情况。
4. Windows 上，Alt + Shift + R 可以快速修改变量，大部分变量都可以修改。

## ANT 与 checkstyle

**第一步** 下载 checkstyle jar 文件。

**第二步** Ant 配置文件 build.xml。`classpath` 中填写 checkstyle jar 文件路径。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project name="projectname" default="all" basedir=".">
<taskdef resource="com/puppycrawl/tools/checkstyle/ant/checkstyle-ant-task.properties" classpath="checkstyle/checkstyle-6.11.2-all.jar"/>
<target name="checkstyle" >
    <property name="dirs.base" value="${basedir}"/>
    <!--此处在 checktysle 文件夹下放自定义检查项配置-->
    <checkstyle config="checkstyle/checkstyle.xml">
        <formatter type="xml" tofile="${dirs.base}/target/checkstyle_report.xml"/>
        <fileset dir="${dirs.base}" includes="**/*.java"/>
    </checkstyle>
    <xslt in="${dirs.base}/target/checkstyle_report.xml" out="${dirs.base}/target/checkstyle_report.html"/>
</target>
</project>
```

**第三步** `ant checkstyle` 执行，完成后在 `target/checkstyle_report.html` 中查看结果。

## Maven 与 checkstyle

只需配置 pom.xml 文件，`mvn site` 或 `mvn checkstyle:checkstyle` 执行。默认检查 java 后缀的文件。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.project</groupId>
    <artifactId>project</artifactId>
    <packaging>jar</packaging>
    <version>1.0-SNAPSHOT</version>
    <name>project</name>
    <url>http://maven.apache.org</url>
 <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
</properties>
<reporting>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-checkstyle-plugin</artifactId>
            <version>2.17</version>
            <configuration>
                <!--自定义检查项文件路径-->
                <configLocation>checkstyle/checkstyle.xml</configLocation>
            </configuration>
        </plugin>
    </plugins>
</reporting>
</project>
```

## checkstyle.xml 样例

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE module PUBLIC "-//Puppy Crawl//DTD Check Configuration 1.2//EN" "http://www.puppycrawl.com/dtds/configuration_1_2.dtd">
<module name="Checker">
    <!-- 每一行只能定义一个变量 -->
    <module name="MultipleVariableDeclarations">
        <property name="severity" value="error" />
    </module>
    <!-- 对命名规范的检查-->
    <module name="LocalVariableName">
        <property name="format" value="(^[a-z][a-zA-Z0-9]*$)"/>
        <property name="allowOneCharVarInForLoop" value="true" />
    </module>
</module>
```

## Idea checkstyle 配置 (非必须)

使用 Idea 和 eclipse 工作流一样，配合插件可在编辑时修复。

1. 安装 CheckStyle-IDEA 插件。
2. Settings -> Other Settings -> Checkstyle -> Configuration File 可选择自定义代码风格定义文件。
3. Settings -> Inspections -> Checkstyle 勾选和可在编辑中实时检测。

## 常见规范问题

1. 变量命名、包命名：`Name 'Tpassword' must match pattern '(^[a-z][a-zA-Z0-9]*$)'.`.
2. 缩进不正确：`'if rcurly' have incorrect indentation level 16, expected level should be 8.`.
3. `equals` 字符串应放在左边：`String literal expressions should be on the left side of an equals comparison.`.
4. 缺乏注释/javadoc：`Missing a Javadoc comment.`.
5. 单行代码过长：`Line is longer than 160 characters`.

## 注意事项/备注

1. 注意 maven-checkstyle-plugin 的版本，低版本可能会报错。
2. 项目需要按照 Ant 或者 Maven 工程目录结构构建。
3. Idea 代码问题检查还可以安装其他插件: FindBugs-IDEA，SonarLint。

## 问题

**javadoc `@return` 后面没有内容，checkstyle无法执行，报错: `No Match Found`** 可删除 `@return` 或全部替换为后面加一个字符，比如 `@return *`。

[Failed to execute goal org.apache.maven.plugins:maven-site-plugin:](https://stackoverflow.com/questions/33902394/failed-to-execute-goal-org-apache-maven-pluginsmaven-site-plugin)
