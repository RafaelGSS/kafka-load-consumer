const fs = require('fs')
const logger = require('pino')
const path = require('path')

const log = logger().child({ context: 'config-initializer' })

function initializeConfig(filePath = process.cwd()) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, '/kafka-load-example.js'))
      .pipe(fs.createWriteStream(path.join(filePath, '/kafka-load.js')))
      .on('close', () => {
        log.info('done')
        resolve()
      })
      .on('error', (err) => {
        log.error('Error on initialize config', err)
        reject(err)
      })
  })
}

module.exports = { initializeConfig }
