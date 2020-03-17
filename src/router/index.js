import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/components/home'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/loginout',
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'home',
      component: home
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login/') {
    console.log('-- find path is /login/')
    return next()
  }
  let myToken = window.sessionStorage.getItem('token')
  if (!myToken) {
    console.log('-- token is null')
    return next('/login/')
  }
  next()
})

export default router
