import "reflect-metadata";

import { ApolloServer, gql } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import express from "express";
import cors from "cors";

import {
  PresentsResolver,
  AdminResolver,
  UserPresentsResolver,
  UserResolver,
  AuthResolver
} from "./graphql/resolvers";
import path from "path";


const main = async () => {
  const schema = await buildSchema({
    resolvers: [
      PresentsResolver,
      AdminResolver,
      UserPresentsResolver,
      UserResolver,
      AuthResolver
    ],
    emitSchemaFile: path.resolve(__dirname, "newSchema.gql"),
  });

  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });

  const app = express();
  app.use(cors());
  app.use(express.json());
  server.start().then(() => {
    server.applyMiddleware({ app, path: "/graphql/v1" });

    app.listen({ port: process.env.PORT }, () => {
      console.log(
        `Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
      );
    });
  });
};

main();
