import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import NewMemo from '@/components/NewMemo'
import ShowMemo from '@/components/ShowMemo'
import ModifyMemo from '@/components/ModifyMemo'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Index',
    component: Index
  }, {
    path: '/new',
    name: 'NewMemo',
    component: NewMemo
  }, {
    path: '/modify/:id',
    name: 'ModifyMemo',
    component: ModifyMemo
  }, {
    path: '/:id',
    name: 'ShowMemo',
    component: ShowMemo
  }]
})
