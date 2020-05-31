const Kafka = require('node-rdkafka')
const path = require('path')
const fs = require('fs')

// Any errors we encounter, including connection errors
function loadConfigFile (cwd = process.cwd()) {
  const filePath = path.resolve(cwd, 'kafka-load.json')
  try {
    const stats = require(filePath)
    return stats
  } catch (error) {
    console.error('[ERROR] Please create the kafka-load.json at root')
    throw error
  }
}

async function execute (args) {
  const cfg = loadConfigFile()
  const producer = new Kafka.Producer({
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
      console.log('Working!')
    } catch (err) {
      console.error('A problem occurred when sending our message', err)
    }
  })

  producer.on('event.error', (err) => {
    console.error('Error from producer')
    console.error(err)
  })

}

module.exports = {
  execute
}
