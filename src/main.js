import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { createRouteGuard, router, emitRouteChange } from './router'
import ElementUI from 'element-ui'
import { createAxios } from './axios'
import { addDirectives } from './directives'
import '@plantdata/pd'

import './assets/styles/common.scss'
import './assets/icon/iconfont.css'
import customElement from './element-custom'
import config from './config'
import { getMaxlengthByKey, setCommonConfig } from '@/utils/verify-data'

Vue.prototype.$config = config

customElement(config.element)

Vue.config.productionTip = false

Vue.use(ElementUI)

addDirectives(Vue)

const app = new Vue({
  router,
  store,
  render: h => h(App)
})

createRouteGuard(config, app)

Vue.prototype.$axios = createAxios(app, config)

setCommonConfig(config.verifyConfig)
Vue.prototype.$getMaxlengthByKey = getMaxlengthByKey

Vue.prototype.$postMessage = (data, path = config.APPName, type = 'emitRouteParams') => {
  if (window.parent) {
    window.parent.postMessage({
      type,
      data,
      path
    }, config.targetOrigin)
  }
}

const openNewWindowEventTimeout = {}

Vue.prototype.$openInNewWindow = (to, current, append) => {
  const r = router.resolve(Object.assign({ params: { hideHead: 'hideHead' } }, to), current, append)
  emitRouteChange(r.route, undefined, app, 'emitOpenNewWindow')
  openNewWindowEventTimeout[r.route.fullPath] = setTimeout(() => {
    window.open(router.resolve(to, current, append).href, '_blank')
  }, 100)
}

window.addEventListener('message', (e) => {
  const {
    data,
    source
  } = e
  if (source === window.parent) {
    if (data.type === 'openNewWindowSuccess') {
      clearTimeout(openNewWindowEventTimeout[data.data.fullPath])
    }
  }
})

app.$mount('#app')

app.$postMessage({
  kgName: config.kgName, // 发送配置的参数
  APK: config.APK,
  w: 1920 // 发送固定值的参数
})

app.$postMessage({
  hello: 'lx' // 发送全局的参数
}, '')
