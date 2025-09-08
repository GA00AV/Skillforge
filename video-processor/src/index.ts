import amqp from "amqplib";
const EXCHANGE = process.env.EXCHANGE || "minio_exchange";
const QUEUE = "processing";
const ROUTING_KEY = process.env.ROUTING_KEY || "minio_routing";
async function main() {
  const connection = await amqp.connect(
    process.env.RABBITMQ_URL || "amqp://guest:guest@localhost:5672"
  );
  const channel = await connection.createChannel();
  await channel.assertExchange(EXCHANGE, "fanout");
  await channel.assertQueue(QUEUE);
  await channel.bindQueue(QUEUE, EXCHANGE, ROUTING_KEY);
}
main();
