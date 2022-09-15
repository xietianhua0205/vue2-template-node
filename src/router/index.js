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
      },
      {
        path: 'verify',
        name: 'verify',
        component: () => import('@/views/templates/TheVerifyDataDemo.vue')
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

function createRouteGuard (config) {
  router.beforeEach((to, from, next) => {
    if (to.name === 'login') {
      clearUser()
      if (config.isDev) {
        next() // 本项目登录页面
      } else { // 产品登录页面，根据标准的kggateway和nginx配置方式，使用第二种方式跳转
        // // 1、产品退出，302到登录页
        // const form = document.createElement('form')
        // form.action = '/logout'
        // form.method = 'POST'
        // document.body.appendChild(form)
        // form.submit()
        // 2、刷新，302到登录页
        top.location.reload() // 配置gateway后有效
        // 3、直接定位到登录页
        // top.location.replace(config.LOGIN_URL || '/sso/login?redirect=' + top.location.href) // 产品登录页面，配置gateway后有效
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
}

export { router, createRouteGuard }
