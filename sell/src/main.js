// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../src/assets/stylus/index.styl'
import '../src/assets/stylus/style.css'
import '../static/css/reset.css'
import Resource from 'vue-resource'

Vue.config.productionTip = false
Vue.use(Resource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
