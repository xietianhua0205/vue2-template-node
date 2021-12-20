const CompressionWebpackPlugin = require('compression-webpack-plugin')
const proxy = require('./build/proxy')
const config = require('./profile')
// const { DOMAIN, PORT } = require('./server/config')
// for (const key in proxy) {
//   proxy[key].target = 'http://' + DOMAIN + ':' + PORT
// }

module.exports = {
  publicPath: '/' + config.base + '/',
  assetsDir: 'static',
  devServer: {
    proxy
  },
  css: {
    loaderOptions: {
      // scss: {
      //   // 全局导入，但会在scss样式中引起无法正确定位变量的警告
      //   prependData: '@import "~@/assets/styles/variables-custom";'
      // },
      sass: {
        implementation: require('sass')
      }
    }
  },
  chainWebpack: config => {
    // // 移除 prefetch 插件
    // config.plugins.delete('prefetch')

    // 或者
    // 修改它的选项：
    // config.plugin('prefetch').tap(options => {
    //   options[0].fileBlacklist = options[0].fileBlacklist || []
    //   options[0].fileBlacklist.push(/chunk-vendors\.(.)+?\.js$/)
    //   return options
    // })
  },
  configureWebpack: {
    devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : '',
    plugins: [
      new CompressionWebpackPlugin({
        threshold: 10240
      })
    ]
  }
  // configureWebpack: config => {
  //   config.module.rules.push(
  //     {
  //       test: path.resolve(__dirname, 'node_modules/leader-line/'),
  //       use: [{
  //         loader: 'skeleton-loader',
  //         options: { procedure: content => `${content}export default LeaderLine` }
  //       }]
  //     }
  //   )
  //   config.devtool = process.env.NODE_ENV !== 'production' ? 'source-map' : ''
  //   config.plugins.push(new CompressionWebpackPlugin({
  //     threshold: 10240
  //   }))
  // }
}
