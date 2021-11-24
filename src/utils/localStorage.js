import Vue from 'vue'

function getKeyPrefix () {
  return Vue.prototype.$config.APPName + '-'
}

function setItem (key, value) {
  localStorage.setItem(getKeyPrefix() + key, value)
}

function getItem (key) {
  return localStorage.getItem(getKeyPrefix() + key)
}

function removeItem (key) {
  localStorage.removeItem(getKeyPrefix() + key)
}

export { setItem, getItem, removeItem }
