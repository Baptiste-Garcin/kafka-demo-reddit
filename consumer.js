import { Kafka } from 'kafkajs'
import { setTimeout } from 'node:timers/promises'

const main = async function () {
  const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['127.0.0.1:9092'],
  })

  const consumer = kafka.consumer({ groupId: 'test-group' })

  await consumer.connect()
  await consumer.subscribe({ topic: 'foo-bar'})

  await consumer.run({
    eachMessage: async ({ message }) => {

      console.log({
        value: message.value.toString(),
      })

      await setTimeout(1000)
    },
  })
}

main()
    .catch((err) => {
      console.error(err)
    })

