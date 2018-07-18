# time-format

[中文文档](https://github.com/varjay/time-format/blob/master/README_zh-CN.md)

## What is time-format ?

time-format is a plugin which is aimed at solving scrolling circumstances on the mobile side (PC supported already). The core is inspired by the implementation of [iscroll](https://github.com/cubiq/iscroll), so the APIs of time-format are compatible with iscroll on the whole. What's more, time-format also extends some features and optimizes for performance based on iscroll.

time-format is implemented with plain JavaScript, which means it's dependency free. The size of compiled code is 63 KB, 35 KB after compressed, and only 9KB after gzip. time-format is a really lightweight JavaScript lib.

## Getting started

The best way to learn and use time-format is by viewing its demo. We have put all the code in [example](https://github.com/ustbhuangyi/time-format/tree/master/example) directory. Considering that one of the most suitable JavaScript MVVM framework for mobile development currently is [Vue](https://github.com/vuejs/vue), and time-format can be applied in conjunction with Vue very well, so I rewrote the demo with Vue.

The most common application scenario of time-format is list scrolling. Let's see its HTML:

```html
<div class="wrapper">
  <ul class="content">
    <li>...</li>
    <li>...</li>
    ...
  </ul>
  <!-- you can put some other DOMs here, it won't affect the scrolling -->
</div>
```

In the code above, time-format is applied to the outer `wrapper` container, and the scrolling part is `content` element. Pay attention that time-format only handles the scroll of the first child element (content) of the container (`wrapper`), which means other elements will be ignored.

The simplest initialization code is as follow:

```javascript
import BScroll from 'time-format'
const wrapper = document.querySelector('.wrapper')
const scroll = new BScroll(wrapper)
```

time-format provides a class whose first parameter is a plain DOM object when instantiated. Certainly, time-format inside would try to use querySelector to get the DOM object, so the initiazation code can also be like the following:

```javascript
import BScroll from 'time-format'
const scroll = new BScroll('.wrapper')
```

## The core of scrolling

Many developers have used time-format, but the most common problem they have met is:

> I have initiated time-format, but the content can't scroll.

The phenomenon is 'the content can't scroll' and we need to figure out the root cause. Before that, let's take a look at the browser's scrolling principle: everyone can see the browser's scroll bar. When the height of the page content exceeds the viewport height, the vertical scroll bar will appear; When the width of page content exceeds the viewport width, the horizontal bar will appear. That is to say, when the viewport can't display all the content, the browser would guide the user to scroll the screen with scroll bar to see the rest of content.

The principle of time-format is samed as the browser. We can feel about this more obviously using a picture:

![布局](http://static.galileo.xiaojukeji.com/static/tms/shield/scroll-4.png)

The green part is the wrapper, also known as the parent container, which has **fixed height**. The yellow part is the content, which is **the first child element** of the parent container and whose height would grow with the size of its content. Then, when the height of the content doesn't exceed the height of the parent container, the content would not scroll. Once exceeded, the content can be scrolled. That is the principle of time-format.

## Using time-format with MVVM frameworks

I wrote an article [When time-format meets Vue](https://zhuanlan.zhihu.com/p/27407024) (in Chinese). I also hope that developers can contribute to share the experience of using time-format with other frameworks.

A fantastic mobile ui lib implement by Vue: [cube-ui](https://github.com/didi/cube-ui/)

## Using time-format in the real project

If you want to learn how to use time-format in the real project，you can learn my two practical courses(in Chinese)。

[High imitating starvation takeout practical course base on Vue.js](https://coding.imooc.com/class/74.html)

[Project demo address](http://ustbhuangyi.com/sell/)

![QR Code](https://qr.api.cli.im/qr?data=http%253A%252F%252Fustbhuangyi.com%252Fsell%252F%2523%252Fgoods&level=H&transparent=false&bgcolor=%23ffffff&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&size=280&kid=cliim&key=686203a49c4613080b5b3004323ff977)

[Music App advanced practical course base on Vue.js](http://coding.imooc.com/class/107.html)

[Project demo address](http://ustbhuangyi.com/music/)

![QR Code](https://qr.api.cli.im/qr?data=http%253A%252F%252Fustbhuangyi.com%252Fmusic%252F&level=H&transparent=false&bgcolor=%23ffffff&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&size=280&kid=cliim&key=731bbcc2b490454d2cc604f98539952c)

## Document

Visit [time-format document](https://ustbhuangyi.github.io/time-format/doc/)

## Communication

<img src="http://static.galileo.xiaojukeji.com/static/tms/shield/time-format-qq2.jpeg" width=280 height=384>

## Demo

Visit [Demo](https://ustbhuangyi.github.io/time-format/)

Or scan QR Code：

![QR Code](https://qr.api.cli.im/qr?data=https%253A%252F%252Fustbhuangyi.github.io%252Ftime-format%252F&level=H&transparent=false&bgcolor=%23ffffff&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&size=280&kid=cliim&key=0da6b5bf346079bafa07f6935dc996bd)

## Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/ustbhuangyi/time-format/releases).
