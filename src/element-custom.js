import _ from 'lodash'
import ElementUI from 'element-ui'

_.forEach(window.APP_CONFIG.element, (item, key) => {
  _.forEach(item, (it, prop) => {
    ElementUI[_.upperFirst(key)].props[prop] = {
      default: item[prop]
    }
  })
})
