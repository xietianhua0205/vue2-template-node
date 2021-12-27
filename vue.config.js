const CompressionWebpackPlugin = require('compression-webpack-plugin')
const proxy = require('./build/proxy')
const config = require('./profile')
// const { DOMAIN, PORT } = require('./server/config')
// for (const key in proxy) {
//   proxy[key].target = 'http://' + DOMAIN + ':' + PORT
// }

const publicPath = '/' + config.base + '/'

module.exports = {
  publicPath,
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
    if (process.env.NODE_ENV === 'production') {
      // 以下修复更换主题色引起的文件路径错误
      ['css', 'scss', 'sass', 'less'].forEach(rule => {
        const cssRule = config.module.rule(rule);
        ['vue-modules', 'vue', 'normal-modules', 'normal'].forEach(item => {
          cssRule.oneOf(item).use('extract-css-loader').tap(options => {
            options.publicPath = publicPath
            return options
          })
        })
      })
    }
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
