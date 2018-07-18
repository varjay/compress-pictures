## time-format 是什么

time-format 是一款重点解决多语言时间显示的插件，主要应用于聊天应用，也可用于其他场景。

time-format 是基于原生 JS 实现的，不依赖任何框架。它编译后的代码大小是 63kb，压缩后是 35kb，gzip 后仅有 9kb，是一款非常轻量的 JS lib。

## 国际化语言支持
time-format 会自动根据当地的语言返回显示的格式，当前只支持中英文。

##### 返回格式：
``` js
中文：2018年7月8日 23:04 / 昨天 23:04
英文：8 jul 2018 23:04 / Yesterday 23:04
```

## 起步

##### 使用方法

``` js
// 日期也可以传13位时间戳
timeformat('detail', '2018-02-11 12:08:12')
```

##### 默认返回值
time-format 提供了一个默认的返回方式，返回方式类似于微信的时间返回，具体如下：

``` js
// 假设当前时间为 2018-02-11 12:08:12 
// 今天内的时间
timeformat('default', '2018-02-11 00:08:12') // 00:08

// 昨天内的时间
timeformat('default', '2018-02-10 00:08:12') // 中文：昨天 00:08，英文：Yesterday 00:08

// 7天内的时间
timeformat('default', '2018-02-9 12:08:12') // 中文：星期二 12:08，英文：Tuesday 12:08

// 超出7天
timeformat('default', '2018-02-1 12:08:12') // 中文：2018年02月01日 12:08，英文：1 jan 2018 12:08
```

##### 选项
timeformat 第一个参数有3中可选：`detail` `short` `ago` 可选；
并提供了自定时间格式支持，只需对第一个参数自定义即可，格式如下：
``` js
// 与普通的格式使用一套方法来自定义
yyyy-MM-dd HH:mm:ss

yy：年(2位)
yyyy：年
MM：月
dd：日
HH：24小时
hh：12小时
mm：分钟
ss：秒

// 除了支持通用格式外，另外增加了以下支持
month：月 // 例如：八月/August
week：星期 // 例如：星期五/Friday
```

## Changelog

每次改动的详情参考[发版日志](https://github.com/varjay/time-format/releases).
