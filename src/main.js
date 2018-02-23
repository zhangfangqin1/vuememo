import Vue from 'vue'
import App from './App'
// router and store
import router from './router'
import store from './store'
// mintui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// lib-flexible
import 'amfe-flexible'

Vue.config.productionTip = true;
Vue.use(MintUI)

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  render: function (c) {
    return c('App');
  }
})
