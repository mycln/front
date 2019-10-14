// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import global from '@/libs/global'

// import AsyncComputed from 'vue-async-computed'

Vue.config.productionTip = false

// 全局注册应用配置（后台url接口全局配置）
Vue.prototype.$GLOBAL = global

// Vue.use(AsyncComputed);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
