import { createClient } from "redis";
let redis: ReturnType<typeof createClient>;

const globalForRedis = globalThis as unknown as {
  redis: ReturnType<typeof createClient>;
};
if (!globalForRedis.redis) {
  redis = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379",
  });
} else {
  redis = globalForRedis.redis;
}
if (!redis.isOpen) {
  (async () => {
    await redis.connect();
  })();
}
export { redis };
