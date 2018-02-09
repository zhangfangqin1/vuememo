import Vue from 'vue'
import App from './App'
// router and store
import router from './router'
import store from './store'
// mintui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// fontawesome
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'

fontawesome.library.add(solid);

Vue.config.productionTip = false
Vue.use(MintUI)
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
