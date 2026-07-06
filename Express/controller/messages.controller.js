function getMessages(req, res) {
  return res.send(`<ul>
           <li> Hello World!</li >
        </ul >`);
}

function postMessages(req, res) {
  return res.json({ message: "Updating... message" });
}

module.exports = {
  getMessages,
  postMessages,
};
