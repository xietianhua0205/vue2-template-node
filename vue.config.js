const CompressionWebpackPlugin = require('compression-webpack-plugin')
const path = require('path')
const proxy = require('./build/proxy')
const config = require('./profile')

if (process.env.START_TYPE?.trim() === 'local') {
  const { DOMAIN, PORT } = require('./server/config')
  for (const key in proxy) {
    proxy[key].target = 'http://' + DOMAIN + ':' + PORT
  }
}
const publicPath = '/' + config.base + '/'
const primaryColor = process.env.VUE_APP_PRIMARY_COLOR = '#00b38a'
const theme = process.env.VUE_APP_THEME = 'default'
process.env.VUE_APP_LAYOUT = 'top'

module.exports = {
  publicPath,
  outputDir: 'dist/' + config.base,
  assetsDir: 'static',
  devServer: {
    proxy
  },
  css: {
    loaderOptions: {
      scss: {
        // 全局导入，但会在scss样式中引起无法正确定位变量的警告
        prependData: (loaderContext) => {
          const {
            resourcePath,
            rootContext
          } = loaderContext
          const relativePath = path.relative(rootContext, resourcePath)
          if (relativePath === 'src\\assets\\styles\\common.scss') {
            return `$--color-primary: ${primaryColor};
            @import "~@/assets/styles/themes/${theme}/common";`
          } else {
            return `$--color-primary: ${primaryColor};
            @import "~@/assets/styles/themes/${theme}/variables-custom";`
          }
        }
      },
      sass: {
        implementation: require('sass')
      },
      less: {
        additionalData: (content, loaderContext) => {
          const {
            resourcePath,
            rootContext
          } = loaderContext
          const relativePath = path.relative(rootContext, resourcePath)
          if (relativePath === 'src\\assets\\styles\\graph.less') {
            return `@import "~@/assets/styles/themes/${theme}/graph";
            @color-primary: ${primaryColor};`
          } else {
            return content + `
            @color-primary: ${primaryColor};`
          }
        }
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
