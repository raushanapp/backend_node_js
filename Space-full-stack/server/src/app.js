const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const planetsRouter = require("./routes/planets/planets.router");
const launchessRouter = require("./routes/launches/launches.router");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

// this logger will log all requests
app.use(morgan("combined"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/planets", planetsRouter);
app.use("/launches", launchessRouter);

app.get("/*path", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
