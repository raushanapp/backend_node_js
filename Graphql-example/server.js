const path = require("path");
const express = require("express");
const { ApolloServer } = require("@apollo/server");

const { loadFilesSync } = require("@graphql-tools/load-files");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const typesArray = loadFilesSync(path.join(__dirname, "**/*.graphql"));
const resolversArray = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"));

async function startApolloServer() {
  const app = express();

  const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray,
  });

  const server = new ApolloServer({ schema });

  await server.start();
}

const PORT = 4000;

app.use("/graphql", () => {});

app.listen(PORT, () => {
  console.log(`Running Graphql server ${PORT}`);
});
