const mongoose = require("mongoose");
require("dotenv").config();

const MONOGO_URL = process.env.MONGODB_URL;

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

async function mongoConnect() {
  await mongoose.connect(MONOGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = { mongoConnect, mongoDisconnect };
