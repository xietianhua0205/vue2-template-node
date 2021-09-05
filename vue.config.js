const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
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
      }),
      new MonacoWebpackPlugin({
        // https://github.com/Microsoft/monaco-editor-webpack-plugin#options
        // Include a subset of languages support
        // Some language extensions like typescript are so huge that may impact build performance
        // e.g. Build full languages support with webpack 4.0 takes over 80 seconds
        // Languages are loaded on demand at runtime
        languages: ['json'],
        features: ['coreCommands', 'find']
      })
    ]
  }
}
