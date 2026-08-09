const express = require("express");
const { buildSchema } = require("graphql");
const { createYoga } = require("graphql-yoga");

//  Define GraphQL schema
const schema = buildSchema(
  `
    type Query {
      products: [Product!]!
      orders:[Order!]!
    }
      
    type Product {
      id:ID!
      description:String!
      reviews:[Review!]!
      price:Float!
    }
    
    type Review {
      rating:Int!
      comment:String!
    }
    
    type Order {
      id:ID!
      date : String!
      subtotal : Float!
      items:[OrderItem!]
    }

    type OrderItem {
      product: Product!
      quantity: Int!
    }
  `,
);

const PORT = 4000;

const app = express();

app.use(
  "/graphql",
  createYoga({
    schema: schema,
  }),
);

app.listen(PORT, () => {
  console.log(`Running Graphql server ${PORT}`);
});
