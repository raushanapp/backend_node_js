const http = require("http");

const server = http.createServer((req, res) => {
  //   res.writeHead(200, { "content-type": "text/plain" }); // this allow the server to pass only plain text
  res.writeHead(200, { "content-type": "application/json" });
  //   res.end("Hello! sir Isaac Newton is your friend.");
  res.end(JSON.stringify({ id: 1, name: "john Done" }));
});

const server1 = http.createServer();

server1.on("request", (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ id: 2, name: "john Done full name" }));
});

server.listen(3005, () => {
  console.log("Server is listening on port 3005");
});
server1.listen(3006, () => {
  console.log("Server1 is listening on port 3006");
});
