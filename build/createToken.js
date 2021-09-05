const fs = require('fs')
const path = require('path')

fs.writeFileSync(path.resolve(__dirname, 'token.json'), '{}')
console.log('token.json创建成功！')
