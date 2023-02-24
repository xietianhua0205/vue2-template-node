const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const indexRouter = require('./routes/index')
const passportRouter = require('./routes/passport')
const common = require('./utils/common')


const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')

// 封装成函数的做法
// const appConfig = function (app) {
//   // cookie 注册
//   app.use(cookieParser())
//   // session 注册
//   app.use(cookieSession({
//     name: 'my_session',
//     keys: ['$sdafasfdasfasre*&^^^&&&'],
//     maxAge: 1000 * 60 * 60 * 24 * 2 // 设置过期时间为两天
//   }))
//
//   // 获取post请求参数配置
//   app.use(bodyParser.urlencoded({ extended: false }))
//   app.use(bodyParser.json())
//
//   // css js 图片 等静态资源处理
//   app.use(express.static(path.join(__dirname, 'public', 'news')))
//   // 模板引擎自认为不需要引入,现在用的前后端分离的项目,服务端不需要管理前端的页面，为了课程的流畅度还是依据视频来走一遍
//
//   // 1.修改模板引擎为html，导入express-art-template
//   app.engine('html', require('express-art-template'))
//   // 2.设置运行时的模式为开发模式
//   app.set('view options', { debug: process.env.NODE_ENV !== 'development' })
//   // 3. 设置模板存放的目录为 views 文件夹
//   app.set('views', path.join(__dirname, 'views', 'news'))
//   // 4.设置引擎的后缀为html
//   app.set('view engine', 'html')
// }

// 使用面向对象
class AppConfig {
  constructor (app) {
    this.app = app
    // cookie 注册
    this.app.use(cookieParser())
    // session 注册
    this.app.use(cookieSession({
      name: 'my_session',
      keys: ['$sdafasfdasfasre*&^^^&&&'],
      maxAge: 1000 * 60 * 60 * 24 * 2 // 设置过期时间为两天
    }))

    // 设置路由(注册路由)
    this.app.use(common.csrfProject,indexRouter)
    this.app.use(common.csrfProject,passportRouter)

    // 获取post请求参数配置
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(bodyParser.json())

    // css js 图片 等静态资源处理
    this.app.use(express.static(path.join(__dirname, 'public', 'news')))
    // 模板引擎自认为不需要引入,现在用的前后端分离的项目,服务端不需要管理前端的页面，为了课程的流畅度还是依据视频来走一遍

    // 1.修改模板引擎为html，导入express-art-template
    this.app.engine('html', require('express-art-template'))
    // 2.设置运行时的模式为开发模式
    this.app.set('view options', { debug: process.env.NODE_ENV !== 'development' })
    // 3. 设置模板存放的目录为 views 文件夹
    this.app.set('views', path.join(__dirname, 'views', 'news'))
    // 4.设置引擎的后缀为html
    this.app.set('view engine', 'html')
  }
}

module.exports = AppConfig
