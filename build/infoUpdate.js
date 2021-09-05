const fs = require('fs')
const path = require('path')

const infoData = require('./info.json')
const cp = require('child_process')
const date = new Date()
const timestamp = date.getTime()
if (timestamp - (infoData.timestamp || 0) > 10 * 1000) {
  infoData.updateTime = date.toLocaleDateString() + '-' + date.toLocaleTimeString()
  infoData.timestamp = timestamp
  infoData.versionInternal += 1
  const p = path.resolve(__dirname, 'info.json')
  fs.writeFileSync(p, JSON.stringify(infoData, null, 4))
  console.log('版本号更新成功！')

  const lastTagCommand = `git commit ${p} -m update:${infoData.versionInternal}`
  return cp.execSync(lastTagCommand, { cwd: '.' }).toString().trim()
} else {
  console.log('重复commit')
}
