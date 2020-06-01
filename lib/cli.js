import { Producer } from 'node-rdkafka'
import { resolve } from 'path'
import { ok } from 'assert'
import { setupPublisher } from './publisher'

function loadConfigFile (cwd = process.cwd()) {
  const filePath = resolve(cwd, 'kafka-load.json')
  try {
    const stats = require(filePath)
    return stats
  } catch (error) {
    console.error('[ERROR] Please create the kafka-load.json at root')
    throw error
  }
}

function validateCfg(cfg) {
  ok(cfg.tests, 'Must provide tests property in kafka-load config')
  ok(cfg.tests.length > 0, 'Need provide tests')
}

export async function execute () {
  const cfg = loadConfigFile()
  validateCfg(cfg)

  const producer = new Producer({
    'client.id': 'kafka',
    'metadata.broker.list': 'localhost:9092',
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
      console.error('A problem occurred when sending our message', err)
    }
  })

  producer.on('event.error', (err) => {
    console.error('Error from producer', err)
  })

  producer.on('connection.failure', (err) => {
    console.error('Error on connection with Kafka', err)
  })
}
