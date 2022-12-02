import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '@/components/NotFound'
import { clearUser } from '@/utils/user'
import menusConfig from '../../public/menu.json'

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
    path: '/home/:hideHead?',
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
      },
      {
        path: 'dynamic/:kgName/:APK/:hello',
        name: 'dynamic',
        component: () => import('@/views/templates/TheDynamicDemo.vue')
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

function calcRouteValue (route, menus) {
  for (const item of menus) {
    const reg = route.matched[route.matched.length - 1].regex
    if (new RegExp(reg).test(item.value)) {
      return item.value
    } else if (item.children) {
      const value = calcRouteValue(route, item.children)
      if (value) {
        return value
      }
    }
  }
}

function emitRouteChange (to, from, app) {
  const fromValue = calcRouteValue(from, menusConfig)
  const routeValue = calcRouteValue(to, menusConfig)
  if (fromValue !== routeValue) {
    const origin = window.location.origin
    let base = router.options.base
    if (!base.startsWith('/')) {
      base = '/' + base
    }
    if (base.endsWith('/') && routeValue.startsWith('/')) {
      base = base.substring(0, base.length - 1)
    } else if (!base.endsWith('/') && !routeValue.startsWith('/')) {
      base = base + '/'
    }
    app.postMessage({
      route: routeValue,
      base,
      origin
    }, undefined, 'emitRouteChange')
  }
}

function createRouteGuard (config, app) {
  router.beforeEach((to, from, next) => {
    emitRouteChange(to, from, app)
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
