const path = require('path')
const profile = require(path.resolve(__dirname, '../profile'))

const baseURL = profile.baseURL
const baseMapURL = 'http://192.169.4.71' // 地图相关静态资源服务器，地图相关项目部署时需从该地址获取资源

module.exports = {
  '^/api': {
    target: baseURL, // 接口的一般代理地址
    changeOrigin: true
  },
  '^/oauth/token': {
    target: baseURL // 获取PLANTDATA用户认证TOKEN的代理地址
  },
  '^/spa': {
    target: baseURL // SPA项目的代理地址
  },
  '^/plantdata-sdk': {
    target: baseURL // SDK v2的代理地址
  },
  '^/group1': {
    target: baseURL // KGMS中多媒体资源的代理地址（旧版）
  },
  '^/minio': {
    target: baseURL // KGMS中多媒体资源的代理地址（新版）
  },
  '^/cesium': {
    target: baseMapURL // cesium库资源的代理地址
  },
  '^/mapbox': {
    target: baseMapURL // 矢量地图的代理地址
  },
  '^/bing': {
    target: baseMapURL // bing卫星地图瓦片的代理地址
  },
  '^/google': {
    target: baseMapURL // google卫星地图瓦片的代理地址
  },
  '^/wind': {
    target: baseMapURL // 气象地图瓦片的代理地址
  },
  '^/arcgis-zx-y': {
    target: baseMapURL // arcgis街道地图瓦片的代理地址，ZXY顺序
  },
  '^/arcgis-zyx': {
    target: baseMapURL // arcgis街道地图瓦片的代理地址，ZYX顺序
  },
  '^/osm': {
    target: baseMapURL // OSM街道地图瓦片的代理地址
  },
  '^/gd': {
    target: baseMapURL // 某街道地图瓦片的代理地址,十段线+虚线
  },
  '^/mapbox-satellite': {
    target: baseMapURL // Mapbox卫星地图瓦片的代理地址
  }
}
