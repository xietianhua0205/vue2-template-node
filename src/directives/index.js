import moment from 'moment'

export function addDirectives (Vue) {
  Vue.directive('dateFormat', {
    inserted: function (el, binding) {
      const valStr = el.innerHTML.trim()
      el.innerHTML = valStr ? moment(valStr).format(binding.value || 'YYYY-MM-DD HH:mm:ss') : ''
    }
  })
}
