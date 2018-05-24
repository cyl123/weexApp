import Vue from 'vue'
/*global Vue*/
import Router from 'vue-router'
import LoginPage from '@/components/LoginPage'
import Main from '@/components/Main'
import WelcomePage from '@/components/WelcomePage'

Vue.use(Router)

module.exports = new Router({
  routes: [
    {
      path: '/',
      name: 'WelcomePage',
      component: WelcomePage
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      meta:{
        keepAlive:true,
      }
    },
  ]
})
