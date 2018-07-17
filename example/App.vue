<template>
  <div id="app">
    测试结果：{{test}}
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
  computed: {
    test () {
      return TimeFormat('default', '1531649352000')
    }
  }
}
</script>
