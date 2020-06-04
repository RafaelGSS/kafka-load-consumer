import logger from 'pino'

const log = logger({ level: 'debug' }).child({ context: 'publisher' })

async function _startAtTest(producer, test) {
  log.info(`Starting at ${test.name}`)

  for (const payload of test.payloads) {
    const payloadStr = JSON.stringify(payload)
    log.info(`Setup payload: ${payloadStr}`)
    for (let i = 0; i < test.messages; ++i) {
      log.debug(`Publishing ${i} with ${payloadStr}`)
      const buffer = Buffer.from(payloadStr)
      producer.produce(test.topic, null, buffer)
    }
  }
  log.info(`Done test at ${test.name}`)
}


export function setupPublisher (producer, cfg) {
  return {
    start: async () => {
      await Promise.all(cfg.tests.map((test) => _startAtTest(producer, test)))
    }
  }
}
