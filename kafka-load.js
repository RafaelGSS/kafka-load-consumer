module.exports = {
  broker: 'localhost:9092',
  tests: [
    {
      name: 'Load event success on item',
      topic: 'event.item.success',
      payloads: [
        { "operation": 1, "data": [{ "objectProperty": "value" }] }
      ],
      messages: 10
    }
  ]
}
