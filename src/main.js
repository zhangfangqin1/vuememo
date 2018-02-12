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
import regular from '@fortawesome/fontawesome-free-regular'

fontawesome.library.add(solid);
fontawesome.library.add(regular);

Vue.config.productionTip = true;
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
