const http = require("http");
require("dotenv").config();

const app = require("./app");
const { mongoConnect } = require("./services/mongo");

const { loadPlanetsData } = require("./models/planets.model");
const { loadLaunchData } = require("./models/launches.model");

const PORT = process.env.PORT || 8001;

const server = http.createServer(app);

async function startServer() {
  // Connect to MongoDB
  await mongoConnect();

  await loadPlanetsData();
  //  launches Data
  await loadLaunchData();

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}......`);
  });
}

startServer();
// app.listen()
