// const { sendRequest } = require("./request");
// const { read } = require("./response");
// const { REQUEST_TIMEOUT } = require("./request");

// const internals = require("../internals/index");

const { send, read } = require("../internals/index");

// function request(url, data) {
//   sendRequest(url, data);
//   return read();
// }

// function request(url, data) {
//   internals.request.sendRequest(url, data);
//   return internals.response.read();
// }

function request(url, data) {
  send(url, data);
  return read();
}

const responseData = request("https://example.com", "some data");
console.log(responseData);

// console.log(require.cache);
