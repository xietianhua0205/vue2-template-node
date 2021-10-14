import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '@/components/NotFound'
import { clearUser } from '@/utils/user'

function isNavAllow (nav) {
  return true
}

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: { name: 'home' }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/TheLogin.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/TheHome.vue'),
    redirect: { name: 'slot' },
    children: [
      {
        path: 'slot',
        name: 'slot',
        component: () => import('@/views/templates/TheSlotDemo.vue')
      }
    ]
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    clearUser()
    if (window.APP_CONFIG.isDev || window.APP_CONFIG.ENV === 'development') {
      next() // 本项目登录页面
    } else { // 产品登录页面，以下3种选择一种，第三种无需服务器端额外配置，可以避免服务器配置问题引起的无限刷新当前页面问题，但登陆地址可能会有不同导致跳转失败
      // 1、产品退出，302到登录页
      const form = document.createElement('form')
      form.action = '/logout'
      form.method = 'POST'
      document.body.appendChild(form)
      form.submit()
      // 2、刷新，302到登录页
      // top.location.reload() // 配置gateway后有效
      // 3、直接定位到登录页
      // top.location.replace('/sso/login') // 未配置gateway时有效
    }
  } else {
    if (isNavAllow({ id: to.name })) {
      next()
    } else {
      next({
        name: 'home'
      })
    }
  }
})

export default router
