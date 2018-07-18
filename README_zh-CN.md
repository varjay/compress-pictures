## time-format 是什么

time-format 是一款重点解决多语言时间显示的插件，主要应用于聊天应用，也可用于其他场景。

time-format 是基于原生 JS 实现的，不依赖任何框架。它编译后的代码大小是 63kb，压缩后是 35kb，gzip 后仅有 9kb，是一款非常轻量的 JS lib。

## 起步

yyyy-MM-dd HH:mm:ss

yyyy：年
MM：月
dd：日
HH：24小时
hh：12小时
mm：分钟
ss：秒
week：星期
year：年
month：月
day：日

最简单的初始化代码如下：

``` js
timeformat('default', '2018-02-11 12:08:12')
```
time-format 提供了一个默认的返回方式，返回方式类似于微信的时间返回，具体如下：

``` js
// 假设当前时间为 2018-02-11 12:08:12 
// 今天内的时间
timeformat('default', '2018-02-11 00:08:12') // 00:08

// 昨天内的时间
timeformat('default', '2018-02-10 00:08:12') // 昨天 00:08

// 7天内的时间
timeformat('default', '2018-02-9 12:08:12') // 星期二 12:08

// 超出7天
timeformat('default', '2018-02-1 12:08:12') // 2018-02-1
```

## Changelog

每次改动的详情参考[发版日志](https://github.com/varjay/time-format/releases).
