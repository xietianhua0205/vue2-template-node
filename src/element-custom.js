import _ from 'lodash'
import ElementUI from 'element-ui'

window.APP_CONFIG.element.forEach((item, key) => {
  item.forEach((it, prop) => {
    ElementUI[_.upperFirst(key)].props[prop] = {
      default: item[prop]
    }
  })
})
