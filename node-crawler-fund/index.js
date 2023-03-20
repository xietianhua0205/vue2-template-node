const https = require('http')
const cheerio = require('cheerio')
const download = require('download')
const fs = require("fs-extra");
const path = require("path");

const HOST = 'https://web.itheima.com/'

// 动态渲染的网站该怎么办了？(前端网站写了模板)

const req = https.request('http://fund.eastmoney.com/014854.html', (res) => {
  const chunks = []
  res.on('data', chunk => {
    chunks.push(chunk)
  })
  // 监听end事件,获取数据完毕时候触发
  res.on('end', () => {
    const htmlStr = Buffer.concat(chunks).toString('utf-8')
    fs.writeFileSync(path.resolve(__dirname, 'index.html'), htmlStr)
    console.log(htmlStr)
    // const $ = cheerio.load(htmlStr)
    // console.log(imgs)
    // 地址有中文
    // Promise.all(imgs.map(url => download(url, 'dist'))).then((res) => {
    //   console.log('下载成功！')
    // })
  })
})

// 将请求发送出去
req.end()
