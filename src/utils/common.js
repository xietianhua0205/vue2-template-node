import Md5 from 'md5'

function listToTree (arr, pId = 0, valueKey = 'value', labelKey = 'label', pIdKey = 'pId') {
  const list = arr.filter(a => a[pIdKey] === pId)
  if (list?.length) {
    for (const item of list) {
      const id = item[valueKey]
      const children = listToTree(arr, id, valueKey, labelKey, pIdKey)
      if (children?.length) {
        item.children = children
      }
    }
  }
  return list
}

function getStyle (el, name) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(el, null)[name]
  } else {
    return el.currentStyle[name]
  }
}

/**
 * ajax示例
 * beforeSend: (jqXHR, settings) => {
          if (this.$config.isDev) {
            const md5Str = buildLocalServerQueryMd5Str(settings.url.split('?')[0], settings.queryData, settings.formData, settings.method)
            settings.url += (settings.url.indexOf('?') > 0 ? '&' : '?') + 'md5Str=' + md5Str
            const USE_LOCAL_DATA = this.$route.query.USE_LOCAL_DATA
            if (USE_LOCAL_DATA) {
              settings.url += '&USE_LOCAL_DATA=' + USE_LOCAL_DATA
            }
          }
        }
 * @param url
 * @param params
 * @param data
 * @param method
 */
function buildLocalServerQueryMd5Str (url, params, data, method) {
  params = params instanceof Object ? JSON.stringify(params) : params
  data = data instanceof Object ? JSON.stringify(data) : data
  return Md5(JSON.stringify({
    url,
    params: params || '',
    data: data || '',
    method: method || 'GET'
  }))
}

export { listToTree, getStyle, buildLocalServerQueryMd5Str }
