const path = require("path");
const express = require("express");
// const { buildSchema } = require("graphql");
// const { createYoga } = require("graphql-yoga");

const { graphqlHTTP } = require("express-graphql");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const app = express();

const typesArray = loadFilesSync(path.join(__dirname, "**/*.graphql"));

const schema = makeExecutableSchema({
  typeDefs: typesArray,
});

//  Define GraphQL schema

const root = {
  products: require("./products/products.model"),
  orders: require("./orders/order.model"),
};

const PORT = 4000;

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
);

app.listen(PORT, () => {
  console.log(`Running Graphql server ${PORT}`);
});
