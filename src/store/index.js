import Vue from 'vue'
import Vuex from 'vuex'
import { user, USER } from './modules/user'

Vue.use(Vuex)

const modules = {
  [USER]: user
}

export default new Vuex.Store({
  modules
})
