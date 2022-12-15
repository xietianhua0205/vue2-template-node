import { Base64 } from 'js-base64'
import { getRandomString, signature } from './sm3'
import qs from 'qs'
import { buildLocalServerQueryMd5Str } from '@/utils/common'

function setCompletenessHeader (headers, axiosSettings) {
  try {
    const tsm = new Date().getTime()
    headers.TSM = tsm
    const nonceStr = getRandomString(8)
    let hash = ''
    let queryData = axiosSettings.params
    if (!queryData && axiosSettings.url.includes('?')) {
      queryData = qs.parse(axiosSettings.url.split('?')[1])
      if (queryData && !Object.keys(queryData).length) {
        queryData = undefined
      }
    }
    if (headers && headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      hash = signature(queryData, axiosSettings.data, null, tsm, nonceStr)
    } else {
      hash = signature(queryData, null, axiosSettings.data, tsm, nonceStr)
    }
    headers.nonceStr = nonceStr
    headers.signature = hash
  } catch (e) {
    console.error(e)
  }
}

function setLogHeader (headers, axiosSettings) {
  try {
    let currentMenuParents = window.currentMenuParents || []
    if (currentMenuParents?.[0]?.config?.boundary) {
      currentMenuParents = currentMenuParents.slice(1)
    }
    headers['action-module'] = Base64.encodeURI(currentMenuParents.map((m) => m.name).join('/'))
  } catch (e) {
    console.error(e)
  }
}

function updateLocalServerParams (app, axiosSettings) {
  axiosSettings.params = axiosSettings.params || {}
  axiosSettings.params.md5Str = buildLocalServerQueryMd5Str(axiosSettings.url, axiosSettings.params, axiosSettings.data, axiosSettings.method)
  const USE_LOCAL_DATA = app.$route.query.USE_LOCAL_DATA
  if (USE_LOCAL_DATA) {
    axiosSettings.params = axiosSettings.params || {}
    axiosSettings.params.USE_LOCAL_DATA = USE_LOCAL_DATA
  }
}

export { setLogHeader, setCompletenessHeader, updateLocalServerParams }
