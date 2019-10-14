<template>
  <div id="head_wrapper">
    <div class="head">
      <span class="h_left">魔鬼的博客</span>
      <ul class="h_right">
        <li><a href="#">Link1</a></li>
        <li><a href="#">Link2</a></li>
        <li><a href="#">Link3</a></li>
        <li><a href="#">Link4</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Head',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='stylus' ref='stylesheet/stylus'>
@import '../assets/stylus/index.styl'
  #head_wrapper
    width 100vw
    height 60px
    border-1px(rgba(240,20,20,0.1))
    .head
      margin 0 auto
      width 70vw
      line-height 60px
      .h_left
        float left
        font-family: Arial,"Lucida Grande","Microsoft Yahei","Hiragino Sans GB","Hiragino Sans GB W3",SimSun,"PingFang SC",STHeiti;
        color #d61564;
        text-shadow: 0 1px 3px rgba(0,0,0,.9);
        font-weight: normal;
        font-size: 26px;
      .h_right
        margin 0 auto
        li
          padding-right 13px
          float right
</style>
