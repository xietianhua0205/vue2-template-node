const fs = require('fs-extra')
const archiver = require('archiver')
const path = require('path')
const pkg = require(path.resolve(__dirname, '../package.json'))

const base = path.resolve(__dirname, '../dist')
const name = pkg.name

function buildZip () {
  const savePath = path.join(base, name) + '.zip'
  const output = fs.createWriteStream(savePath)
  const archive = archiver('zip', {
    zlib: {
      level: 9
    }
  })
  output.on('close', function () {
    console.log(archive.pointer() + ' total bytes')
    console.log('archiver has been finalized and the output file descriptor has closed.')
  })
  output.on('end', function () {
    console.log('Data has been drained')
  })
  archive.on('warning', function (err) {
    if (err.code !== 'ENOENT') {
      throw err
    }
  })
  archive.on('error', function (err) {
    throw err
  })
  archive.pipe(output)

  const items = fs.readdirSync(base)

  items.forEach(file => {
    const filePath = path.join(base, file)
    const isFile = fs.statSync(filePath).isFile()
    if (isFile) {
      if (file !== name + '.zip') {
        archive.file(filePath, { name: file })
      }
    } else {
      archive.directory(filePath, file)
    }
  })

  archive.finalize()
}

buildZip()
