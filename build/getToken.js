const request = require('request')
const fs = require('fs')
const path = require('path')
const profile = require('../profile')
const chalk = require('chalk')
let moduleName = ''
try {
  for (const item of JSON.parse(process.env.npm_config_argv).remain) {
    if (item.startsWith('--env.name=')) {
      moduleName = item.substring('--env.name='.length)
    }
  }
} catch (e) {
}
if (moduleName === 'admin' || process.argv.splice(2)[0] === 'admin') {
  profile.password = profile.adminPassword
  profile.username = profile.adminUsername
}
const form = {
  password: profile.password,
  username: profile.username,
  grant_type: 'password',
  scope: 'all',
  client_id: 'hiekn',
  client_secret: 'plantdata'
}

console.log(form.username, form.password)

var options = {
  method: 'POST',
  url: profile.baseURL + '/oauth/token',
  headers: {
    'cache-control': 'no-cache',
    'content-type': 'application/x-www-form-urlencoded'
  },
  form
}
request(options, function (error, response, body) {
  if (error) {
    console.log(error)
    throw new Error(error)
  }
  const data = JSON.parse(body)
  if (data && data.access_token) {
    const token = { token: data.access_token }
    fs.writeFileSync(path.resolve(__dirname, 'token.json'), JSON.stringify((token), null, '   '))
    console.log(chalk.green('token获取成功'))
  } else {
    console.error(chalk.red('token获取失败'))
  }
})
