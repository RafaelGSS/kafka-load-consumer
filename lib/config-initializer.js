import * as fs from 'fs'
import logger from 'pino'
import path from 'path'

const log = logger().child({ context: 'config-initializer' })
const __dirname = path.dirname(new URL(import.meta.url).pathname);

export function initializeConfig(filePath = process.cwd()) {
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
