const { Kafka } = require('kafkajs');
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
})

const admin = kafka.admin();

async function main() {
  await admin.connect();

  // const topicName = 'my_topic';
  const groupId = 'test-group';

  const topicNames = [
    "kafka-connect-configs",
    "kafka-connect-offsets",
    "kafka-connect-status"
  ]

  try {
    await admin.createTopics({
      topics: topicNames.map((topicName) => ({
        topic: topicName,
        configEntries: [
          {
            name: "cleanup.policy",
            value: "compact"
          }
        ]
      }))
    });
    return topicNames.join(", ")
  } catch (e) {
    // console.log("error ==> ", error)
    return e.message
  }
}

main().then(console.log, console.log).finally(process.exit)