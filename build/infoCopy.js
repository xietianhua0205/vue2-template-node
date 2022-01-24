const fs = require('fs')
const ip = require('ip')
const path = require('path')
const cp = require('child_process')

let version = ''
let source = ''

const pkg = require('../package.json')
let infoData = require('./info.json')
const date = new Date()
infoData.publishTime = date.toLocaleDateString() + ' ' + date.toLocaleTimeString()

infoData.author = ip.address().split('.')
getCurrentVersion()
infoData.version = version
infoData.source = source
infoData = JSON.stringify(infoData, null, 4)

fs.writeFileSync(path.resolve(__dirname, '../dist/' + pkg.name + '/static/info.json'), infoData)
console.log('info.json更新成功！')

function getCurrentVersion () {
  const data = fs.readFileSync(path.join(__dirname, '..', '.git', 'HEAD')).toString().trim()
  if (data.includes('ref: refs/heads/')) {
    version = data.replace('ref: refs/heads/', '').trim().split('/')[0].trim()
    source = 'branch'
  } else {
    version = getCurrentTag()
    source = 'tag'
  }
}

function getCurrentTag () {
  try {
    const lastTagCommand = 'git symbolic-ref -q --short HEAD || git describe --tags --exact-match'
    return cp.execSync(lastTagCommand, { cwd: '.' }).toString().trim()
  } catch (e) {
    console.error('Repository does not contain tags')
    return 'tag'
  }
}
