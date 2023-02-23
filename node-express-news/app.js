const express = require('express')
const app = express()
const port = 3001
const AppConfig = require('./config')
// 入口文件抽取信息
new AppConfig(app)

app.listen(port, () => {
  console.log(`服务器已经启动了！端口号为${ port }`)
})
