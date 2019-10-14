<template>
  <div id="sub-nav">
    <span class="heart">不积跬步无以至千里 不积小流无以成江海</span>
  </div>
</template>

<script>
export default {
  name: 'SubNav',
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
  #sub-nav
    width 100%
    height 187px
    background #333
    color #ffffff
    line-height 187px
    background url(../assets/_bg2.jpg); 
    background-size 100% 100%
    .heart
      display: block;
      width: 100vw;
      font-size: 20px;
      opacity: 0.7;
      line-height: 111px;
      text-align: center;
      color #d41029
      font-weight 600

</style>
