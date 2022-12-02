import { getItem } from '@/utils/localStorage'

export function updateRouter (app, paramsMap, queryMap) {
  // const pathname = window.location.pathname.substring(process.env.BASE_URL.length)
  const pathname = app.$route.path
  const fullPath = app.$route.fullPath
  const query = Object.assign({}, app.$route.query)
  if (pathname.includes('/:') || Object.keys(query).length) {
    const resolvePath = pathname.split('/').map(path => {
      if (path.startsWith(':')) {
        const key = path.substring(1)
        return paramsMap[key] ?? (app.$config[key] || getItem(key))
      }
      return path
    }).join('/')
    Object.keys(query).forEach(key => {
      query[key] = queryMap[key] ?? (app.$config[key] || getItem(key))
    })
    const newPath = app.$router.resolve({
      path: resolvePath,
      query
    }).route.fullPath
    if (newPath !== fullPath) {
      app.$router.replace({
        path: resolvePath,
        query
      })
    }
  }
}
