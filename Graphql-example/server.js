const express = require("express");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");

//  Define GraphQL schema
const schema = buildSchema(
  `
    type Query {
      description:String
      price:Float
    }
  `,
);

const root = {
  description: "Red Shoes",
  price: 42.12,
};

const PORT = 4000;
const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
  }),
);

app.listen(PORT, () => {
  console.log(`Running Graphql server ${PORT}`);
});
