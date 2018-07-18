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

time-format 最常见的应用场景是列表滚动，我们来看一下它的 html 结构
```html
<div class="wrapper">
  <ul class="content">
    <li>...</li>
    <li>...</li>
    ...
  </ul>
  <!-- 这里可以放一些其它的 DOM，但不会影响滚动 -->
</div>
```
上面的代码中 time-format 是作用在外层 wrapper 容器上的，滚动的部分是 content 元素。这里要注意的是，time-format 只处理容器（wrapper）的第一个子元素（content）的滚动，其它的元素都会被忽略。

最简单的初始化代码如下：

``` js
import BScroll from 'time-format'
let wrapper = document.querySelector('.wrapper')
let scroll = new BScroll(wrapper)
```
time-format 提供了一个类，实例化的第一个参数是一个原生的 DOM 对象。当然，如果传递的是一个字符串，time-format 内部会尝试调用 querySelector 去获取这个 DOM 对象，所以初始化代码也可以是这样：

``` js
import BScroll from 'time-format'
let scroll = new BScroll('.wrapper')
```

## Changelog

每次改动的详情参考[发版日志](https://github.com/varjay/time-format/releases).
