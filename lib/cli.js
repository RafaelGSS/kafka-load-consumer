const Kafka = require('node-rdkafka')
const { resolve } = require('path')
const { ok } = require('assert')
const { setupPublisher } = require('./publisher')
const logger = require('pino')

const log = logger().child({ context: 'cli' })

async function loadConfigFile (cwd = process.cwd()) {
  const filePath = resolve(cwd, 'kafka-load.js')
  try {
    const stats = require(filePath)
    return stats
  } catch (error) {
    log.error('[ERROR] Please create the kafka-load.json at root')
    throw error
  }
}

function validateCfg(cfg) {
  ok(cfg.tests, 'Must provide tests property in kafka-load config')
  ok(cfg.tests.length > 0, 'Need provide tests')
  ok(cfg.broker, 'Must provide a broker')
}

async function execute () {
  const cfg = await loadConfigFile()
  validateCfg(cfg)

  const producer = new Kafka.Producer({
    'client.id': 'kafka',
    'metadata.broker.list': cfg.broker,
    'compression.codec': 'gzip',
    'retry.backoff.ms': 200,
    'message.send.max.retries': 10,
    'socket.keepalive.enable': true,
    'queue.buffering.max.messages': 100000,
    'queue.buffering.max.ms': 1000,
    'batch.num.messages': 1000000,
    dr_cb: true
  })

  producer.connect()

  producer.on('ready', async () => {
    try {
      const publisher = setupPublisher(producer, cfg)
      await publisher.start()
    } catch (err) {
      console.error(err)
      log.error('A problem occurred when sending our message', err)
    }
  })

  producer.on('event.error', (err) => {
    log.error('Error from producer', err)
  })

  producer.on('connection.failure', (err) => {
    log.error('Error on connection with Kafka', err)
  })
}

module.exports = { execute }
