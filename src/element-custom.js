import _ from 'lodash'
import ElementUI from 'element-ui'

export default function customElement (config) {
  _.forEach(config, (item, key) => {
    const props = ElementUI[_.upperFirst(key)].props
    _.forEach(item, (it, prop) => {
      if (typeof props[prop] === 'function' || (props[prop] instanceof Array)) {
        props[prop] = {
          type: props[prop]
        }
      }
      props[prop] = _.merge(props[prop], { default: item[prop] })
    })
  })
}
