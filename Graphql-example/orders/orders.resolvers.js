const ordersModel = require("./order.model");

module.exports = {
  Query: {
    orders: () => {
      console.log("Getting the Orders...");
      return ordersModel.getAllOrders();
    },
  },
};
