---
date: 2015-10-26 10:43:39 AM
title: C/C++ 要点
categories: technology
---

## 面向对象

- 面向对象的特征：抽象、继承、封装、多态。
- 权限：`public`、`private`、`protected`

基类成员 | public 派生 | private 派生 | protected 派生
:------: | :----------:|  :----------:| :----------:
`private`  | 不可访问    | 不可访问     | 不可访问
`public`   | `public`      | `private`      | `protected`
`protected` | `protected`   | `private`      | `protected`

- 多态性

    多态性分为：静态多态性和动态多态性。静态多态性又称编译时多态性，通过函数的**重载**实现。动态多态性又称运行时多态性，通过**虚函数**实现。

## 虚函数, 纯虚函数, 抽象类

**虚函数** 虚函数的作用是允许在派生类中重新定义与基类同名的函数，并且可以通过基类指针或引用来访问基类和派生类中的同名函数。当一个成员函数声明为虚函数后，其派生类中的同名函数自动成为虚函数。

```c++
virtual float area();
```

**纯虚函数** 纯虚函数的作用是在基类中为其派生类保留一个函数的名字，以便派生类根据需要对它进行定义。如果在一个类中声明了纯虚函数，而在其派生类中没有对该函数定义，则该函数在派生类中仍然为虚函数。

```c++
virtual float area() = 0;
```

**虚函数和纯虚函数**

- 虚函数可以为定义了的，也可以没有定义。
- 纯虚函数则是未被定义的，需要在派生类中定义。

**纯虚函数和抽象类** 不用来定义对象而只作为一种基本类型用作继承的类，称为**抽象类**。凡是包含纯虚函数的类都是抽象类。由于纯虚函数不能被调用，抽象类是不能被实例化的。

## 指针

**`void(*signal(int sig,void(*func)(int)))(int);`**

> 从 `signal` 所在的括号开始提取：`void(*signal(  ) )(int);`  首先 `signal` 后缀跟的是括号，我们得到 `signal` 是一个函数， 然后得到前缀为 `*` 表示此函数返回的是一个“……指针”…………最后得到 `signal` 是一个函数，返回函数指针,函数所指向的指针接受一个 `int` 类型的参数并且返回 `void`。
>
然后我们看 `signal` 函数参数本身：`void(*func)(int)` 表示 `func` 是一个函数指针，此指针指向的函数接收一个 `int` 参数，返回值是 `void`。

## 其他

- 运算符重载

    ```c++
    // private: double real; double imag;
    // 声明重载运算符+
    Complex operator+(Complex &c2);
    // 定义重载运算符
    Complex Complex::operator+(Complex &c2){
        Complex c;
        c.real = real + c2.real;
        c.imag = imag + c2.imag;
        return c;
    }
    ```

- 构造函数、析构函数、拷贝函数
- 变量存储
  - 局部变量：栈区
  - 局部静态变量：静态区
  - 全局变量：静态区的常量区
  - 全局静态变量：静态区

- 重载（overload）和重写（overried）

    重写一般是用于子类在继承父类时，重写（重新实现）父类中的方法。重写方法与被重写方法需要与被重写方法保持一致：参数列表、返回值、异常。重写方法的访问修饰符一定要大于被重写方法的访问修饰符（public>protected>default>private）。

    重载一般是用于在一个类内实现若干重载的方法，这些方法的名称相同而参数形式不同。在使用重载时只能通过相同的方法名、不同的参数形式实现。不同的参数类型可以是不同的参数类型，不同的参数个数，不同的参数顺序（参数类型必须不一样）

    reference: [竹木人, 面向对象重写（override）与重载（overload）区别, cnblogs](http://www.cnblogs.com/lonelyDog/archive/2011/11/16/2251011.html)

- ifndef/define/endif 的作用：防止头文件被重复引用

## 函数实现

**`strcpy`：字符串拷贝**

```c++
char *strcpy(char *destStr, char *srcStr){
    assert( destStr != NULL ); // 为空就终止执行
    assert( srcStr != NULL );
    char *dest = destStr;
    while ( *srcStr != '\0' ){
        *destStr++ = *srcStr++; // 先赋值, 地址再自增1
    }
    return dest;
}
```

**`strcmp`：比较字符串**

```c++
int strcmp(const char *str1, const char *str2){  
    while(str1!=NULL && str2!=NULL){  
        while(*str1++ == *str2++){
            // str1==str2
            if(*str1=='\0' && *str2=='\0') return 0;
            // str1<str2
            if( *str1=='\0' ) return -1;
            // str1>str2
            if( *str2=='\0' ) return 1;
        }
    }
    return -2; // 有指针为空的情况  
}
```

reference: [strcpy函数的实现, cnblogs](http://blog.csdn.net/gpengtao/article/details/7464061/)，[AllenNewOk, strcmp函数的两种实现, iteye](http://allennewok.iteye.com/blog/790388)

## 排序

**冒泡**

```c++
void bubble_sort(int[] a, int n){
    int temp, i, j;
    for (i = 0; i < n; i++)
        for (j = i; j < n; j++)
            if (a[i] > a[j]){
                temp = a[i];
                a[i] = a[j];
                a[j] = temp;
            }
}
```

## 参考

- [谭浩强, C++面向对象程序设计, 清华大学出版社, 2006](http://book.douban.com/subject/1731572/)
- [局部变量，静态局部变量，全局变量，静态全局变量在内存中的存放区别, cnblogs](http://www.cnblogs.com/bakari/archive/2012/08/05/2623637.html)
- [C/C++ 笔试、面试题目大汇总, cnblogs](http://www.cnblogs.com/fangyukuan/archive/2010/09/18/1829871.html)
- [hackbuteer1, 虚函数和纯虚函数的区别, cnblogs](http://blog.csdn.net/hackbuteer1/article/details/7558868)
- [笔试面试中C/C++重要知识点整理, Linux公社](http://www.linuxidc.com/Linux/2014-12/111046.htm)
