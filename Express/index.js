const express = require("express");
const friendsRouter = require("./routes/friends.router");
const messagesRouter = require("./routes/messages.router");
const path = require("path");
const { engine } = require("express-handlebars");
const app = express();

// app.engine("handlebars", engine());
app.engine(
  "handlebars",
  engine({
    defaultLayout: "layout", // matches your existing layout.handlebars filename
  }),
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

const PORT = 3000;

//  Middleware example
app.use((req, res, next) => {
  const start = Date.now();
  next();
  //  actions go here....
  const delat = Date.now() - start;
  console.log(`${req.method} ${req.baseUrl}   ${req.url} ${delat} ms`);
});

//  file or serving to the client
app.use("/site", express.static(path.join(__dirname, "public")));

// this middleware tell the express parser to parse JSON bodies
app.use(express.json());

app.get("/", (req, res) => {
  return res.render("index", {
    title: "My Friends Are Clever",
    caption: "France \  Is Beautiful!",
  });
});

app.use("/friends", friendsRouter);
app.use("/messages", messagesRouter);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
