<template>
  <div id="app">
    获取时间：2018-07-17 14:26<br>
    详细模式：{{test('detail', '2018-07-17 14:26')}}<br>
    简短模式：{{test('short', '2018-07-17 14:26')}}
  </div>
</template>

<script>
import TimeFormat from '../src/index'
window.TimeFormat = TimeFormat
export default {
  data() {
    return {
    }
  },
  methods: {
    test (type, timestamp) {
      return TimeFormat(type, timestamp)
    }
  }
}
</script>
