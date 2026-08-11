const products = [
  {
    id: "redshoe",
    description: "Red Shoe",
    price: 42.12,
    reviews: [],
  },
  {
    id: "bluejeans",
    description: "Blue Jeans",
    price: 59.99,
    reviews: [],
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

function getProductById(id) {
  return products.find((product) => product.id === id);
}

function addNewProduct(id, description, price) {
  const newProduct = {
    id,
    price,
    description,
    reviews: [],
  };
  products.push(newProduct);
  return newProduct;
}

function addNewProductReview(productId, rating, comment) {
  const matchedProduct = getProductById(productId);
  if (!matchedProduct) {
    throw new Error("Product not found");
  }
  const newReview = {
    rating,
    comment,
  };
  matchedProduct.reviews.push(newReview);
  return newReview;
}

module.exports = {
  getAllProducts,
  getProductsByPrice,
  getProductById,
  addNewProduct,
  addNewProductReview,
};
