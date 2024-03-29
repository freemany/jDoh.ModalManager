import Vue from 'vue'
import Router from 'vue-router'
import ModalHolder from './modules/ModalHolder';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: ModalHolder,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './modules/About.vue')
    }
  ]
})
