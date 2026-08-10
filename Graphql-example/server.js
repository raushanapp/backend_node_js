const path = require("path");
const express = require("express");
// const { buildSchema } = require("graphql");
// const { createYoga } = require("graphql-yoga");

const { graphqlHTTP } = require("express-graphql");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const app = express();

const typesArray = loadFilesSync(path.join(__dirname, "**/*.graphql"));
const resolversArray = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"));

const schema = makeExecutableSchema({
  typeDefs: typesArray,
  resolvers: resolversArray,
});

const PORT = 4000;

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  }),
);

app.listen(PORT, () => {
  console.log(`Running Graphql server ${PORT}`);
});
