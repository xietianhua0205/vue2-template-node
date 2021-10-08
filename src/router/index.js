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
        path: 'table',
        name: 'table',
        component: () => import('@/views/templates/TheListDemo.vue')
      },
      {
        path: 'iframe',
        name: 'iframe',
        component: () => import('@/views/templates/TheIframeDemo.vue')
      },
      {
        path: 'spa',
        name: 'spa',
        component: () => import('@/views/templates/netchart/TheSPADemo.vue')
      },
      {
        path: 'ndk',
        name: 'ndk',
        component: () => import('@/views/templates/netchart/TheNDKDemo.vue')
      },
      {
        path: 'ndk/custom',
        name: 'ndkCustom',
        component: () => import('@/views/templates/netchart/TheNDKCustomDemo.vue')
      },
      {
        path: 'sdk',
        name: 'sdk',
        component: () => import('@/views/templates/netchart/TheSDKDemo.vue')
      },
      {
        path: 'monaco',
        name: 'monaco',
        component: () => import('@/views/templates/coder/TheMonacoDemo.vue')
      },
      {
        path: 'quill',
        name: 'quill',
        component: () => import('@/views/templates/rich/TheQuillDemo.vue')
      },
      {
        path: 'ol',
        name: 'ol',
        component: () => import('@/views/templates/map/TheOpenLayersDemo.vue')
      },
      {
        path: 'cesium',
        name: 'cesium',
        component: () => import('@/views/templates/map/TheCesiumDemo.vue')
      },
      {
        path: 'mapbox',
        name: 'mapbox',
        component: () => import('@/views/templates/map/TheMapboxDemo.vue')
      },
      {
        path: 'mapbox/local',
        name: 'mapboxLocal',
        component: () => import('@/views/templates/map/TheMapboxLocalDemo.vue')
      },
      {
        path: 'label',
        name: 'label',
        component: () => import('@/views/templates/TheLabelDemo.vue')
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
