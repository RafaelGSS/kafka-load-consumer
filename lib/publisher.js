// USE PINO to log
// Do not make JSON.stringify (try use string inside json or fast-json-stringify)
// CREATE WORKER_THREADS FOR EACH TEST IN PUBLISHER
// CREATE RANDOM IN PAYLOADS
export function setupPublisher (producer, cfg) {
  const [firstTest] = cfg.tests
  return {
    start: async () => {
      console.log('Publishing...')
      for (let i = 0; i < firstTest.messages; ++i) {
        producer.produce(firstTest.topic, null, Buffer.from(JSON.stringify(firstTest.payloads[0])))
      }
      console.log(`Done ${firstTest.messages} messages at ${firstTest.topic}`)
    }
  }
}
