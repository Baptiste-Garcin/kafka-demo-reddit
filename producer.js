import { Kafka } from 'kafkajs'

const main = async function () {
  const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['127.0.0.1:9092'],
  })

  const producer = kafka.producer()

  await producer.connect()
  await producer.send({
    topic: 'foo-bar',
    messages: [
      { value: '1' },
    ],
  })

  await producer.send({
    topic: 'foo-bar',
    messages: [
      { value: '2' },
    ],
  })

  await producer.send({
    topic: 'foo-bar',
    messages: [
      { value: '3' },
    ],
  })

  await producer.send({
    topic: 'foo-bar',
    messages: [
      { value: '4' },
    ],
  })

  await producer.send({
    topic: 'foo-bar',
    messages: [
      { value: '5' },
    ],
  })

  await producer.disconnect()
}

main()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err)
    })

