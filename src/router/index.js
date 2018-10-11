import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import loading from '@/commons/publics/loading'
import register from '@/commons/publics/register'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'loading',
      component: loading
    },
    {
      path: '/index',
      component: index
    },
    {
      path: '/register',
      component: register
    }
  ]
})
