import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import NewMemo from '@/components/NewMemo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }, {
      path: '/new',
      name: 'NewMemo',
      component: NewMemo
    }
  ]
})
