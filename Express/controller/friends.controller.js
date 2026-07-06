const friends = require("../model/friends.model");

function postFriends(req, res) {
  if (!req?.body?.name) {
    return res.status(400).json({ error: "missing Friend name" });
  }
  const newFriend = {
    name: req.body.name,
    id: friends.length,
  };
  friends.push(newFriend);
  return res.status(201).json(newFriend);
}

function getFriends(req, res) {
  return res.status(200).json(friends);
}

function getFriend(req, res) {
  const friendId = Number(req.params.friendId);
  const friend = friends[friendId];
  if (friend) {
    return res.status(200).json(friend);
  } else {
    return res.status(404).json({ error: "Friend not found" });
  }
}

module.exports = {
  postFriends,
  getFriends,
  getFriend,
};
