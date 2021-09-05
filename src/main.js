import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import { createAxios } from './axios'
import moment from 'moment'
import './assets/styles/element-variables.scss'
import './assets/styles/common.scss'
import './assets/icon/iconfont.css'
import './elment-custom'

import * as monaco from 'monaco-editor'

window.monaco = monaco

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.directive('dateFormat', {
  inserted: function (el, binding) {
    const valStr = el.innerHTML.trim()
    el.innerHTML = valStr ? moment(valStr).format(binding.value || 'YYYY-MM-DD HH:mm:ss') : ''
  }
})

window.APP_CONFIG.ENV = process.env.NODE_ENV

Vue.prototype.$config = window.APP_CONFIG

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

createAxios(Vue, app)
