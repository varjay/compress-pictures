<template>
  <div class="app on">
    <div class="uploadbtn">
      <em>上传图片</em>
      <input id="upload_img" class="upload-input" ref="img" type="file" @change="change" name="">
    </div>
    <div class="review" v-if="after">
      <h2>预览</h2>
      <div class="image">
        <img :src="after.url">
        <div class="info">
          <h3>压缩前</h3>
          <ul>
            <li>宽度：{{before2.width}}px</li>
            <li>高度：{{before2.height}}px</li>
            <li>尺寸：{{(before2.size/1024).toFixed(2)}}KB</li>
            <!-- <li>类型：{{before.img.type}}</li> -->
          </ul>
          <br>
          <h3>压缩后</h3>
          <ul>
            <li>宽度：{{after.info.width}}px</li>
            <li>高度：{{after.info.height}}px</li>
            <li>尺寸：{{(after.img.size/1024).toFixed(2)}}KB</li>
            <li>类型：{{after.img.type}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import tinypic from '../src/index'
export default {
  data () {
    return {
      before: {
        height: 0,
        width: 0,
        size: 0,
      },
      before2: {},
      after: null,
    }
  },
  watch: {
    before(n) {
      setTimeout(() => {
        this.before2 = n
      }, 100)
    },
  },
  methods: {
    async change() {
      window.img = this.$refs.img
      this.after = await tinypic(this.$refs.img)

      console.log(this.after)

      let MyTest = document.getElementById("upload_img").files[0]
      let reader = new FileReader()
      reader.readAsDataURL(MyTest)
      let that = {}
      reader.onload = function(theFile) {
      　　let image = new Image()
         image.src = theFile.target.result
         image.onload = function() {
          that['size'] = MyTest.size
          that['height'] = this.height
          that['width'] = this.width
         }
      }
      this.before = that
    },
  },
}
</script>
<style lang="less">
@import './less/public.less';
.app{
  padding: 20px 0;
}
.uploadbtn {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  em {
    display: block;
    background: #eee;
    padding: 6px;
    border-radius: 3px;
    color: #666;
  }
}
.upload-input {
  opacity: 0;
  position: absolute;
  width: 76px;
  height: 28px;
  cursor: pointer;
}
.review {
  padding: 20;
  h2 {
    line-height: 2;
  }
  .image {
    position: relative;
    display: table;
    img {
      height: 800px;
      border-radius: 3px;
    }
    .info {
      padding: 10px;
      position: absolute;
      right: 8px;
      top: 8px;
      width: 130px;
      height: 180px;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 3px;
      color: white;
      font-size: 12px;
      line-height: 1.4;
    }
  }
}
</style>