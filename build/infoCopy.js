const fs = require('fs-extra')
const ip = require('ip')
const path = require('path')
const cp = require('child_process')

let version = ''
let source = ''

const pkg = require(path.resolve(__dirname, '../package.json'))
const infoData = require(path.resolve(__dirname, 'info.json'))
const date = new Date()
infoData.publishTime = date.toLocaleDateString() + ' ' + date.toLocaleTimeString()

infoData.author = ip.address().split('.')
getCurrentVersion()
infoData.version = version
infoData.source = source

try {
  const remoteNames = cp.execSync('git remote', { cwd: '.' }).toString().trim().split(/\s/)
  if (remoteNames?.length) {
    const remoteUrlList = []
    remoteNames.forEach((remoteName) => {
      remoteUrlList.push(cp.execSync(`git config --get remote.${remoteName}.url`, { cwd: '.' })?.toString()?.trim()?.split('/')?.slice(3)?.join('/')?.replace('.git', ''))
    })
    infoData.remote = remoteUrlList.join(',')
  }
} catch (e) {
  console.log('找不到git信息')
}

fs.writeFileSync(path.resolve(__dirname, '../dist/' + pkg.name + '/static/info.json'), JSON.stringify(infoData, null, 4))
console.log('info.json更新成功！')

function getCurrentVersion () {
  try {
    const data = fs.readFileSync(path.join(__dirname, '..', '.git', 'HEAD')).toString().trim()
    if (data.includes('ref: refs/heads/')) {
      version = data.replace('ref: refs/heads/', '').trim().split('/')[0].trim()
      source = 'branch'
    } else {
      version = getCurrentTag()
      source = 'tag'
    }
  } catch (e) {
    console.log('找不到git信息')
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
