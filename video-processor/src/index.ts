import amqp from "amqplib";
import { processMessage } from "./utils";
import { config } from "dotenv";
config();

const AMQP_URL = process.env.AMQP_URL || "amqp://guest:guest@localhost:5672";
const EXCHANGE = process.env.EXCHANGE || "minio_exchange";
const QUEUE = "processing";
const ROUTING_KEY = process.env.ROUTING_KEY || "minio_routing";
const proudctionBucket = process.env.PRODUCTION_BUCKET || "production";
const storageServerUrl =
  process.env.PUBLIC_STORAGE_URL || "http://localhost:9000";
async function main() {
  const connection = await amqp.connect(AMQP_URL);
  const channel = await connection.createChannel();
  await channel.assertExchange(EXCHANGE, "fanout", { durable: false });
  await channel.assertQueue(QUEUE);
  await channel.bindQueue(QUEUE, EXCHANGE, ROUTING_KEY);
  console.log("waiting for message");
  channel.consume(QUEUE, async (message) => {
    if (message?.content) {
      const JsonMsg = JSON.parse(message.content.toString());
      if (JsonMsg.EventName === "s3:ObjectCreated:Put") {
        const info = `${JsonMsg.Key}`.split("/");
        console.log(`Processing video for key:${info.slice(1).join("/")}`);
        channel.ack(message);
        await processMessage(
          info.slice(1).join("/"),
          info[0],
          proudctionBucket,
          info[1],
          info[2],
          info[3],
          info[4].split(".")[0],
          storageServerUrl
        );
      }
    }
  });
}
main();
