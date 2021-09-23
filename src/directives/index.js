import moment from 'moment'

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
}
