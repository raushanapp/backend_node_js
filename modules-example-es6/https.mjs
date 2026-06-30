// const { sendRequest } = require("./request");
// using ECMA script
import { sendRequest } from "./request.mjs";
import { read } from "./response.mjs";

function request(url, data) {
  sendRequest(url, data);
  return read();
}

const responseData = request("https://example.com", "some data");
console.log(responseData);
