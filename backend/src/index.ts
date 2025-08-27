import { config } from "dotenv";
import { redis } from "./lib/redis.js";
import express from "express";
import { authHandler } from "./handlers/authHandlers.js";
import { homeHandler } from "./handlers/homeHandler.js";
import { appHandler } from "./handlers/appHandler.js";
// configure environment variables
config();
process.on("SIGINT", async () => {
  if (redis.isOpen) {
    await redis.quit();
  }
});

// setup app
const app = express();
app.use(express.json());
app.use(authHandler);
app.use(homeHandler);
app.use("/app", appHandler);
app.listen(process.env.PORT || 8080, () => {
  console.log(`Server listening on port: ${process.env.PORT || 8080}`);
});
