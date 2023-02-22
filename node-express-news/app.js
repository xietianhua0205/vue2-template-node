const express = require('express')
const app = express()
const port = 3001
const AppConfig = require('./config')
// 入口文件抽取信息
new AppConfig(app)
// 测试cookie 和 session
app.get('/set_cookie', (req, res) => {
  res.cookie('name', 'nodejs')
  req.session.age = 20
  res.send('设置了cookie和session1')
})

app.get('/get_cookie', (req, res) => {
  const name = req.cookies.name
  const age = req.session.age
  res.send(`设置的cookie值为${name},设置的session值为${age}`)
})

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`服务器已经启动了！端口号为${ port }`)
})
