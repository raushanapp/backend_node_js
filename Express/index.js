const express = require("express");
const app = express();

const PORT = 3000;

const friends = [
  {
    id: 0,
    name: "Alice",
  },
  {
    id: 1,
    name: "Bob",
  },
];

//  Middleware example

app.use((req, res, next) => {
  const start = Date.now();
  next();
  //  actions go here....
  const delat = Date.now() - start;
  console.log(`${req.method} ${req.url} ${delat} ms`);
});

//

app.use(express.json());

app.post("/friends", (req, res) => {
  if (!req?.body?.name) {
    return res.status(400).json({ error: "missing Friend name" });
  }
  const newFriend = {
    name: req.body.name,
    id: friends.length,
  };
  friends.push(newFriend);
  return res.status(201).json(newFriend);
});

app.get("/friends", (req, res) => {
  res.status(200).json(friends);
});

app.get("/friend/:id", (req, res) => {
  const friendId = Number(req.params.id);
  const friend = friends[friendId];
  if (friend) {
    res.status(200).json(friend);
  } else {
    res.status(404).json({ error: "Friend not found" });
  }
});

app.get("/messages", (req, res) => {
  res.send(`<ul>
           <li> Hello World!</li >
        </ul >`);
});

app.get("/message", (req, res) => {
  res.send("Updating... message");
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
