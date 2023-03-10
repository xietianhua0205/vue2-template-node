const fs = require('fs-extra')
const path = require('path')

const infoData = require(path.resolve(__dirname, 'info.json'))
const cp = require('child_process')
const date = new Date()
const timestamp = date.getTime()
const delta = timestamp - (infoData.timestamp || 0)
if (delta > 60 * 1000) {
  console.log('距离上次提交间隔：', delta, 'ms！')
  infoData.updateTime = date.toLocaleDateString() + '-' + date.toLocaleTimeString()
  infoData.timestamp = timestamp
  infoData.versionInternal += 1
  const p = path.resolve(__dirname, 'info.json')
  fs.writeFileSync(p, JSON.stringify(infoData, null, 4))
  console.log('版本号更新成功！')

  const lastTagCommand = `git commit "${p}" -m "build: ${infoData.versionInternal}"`
  return cp.execSync(lastTagCommand, { cwd: '.' }).toString().trim()
} else {
  console.log('重复commit')
}
