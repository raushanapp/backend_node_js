const http = require("http");

const PORT = 3006;

// const server = http.createServer((req, res) => {
//   //   res.writeHead(200, { "content-type": "text/plain" }); // this allow the server to pass only plain text
//   res.writeHead(200, { "content-type": "application/json" });
//   //   res.end("Hello! sir Isaac Newton is your friend.");
//   res.end(JSON.stringify({ id: 1, name: "john Done" }));
// });

// server.listen(3005, () => {
//   console.log("Server is listening on port 3005");
// });

const server1 = http.createServer();

const friends = [
  { id: 1, name: "john Done" },
  { id: 2, name: "jane Doe 2" },
  { id: 3, name: "joe Smith" },
  { id: 4, name: "jill Johnson" },
  { id: 5, name: "james Brown" },
];

server1.on("request", (req, res) => {
  const items = req.url.split("/");
  if (req.method === "POST" && items[1] === "friends") {
    req.on("data", (data) => {
      const friend = JSON.parse(data.toString());
      console.log("Request received:", friend);
      friends.push(friend);
    });
    req.pipe(res);
    // Handle POST request for adding a new friend
  } else if (req.method === "GET" && items[1] === "friends") {
    // res.writeHead(200, { "Content-Type": "application/json" });
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    if (items.length === 3) {
      const friendIndex = parseInt(items[2]);
      const friend = friends[friendIndex - 1];
      res.end(JSON.stringify(friend));
    } else {
      res.end(JSON.stringify(friends));
    }
  } else if (req.method === "GET" && items[1] === "messages") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<body>");
    res.write("<h1>Hello, this is a message!</h1>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server1.listen(PORT, () => {
  console.log(`Server1 is listening on port ${PORT}`);
});
