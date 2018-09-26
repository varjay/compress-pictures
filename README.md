## compress-pictures 是什么

compress-pictures 是一款基于前端JavaScript图片压缩插件，默认以80%质量压缩。

compress-pictures 是基于原生 JS 实现的，不依赖任何框架。它编译压缩后是 2.55kb，gzip 后仅有 1.03kb，是一款非常轻量的 JS lib。

## 压缩逻辑
```js
// 宽高均 <= 1280，图片尺寸大小保持不变
// 宽高均 > 1280 && 宽高比 > 2，
// ----宽大于高 取较小值(高)等于1280，较大值等比例压缩
// ----高大于宽 取较小值(宽)等于1280，较大值等比例压缩 (宽高比在0.5到2之间 )
// 宽或高 > 1280
// ----宽图 图片尺寸大小保持不变
// ----长图 图片尺寸大小保持不变
// 宽大于高 取较大值(宽)等于1280，较小值等比例压缩
// 高大于宽 取较大值(高)等于1280，较小值等比例压缩
```

## 起步

##### 使用方法

``` js
// 安装
npm i compress-pictures -S

// 代码中的使用
let img = await tinypic(this.$refs.img) // 传入input DOM对象
```

##### 默认返回值
compress-pictures 提供了一个默认的返回方式，具体如下：

``` js
{
  url: 图片blob地址,
  img: blob对象,
  info: {
    height: 高度,
    width: 宽度,
  },
}
```

## Changelog

每次改动的详情参考[发版日志](https://github.com/varjay/compress-pictures/releases).
