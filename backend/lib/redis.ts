// lib/redis.ts
import { createClient } from "redis";

declare global {
  // Prevent multiple instances in dev
  // eslint-disable-next-line no-var
  var _redisClient: ReturnType<typeof createClient> | undefined;
}

const redisClient =
  global._redisClient ??
  createClient({
    socket: {
      reconnectStrategy: (retries) => Math.min(retries * 50, 500),
    },
  });

redisClient.on("error", (error) => {
  console.error("GOT ERROR FROM REDIS:", error);
});
redisClient.on("connect", () => {
  console.log("🔌 Redis socket connected (TCP connection established)");
});

redisClient.on("ready", () => {
  console.log("✅ Redis client ready (authenticated and ready to use)");
});

redisClient.on("end", () => {
  console.log("❌ Redis connection closed");
});

redisClient.on("reconnecting", () => {
  console.log("♻️ Redis reconnecting...");
});

redisClient.on("error", (err) => {
  console.error("🚨 Redis error:", err);
});

if (!redisClient.isOpen) {
  (async () => {
    try {
      await redisClient.connect();
      console.log("✅ Redis connected");
    } catch (err) {
      console.error("❌ Redis failed to connect:", err);
    }
  })();
}

if (process.env.NODE_ENV !== "production") {
  global._redisClient = redisClient;
}

export { redisClient };
