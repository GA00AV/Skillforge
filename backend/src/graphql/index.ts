import { ApolloServer } from "@apollo/server";
import { typedefs } from "./course/typedefs.js";
import { resolvers } from "./course/resolvers.js";

export default async function createGraphqlServer() {
  const server = new ApolloServer({
    typeDefs: typedefs,
    resolvers,
  });
  await server.start();
  return server;
}
