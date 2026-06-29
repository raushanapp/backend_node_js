const EventEmitter = require("events");
const celebrity = new EventEmitter();

//  subscribe to celebrity  for orbserver 1
celebrity.on("birth", function () {
  console.log("A new celebrity is born!");
});

//  subscribe to celebrity  for orbserver 2
celebrity.on("race", (result) => {
  if (result === "win") {
    console.log("Boo I could have better than that!");
  }
});

//  subscribe to celebrity  for orbserver 3

celebrity.on("race", (result) => {
  if (result === "lost") {
    console.log("Boo I could have better than that!");
  }
});

process.on("exit", (code) => {
  console.log("Process exit event with code: ", code);
});

celebrity.emit("birth");
celebrity.emit("race", "win");
celebrity.emit("race", "lost");
