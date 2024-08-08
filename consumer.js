import { Kafka } from 'kafkajs'
import { setTimeout } from 'node:timers/promises'

const main = async function () {
  const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['127.0.0.1:9092'],
  })

  const consumer = kafka.consumer({ groupId: 'test-group', sessionTimeout: 120000 })

  await consumer.connect()
  await consumer.subscribe({ topic: 'foo-bar'})

  console.log('connected')
  await consumer.run({
    eachMessage: async ({ message }) => {

      console.log({
        value: message.value.toString(),
      })

      let delay = 100
      const value = JSON.parse(message.value.toString())
      if (value === 1) {
        delay = 100000
      }
      await setTimeout(delay)
    },
  })
}

main()
    .catch((err) => {
      console.error(err)
    })

