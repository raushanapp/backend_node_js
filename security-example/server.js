const fs = require("fs");
const path = require("path");
const https = require("https");
const express = require("express");
const helmet = require("helmet");

const PORT = 3001;

const app = express();

app.use(helmet());

app.use(express.static(path.join(__dirname, "public")));

app.get("/secret", (req, res) => {
  return res.status(200).send("Your personal secret value is 45!");
});

app.get("/*path", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

https
  .createServer(
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app,
  )
  .listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
  });
