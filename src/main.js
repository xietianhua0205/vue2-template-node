import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import { createAxios } from './axios'
import { addDirectives } from './directives'
// monaco
import * as monaco from 'monaco-editor'
// quill
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
// ol
import 'ol/ol.css'
// mapbox
import 'mapbox-gl/dist/mapbox-gl.css'

import './assets/styles/element-variables.scss'
import './assets/styles/common.scss'
import './assets/icon/iconfont.css'
import './element-custom'

window.monaco = monaco

Vue.config.productionTip = false

Vue.use(ElementUI)

addDirectives(Vue)

window.APP_CONFIG.ENV = process.env.NODE_ENV

Vue.prototype.$config = window.APP_CONFIG

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

createAxios(Vue, app)
