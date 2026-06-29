const { sendRequest } = require("./request");
const { read } = require("./response");

function request(url, data) {
  sendRequest(url, data);
  return read();
}

const responseData = request("https://example.com", "some data");
console.log(responseData);
