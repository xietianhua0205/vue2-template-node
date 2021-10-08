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
    if (window.APP_CONFIG.isDev) {
      next() // 本项目登录页面
    } else {
      window.location.reload()
      // window.location.replace('/sso/login') // 产品登录页面
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
