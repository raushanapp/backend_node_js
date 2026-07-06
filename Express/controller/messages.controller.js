const path = require("path");
//  / floder/files.png / jpg

function getMessages(req, res) {
  //   return res.send(`<ul>
  //            <li> Hello World!</li >
  //         </ul >`);
  //   return res.sendFile(
  //     path.join(__dirname, "..", "public", "images", "test.png"),
  //   );

  res.render("messages", {
    title: "Messages to my Friends",
    friends: "Elon musk",
    // layout: "layout",
  });
}

function postMessages(req, res) {
  return res.json({ message: "Updating... message" });
}

module.exports = {
  getMessages,
  postMessages,
};
