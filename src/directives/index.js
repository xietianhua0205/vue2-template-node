// import moment from 'moment'
import * as moment from 'dayjs'

export function addDirectives (Vue) {
  Vue.directive('dateFormat', {
    inserted: function (el, binding) {
      let valStr = el.innerHTML.trim()
      let format = 'YYYY-MM-DD HH:mm:ss'
      if (binding.value instanceof Object) {
        format = binding.value.format || format
        valStr = binding.value.time || valStr
      } else if (binding.value) {
        format = binding.value
      }
      el.innerHTML = valStr ? moment(valStr).format(format) : ''
    }
  })

  Vue.directive('highlight', {
    update: function (el, binding, vnode) {
      const text = vnode.children[0].text
      let kw = binding.value
      if (kw && text) {
        '.[]^*+?{}()|$'.split('').forEach((o) => {
          kw = kw.replace(o, '\\' + o)
        })
        kw = kw.replace('\\', '\\\\')
        const reg = new RegExp('(' + kw + ')', 'ig')
        el.innerHTML = text.replace(reg, '<span class="highlight">$1</span>')
      } else {
        el.innerHTML = text
      }
    }
  })
}
