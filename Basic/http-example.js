// const { request, get } = require("https");
const { request, get } = require("node:https"); // these are build in core node modules, because we add extra perfix

//  ES6 way
//  import http from "node:http"

const req = request("https://www.google.com", (res) => {
  res.on("data", (chunk) => {
    console.log("====================================");
    console.log(`Data Chunk ${chunk}`);
    console.log("====================================");
  });
  res.on("end", () => {
    console.log("====================================");
    console.log("End of response");
    console.log("====================================");
  });
});

get("https://www.google.com", (res) => {
  res.on("data", (chunk) => {
    console.log("====================================");
    console.log(`Data Chunk 2 ${chunk}`);
    console.log("====================================");
  });
  res.on("end", () => {
    console.log("====================================");
    console.log("End of response 2");
    console.log("====================================");
  });
});

req.end();
