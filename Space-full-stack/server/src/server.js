const http = require("http");
const mongoose = require("mongoose");

const app = require("./app");

const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

const MONOGO_URL = `mongodb+srv://raushan1995:""L@space.xp1q2ex.mongodb.net/?appName=space?retryWrites=true&w=majority`;

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

async function startServer() {
  await mongoose.connect(MONOGO_URL);

  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}......`);
  });
}

startServer();
// app.listen()
