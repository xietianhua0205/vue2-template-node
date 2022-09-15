import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { createRouteGuard, router } from './router'
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

createRouteGuard(config)

Vue.prototype.$axios = createAxios(app, config)

setCommonConfig(config.verifyConfig)
Vue.prototype.$getMaxlengthByKey = getMaxlengthByKey

app.$mount('#app')
