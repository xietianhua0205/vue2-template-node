const app = require('express')()
const fs = require('fs-extra')
const qs = require('qs')
const http = require('http')
const path = require('path')
const zlib = require('zlib')
const request = require('request')
// const httpProxy = require('http-proxy-middleware')
const { DOMAIN, PORT } = require(path.resolve(__dirname, 'config'))
const proxy = require(path.resolve(__dirname, '../build/proxy'))

const httpServer = http.createServer(app)

httpServer.listen(PORT, function () {
  console.log('HTTP Server is running on: http://%s:%s', DOMAIN, PORT)
})

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  // res.header("Access-Control-Allow-Credentials", "true");
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

for (const key in proxy) {
  app.use(key, (req, res) => {
    const url = proxy[key].target + req.originalUrl
    if (req.headers.accept.indexOf('application/json') >= 0 || req.headers.accept.indexOf('*/*') >= 0) {
      const dataPath = path.resolve(__dirname) + '/data' + req.originalUrl.split('?')[0] + '.json'
      const md5Str = qs.parse(req.originalUrl.split('?')[1]).md5Str
      const reqLocalData = () => {
        try {
          const data = fs.readJsonSync(dataPath)
          if (data && data[md5Str]) {
            const json = {
              errCode: 200,
              data: data[md5Str]
            }
            res.status(200).send(JSON.stringify(json))
          } else {
            res.status(200).send(JSON.stringify({
              errCode: 500,
              message: '找不到数据'
            }))
          }
        } catch (e) {
          res.status(200).send(JSON.stringify({
            errCode: 500,
            message: '找不到数据'
          }))
        }
      }
      if (req.url.indexOf('USE_LOCAL_DATA') < 0) {
        req.pipe(request(url, {
          headers: {
            'Accept-Encoding': 'gzip'
          },
          encoding: null
          // eslint-disable-next-line handle-callback-err
        }, (error, response, body) => {
          if (response && (!response.headers['content-type'] || response.headers['content-type'].startsWith('application/json'))) {
            if (response.statusCode === 200) {
              const doResult = (body) => {
                res.status(200).send(body)
                if (body && !fs.existsSync(dataPath)) {
                  fs.mkdirpSync(path.dirname(dataPath))
                  let data = {}
                  try {
                    data = fs.readFileSync(dataPath)
                  } catch (e) {
                  }
                  data[md5Str] = JSON.parse(body).data
                  fs.writeJson(dataPath, data)
                }
              }
              if (response.headers['content-encoding'] === 'gzip') {
                // eslint-disable-next-line handle-callback-err
                zlib.unzip(body, (err, buffer) => {
                  doResult(buffer.toString())
                })
              } else {
                doResult(body)
              }
            } else {
              reqLocalData()
            }
          }
        })) // .pipe(res)
      } else {
        reqLocalData()
      }
    } else {
      req.pipe(request(url)).pipe(res)
    }
  })
  // app.use(key, httpProxy.createProxyMiddleware(proxy[key]));
}
