import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import { createAxios } from './axios'
import { addDirectives } from './directives'

import './assets/styles/element-variables.scss'
import './assets/styles/common.scss'
import './assets/icon/iconfont.css'
import './element-custom'
import config from './config'

Vue.prototype.$config = config

Vue.config.productionTip = false

Vue.use(ElementUI)

addDirectives(Vue)

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

createAxios(Vue, app)
