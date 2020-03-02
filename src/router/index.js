import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Hi from '@/components/Hi'
import getbutton from '@/components/getbutton'
import getimage from '@/components/getimage'
import getlinks from '@/components/getlinks'
import inputprice from '@/components/inputprice'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'getlinks',
      component: getlinks
    },
    {
      path: '/hi',
      name: 'Hi',
      component: Hi
    },
    {
      path: '/getbutton',
      name: 'getbutton',
      component: getbutton
    },
    {
      path: '/getimage',
      name: 'getimage',
      component: getimage
    },
    {
      path: '/getlinks',
      name: 'getlinks',
      component: getlinks
    },
    {
      path: '/inputprice',
      name: 'inputprice',
      component: inputprice
    }
  ]
})
