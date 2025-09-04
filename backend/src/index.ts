import { redis } from "./lib/redis.js";
import express from "express";
import { handler } from "./handlers/handler.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { expressMiddleware } from "@as-integrations/express5";
import {
  authorisationMiddleware,
  AuthRequest,
  loggedInMiddleware,
  loggedOutMiddleware,
} from "./middlewares.js";
import createGraphqlServer from "./graphql/index.js";
process.on("SIGINT", async () => {
  try {
    if (redis.isOpen) {
      await redis.quit();
      console.log("Redis connection closed.");
    }
  } catch (err) {
    console.error("Error closing Redis:", err);
  } finally {
    process.exit(0); // <-- this forces Node to quit
  }
});

async function main() {
  // setup app
  const app = express();
  app.use(
    cors({
      origin: "http://localhost:5173", // your frontend origin
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(express.json());

  //authorisation middlewares
  app.use(authorisationMiddleware);
  app.use(["/signout"], loggedInMiddleware);
  app.use(["/login", "/siginup"], loggedOutMiddleware);

  app.use(
    "/course",
    expressMiddleware(await createGraphqlServer(), {
      context: async ({ req }: { req: AuthRequest }) => {
        return { user: req.user };
      },
    })
  );
  app.use(handler);
  let port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
  });
}
main();
