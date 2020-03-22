import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/components/home'
import welcome from '../components/welcome'
import computers from '../components/computer/computers'
import laptop from '../components/computer/laptop'
import online from '../components/users/online'
import offline from '../components/users/offline'

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
      component: home,
      redirect: '/welcome',
      children: [
        {path: '/welcome', component: welcome},
        {path: '/computer', component: computers},
        {path: '/laptop', component: laptop},
        {path: '/online', component: online},
        {path: '/offline', component: offline}
      ]
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
