<template>
  <div class="app on">
    <img src="/img/test.jpg" width="50">
    <div v-for="(d, i) in data" :key="i">
      <div><em>{{i}}</em> {{d.user_name}}</div>
    </div>
  </div>
</template>
<script>
import msort from '../src/index'
export default {
  data () {
    return {
      data: [
        {
          'user_name': '周啊伦'
        },
        {
          'user_name': '周博伦'
        },
        {
          'user_name': '周此伦'
        },
        {
          'user_name': '周低伦'
        },
        {
          'user_name': '周啊妈'
        },
        {
          'user_name': '周西伦'
        },
        {
          'user_name': '周肿伦'
        },
        {
          'user_name': '周宜伦'
        },
        {
          'user_name': '周杰伦'
        },
        {
          'user_name': 'i林俊杰'
        },
        {
          'user_name': '帐号3'
        },
        {
          'user_name': 't2'
        },
        {
          'user_name': 'ta'
        },
        {
          'user_name': 'tc'
        },
        {
          'user_name': 'tb'
        },
        {
          'user_name': 'a'
        },
        {
          'user_name': 't'
        },
        {
          'user_name': 'u'
        },
        {
          'user_name': 'va'
        },
        {
          'user_name': 'vb'
        },
        {
          'user_name': 'w'
        },
        {
          'user_name': '挨踢4'
        },
        {
          'user_name': 'i挨踢4'
        },
        {
          'user_name': '1234'
        },
        {
          'user_name': '1235'
        },
        {
          'user_name': '1233'
        },
        {
          'user_name': '😄'
        },
        {
          'user_name': 'дерация'
        }
      ]
    }
  },
  mounted () {
    this.data = msort(this.data, 'user_name', 0)
  }
}
</script>
<style lang="less">
@import './less/public.less';
.app{
  background: #eee;
}
</style>