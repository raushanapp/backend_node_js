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

function getProductsByPrice(minPrice, maxPrice) {
  return products.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice,
  );
}

module.exports = {
  getAllProducts,
  getProductsByPrice,
};
