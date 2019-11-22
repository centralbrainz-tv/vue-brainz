// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import StarRating from 'vue-star-rating'
import VueDisqus from 'vue-disqus'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
Vue.config.productionTip = false
Vue.component('star-rating', StarRating)
Vue.use(VueDisqus)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
