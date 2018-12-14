import Vue from 'vue'
import Router from 'vue-router'
import Joshardy from '@/components/Joshardy'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Joshardy',
      component: Joshardy
    }
  ]
})
