const fs = require('fs')
const path = require('path')
const { highlight } = require('cli-highlight')
const chalk = require('chalk')

// 获取命令行参数
const parm = process.argv.splice(2) || '..'
// 第一个参数是路径
const rootPath = parm[0]
// 后面的所有参数都是文件后缀
const types = parm.splice(1).map(item => {
  return '.' + item
})
// 需要过滤的文件/文件夹
const filter = [
  '/node_modules/',
  '/src/assets/icon/',
  '/src/assets/icons/',
  '/server/data/',
  '/dist/'
]
// 统计结果
const num = {
}

let totalLinesCount = 0

// 获取行数
async function line (path, ext) {
  let rep = await fs.readFileSync(path)
  rep = rep.toString()
  const lines = rep.split('\n')
  num[ext + '_lines_count'] = num[ext + '_lines_count'] || 0
  num[ext + '_files_count'] = num[ext + '_files_count'] || 0
  num[ext + '_lines_count'] += lines.length
  num[ext + '_files_count']++
  totalLinesCount += lines.length
  if (ext === 'vue') {
    const endTemplateIndex = rep.lastIndexOf('</template>') + '</template>'.length
    const templateLength = rep.substring(0, endTemplateIndex).split('\n').length
    num.vue_template_lines_count = (num.vue_template_lines_count || 0) + templateLength
    let endScriptIndex = endTemplateIndex
    if (rep.indexOf('<script') >= 0) {
      endScriptIndex = rep.lastIndexOf('</script>') + '</script>'.length
      const scriptLength = rep.substring(endTemplateIndex, endScriptIndex).split('\n').length
      num.vue_script_lines_count = (num.vue_script_lines_count || 0) + scriptLength
      if (scriptLength > 300) {
        console.log('Script lines > 300: ', chalk.green(path), scriptLength)
      }
    }
    if (rep.indexOf('<style') >= 0) {
      const styleLength = rep.substring(endScriptIndex).split('\n').length
      num.vue_style_lines_count = (num.vue_style_lines_count || 0) + styleLength
      if (styleLength > 300) {
        console.log('Style lines > 300: ', chalk.red(path), styleLength)
      }
    }
  }
}

// 递归所有文件夹统计
async function start (pt) {
  const files = fs.readdirSync(pt)
  files
    .map(file => {
      return `${pt}/${file}`
    })
    .forEach(file => {
      const stat = fs.statSync(file)
      if (stat.isDirectory()) {
        let isFilter = false
        for (const item of filter) {
          if ((file + '/').indexOf(item) !== -1) {
            isFilter = true
            break
          }
        }
        if (isFilter) {
          return
        }
        start(file)
        return
      } else {
        let isFilter = false
        for (const item of filter) {
          if (file.indexOf(item) !== -1) {
            isFilter = true
            break
          }
        }
        if (isFilter) {
          return
        }
      }
      const ext = path.extname(file)
      if (types.indexOf(ext) !== -1) {
        line(file, ext.substring(1))
      }
    })
}

;(async () => {
  await start(rootPath)
  console.log(chalk.blue('统计总行数：'), chalk.red(totalLinesCount))
  console.log(chalk.blue('统计结果：'))
  console.log(highlight(JSON.stringify(num, ' ', 2), { language: 'js' }))
})()
