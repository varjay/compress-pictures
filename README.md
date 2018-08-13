## mixed-sort 是什么

mixed-sort 是一款基于前端JavaScript中英文排序的插件，开发时应用于通讯录排序，也可用于其他场景。

mixed-sort 是基于原生 JS 实现的，不依赖任何框架。它编译后的代码大小是 3.6kb，压缩后是 2.1kb，gzip 后仅有 1.03kb，是一款非常轻量的 JS lib。

## 起步

##### 使用方法

``` js
msort(array, key, options)

array: // 排序对象，例如：
[
  {
    'user_name': '123'
  },
  {
    'user_name': '王小明'
  },
  {
    'user_name': '阿红'
  },
  {
    'user_name': '周此伦'
  }
]

key: // 排序的key名称，例如：“user_name”

options: // 是否包含字母头，0为不包含，默认值1
```

##### 默认返回值
mixed-sort 提供了一个默认的返回方式，具体如下：

``` js
msort(array, 'user_name')
// 将返回如下：
[
  {
    le: 'a'
  },
  {
    'user_name': '阿红'
  },
  {
    le: 'w'
  },
  {
    'user_name': '王小明'
  },
  {
    le: 'z'
  },
  {
    'user_name': '周此伦'
  },
  {
    le: '#'
  },
  {
    'user_name': '123'
  }
]


msort(array, 'user_name', 0)
// 将返回如下：
[
  {
    'user_name': '阿红'
  },
  {
    'user_name': '王小明'
  },
  {
    'user_name': '周此伦'
  },
  {
    'user_name': '123'
  }
]
```

## Changelog

每次改动的详情参考[发版日志](https://github.com/varjay/mixed-sort/releases).
