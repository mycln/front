<template>
  <div class="other_wrapper">
    other
    <router-link :to="{name:item.name,params:{category:item.id,linkKeyWord:item}}">{{item.articleNum}}篇</router-link>
  </div>
</template>

<script>
export default {
  name: 'Other',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
