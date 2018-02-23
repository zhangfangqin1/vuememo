import Vue from 'vue'
import Router from 'vue-router'
const Index = () => import('@/components/Index')
const NewMemo = () => import('@/components/NewMemo')
const ShowMemo = () => import('@/components/ShowMemo')
const ModifyMemo = () => import('@/components/ModifyMemo')

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
