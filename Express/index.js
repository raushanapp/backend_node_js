const express = require("express");
const friendsController = require("./controller/friends.controller");
const messagesController = require("./controller/messages.controller");

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

app.post("/friends", friendsController.postFriends);

app.get("/friends", friendsController.getFriends);

app.get("/friend/:friendId", friendsController.getFriend);

app.get("/messages", messagesController.getMessages);

app.post("/message", messagesController.postMessages);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
