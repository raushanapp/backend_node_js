const express = require("express");
const friendsRouter = require("./routes/friends.router");
const messagesRouter = require("./routes/messages.router");
const app = express();
const PORT = 3000;

//  Middleware example
app.use((req, res, next) => {
  const start = Date.now();
  next();
  //  actions go here....
  const delat = Date.now() - start;
  console.log(`${req.method} ${req.url} ${delat} ms`);
});

// this middleware tell the express parser to parse JSON bodies
app.use(express.json());

app.use("/friends", friendsRouter);

app.use("/messages", messagesRouter);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
