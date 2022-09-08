const fs = require('fs-extra')
const path = require('path')

fs.writeFileSync(path.resolve(__dirname, 'token.json'), '{}')
console.log('token.json创建成功！')
