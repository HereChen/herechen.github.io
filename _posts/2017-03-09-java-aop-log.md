---
date: 2017-03-09 15:01:44
layout: post
title: Java AOP 记录请求日志
categories: technology
---

1. 实现思路同样适用于非 HTTP 请求类型日志记录。
2. 本文需求是: 通过日志记录 Controller 中的请求。
3. 本文不对日志相关的配置作说明。
4. 完整示例可以直接看参考。

## 环境

1. apache-tomcat-8.5.11
2. jdk1.8.0_121 (1.7 也可以)

## 配置

1. `pom.xml`

    ```xml
    <dependency>
        <groupId>org.aspectj</groupId>
        <artifactId>aspectjrt</artifactId>
        <version>1.8.4</version>
    </dependency>
    <dependency>
        <groupId>org.aspectj</groupId>
        <artifactId>aspectjweaver</artifactId>
        <version>1.8.4</version>
    </dependency>
    <dependency>
        <groupId>cglib</groupId>
        <artifactId>cglib</artifactId>
        <version>2.2</version>
    </dependency>
    ```

2. `dispatcher-servlet.xml`

    ```xml
    <context:component-scan base-package="com.xx.xxxx" />
    <aop:aspectj-autoproxy />
    ```

## 实现

日志记录实现

```java
import org.apache.log4j.Logger;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Before;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;

/**
* Order(3) 制定 Aspect 处理顺序, 数值越小, 优先级越高
*/
@Aspect()
@Order(3)
@Component()
public class HttpLogAspect {

    private Logger logger = Logger.getLogger(getClass());
    private ThreadLocal<Long> startTime = new ThreadLocal<Long>(); // 记录请求与响应花费的时间

    @Pointcut("within(@org.springframework.stereotype.Controller *)")
    public void controller() {}

    @Pointcut("execution(* *.*(..))")
    protected void allMethod() {}

    /**
    * 执行前
    * 记录 HTTP 请求详细
    * @param joinPoint joinPoint
    */
    @Before("controller() && allMethod()")
    public void logBefore(JoinPoint joinPoint) {
        // 开始计时
        startTime.set(System.currentTimeMillis());

        logger.info("** START HTTP REQUEST **");

        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();

        // 记录类名及方法名
        logger.info("HTTP_CLASS_METHOD : " + joinPoint.getSignature().getDeclaringTypeName() + "."
            + joinPoint.getSignature().getName());
        // 记录请求参数
        logger.info("HTTP_ARGUMENTS :  " + Arrays.toString(joinPoint.getArgs()));

        if (null != request) {
            // 记录请求地址
            logger.info("HTTP_REQUEST_URL : " + request.getRequestURL().toString());
            // 记录请求方法
            logger.info("HTTP_METHOD : " + request.getMethod());
            // 记录请求 IP
            logger.info("HTTP_REQUEST_IP : " + request.getRemoteAddr());
        }
    }

    /**
    * 执行后
    * 请求结束, 记录返回内容
    * @param result 响应内容
    */
    @AfterReturning(pointcut = "controller() && allMethod()", returning = "result")
    public void logAfterReturning(Object result) {
        logger.info("HTTP_RESPONSE : " + result);
        // 结束计时
        logger.info("HTTP_SPEND_TIME : " + (System.currentTimeMillis() - startTime.get()) + " ms");
        logger.info("** END HTTP REQUEST **");
    }

}
```

## 参考

参考中有完整示例, 本文日志记录的 AOP 实现略有更改, 结合了第一篇和第二篇的优点. 比如没有作异常处理, 可以单独在每个方法中记录; 无需像第一篇参考一样, 添加额外的 request 参数, 这样 Controller 中 request 可能会成为无用的参数; 通过 `within(@org.springframework.stereotype.Controller *)` 对所有请求进行处理.

1. <http://www.makeinjava.com/logging-aspect-restful-web-service-using-spring-aop-log-requests-responses/>
2. <http://blog.didispace.com/springbootaoplog/>
3. <http://www.journaldev.com/2583/spring-aop-example-tutorial-aspect-advice-pointcut-joinpoint-annotations>
4. <http://stackoverflow.com/questions/3310115/spring-aop-advice-on-annotated-controllers>
