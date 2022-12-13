import Axios from 'axios'
// import qs from 'qs'
import { getToken } from '@/utils/token'
import { buildLocalServerQueryMd5Str } from '@/utils/common'
import { setCompletenessHeader, setLogHeader } from '@/utils/build-headers'

export function createAxios (app, config) {
  if (config.isDev) {
    config.token = getToken()
    if (!config.token) {
      import('../build/token.json').then((e) => {
        if (e.token) {
          config.token = 'bearer ' + e.token
        }
      })
    }
  }

  const exUrl = ['/oauth/token']

  const axios = Axios.create({
    baseURL: ''
  })

  axios.interceptors.request.use(function (settings) {
    if (config.token && !exUrl.find(url => url === settings.url)) {
      settings.headers = settings.headers || {}
      settings.headers.authorization = settings.headers.authorization || config.token
    }
    // if (settings.url.startsWith('/plantdata-sdk')) {
    //   settings.baseURL = ''
    //   if (settings.method === 'post') {
    //     const keys = Object.keys(settings.data)
    //     for (const key of keys) {
    //       if (settings.data[key] instanceof Array) {
    //         settings.data[key] = JSON.stringify(settings.data[key])
    //       }
    //     }
    //     settings.data = qs.stringify(settings.data) // 转为formdata数据格式
    //   }
    //   settings.headers = settings.headers || {}
    //   settings.headers.APK = settings.headers.APK || config.APK
    //   settings.params = settings.params || {}
    //   settings.params.kgName = settings.params.kgName || config.kgName
    // }
    if (process.env.VUE_APP_START_TYPE === 'local') {
      settings.params = settings.params || {}
      settings.params.md5Str = buildLocalServerQueryMd5Str(settings.url, settings.params, settings.data, settings.method)
      const USE_LOCAL_DATA = app.$route.query.USE_LOCAL_DATA
      if (USE_LOCAL_DATA) {
        settings.params = settings.params || {}
        settings.params.USE_LOCAL_DATA = USE_LOCAL_DATA
      }
    }
    if (config.verifyConfig.switch.completeness) {
      setCompletenessHeader(settings.headers, settings)
    }
    if (config.logParamInHeader) {
      setLogHeader(settings.headers, settings)
    }
    return settings
  }, function (error) {
    return Promise.reject(error)
  })

  axios.interceptors.response.use(function (response) {
    let errorInfo = ''
    if (response.headers['content-disposition']?.indexOf('attachment;') === 0) {
      return response
    } else if (response.config.url === '/oauth/token') {
      const data = response.data
      if (data.message || data.ErrorInfo) {
        errorInfo = data.message || data.ErrorInfo
        if (data.data?.length) {
          errorInfo += '：'
          for (const item of data.data) {
            errorInfo += item.path + ' ' + item.message + ';'
          }
        }
        const error = new Error(`${data.errCode || data.ErrorCode}-/${errorInfo}`)
        app.$message.error(errorInfo)
        return Promise.reject(error)
      } else {
        return data
      }
    } else {
      const data = response.data
      if (data.errCode === 200 || data.errCode === 0 || data.ErrorCode === 0) {
        if (typeof data.count === 'number') {
          return {
            data: data.data,
            count: data.count
          }
        } else {
          return data.data || data.data === 0 || data.data === false ? data.data : {}
        }
      } else if (data.errCode === 201) {
        app.$router.replace({
          name: 'login'
        })
        return data.data || data.data === 0 || data.data === false ? data.data : {}
      } else if (data.message || data.ErrorInfo) {
        errorInfo = data.message || data.ErrorInfo
        if (data.data?.length) {
          errorInfo += '：'
          for (const item of data.data) {
            errorInfo += item.path + ' ' + item.message + ';'
          }
        }
      } else {
        errorInfo = '未知错误'
      }
      const error = new Error(`${data.errCode || data.ErrorCode}-/${errorInfo}`)
      app.$message.error(errorInfo)
      return Promise.reject(error)
    }
  }, function (httpError) {
    const response = httpError.response
    let errorInfo = ''
    let code = ''
    if (response) {
      if (response.status === 401) {
        app.$router.replace({
          name: 'login'
        })
        return
      } else if (response.status === 403) {
        errorInfo = '暂无权限，无法操作'
      } else {
        if (response.data && response.data.message) {
          errorInfo = response.data.message
        } else {
          errorInfo = response.statusText || response.status
        }
        code = response.status
      }
    } else {
      errorInfo = '未知错误'
      code = 1
    }
    const error = new Error(`${code}-/${errorInfo}`)
    app.$message.error(errorInfo)
    return Promise.reject(error)
  })

  return axios
}
