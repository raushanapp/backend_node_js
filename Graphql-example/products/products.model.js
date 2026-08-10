const products = [
  {
    id: "redshoe",
    description: "Red Shoe",
    price: 42.12,
  },
  {
    id: "bluejeans",
    description: "Blue Jeans",
    price: 59.99,
  },
];

function getAllProducts() {
  return products;
}

module.exports = {
  getAllProducts,
};
