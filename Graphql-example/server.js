const express = require("express");
const { buildSchema } = require("graphql");

//  Define GraphQL schema
const schema = buildSchema(
  `
    type Query {
      description:String
      price:Float
    }
  `,
);

const app = express();
const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Running Graphql server ${PORT}`);
});
