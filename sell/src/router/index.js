import Vue from 'vue'
import Router from 'vue-router'
import Home from '../../src/pages/home/Home'
import Goods from '../../src/pages/home/components/homeGoods'
import Seller from '../../src/pages/home/components/homeSeller'
import Ratings from '../../src/pages/home/components/homeRatings'
Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/goods',
          component: Goods
        },
        {
          path: '/seller',
          component: Seller
        },
        {
          path: '/ratings',
          component: Ratings
        }
      ]
    }
  ]
})
