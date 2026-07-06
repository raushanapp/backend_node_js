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
