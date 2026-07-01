const { sendRequest } = require("./request");
const { handleResponse } = require("./response");

// async function makeRequest(url) {
//   const response = await sendRequest(url);
//   const result = await handleResponse(response);
//   console.log("====================================");
//   console.log(result);
//   console.log("====================================");
//   return result;
// }

function makeRequest(url) {
  const response = sendRequest(url);
  const result = handleResponse(response);
  return result;
}
const response = makeRequest("https://www.google.com/").then((result) => {
  console.log("RESPONSE:====>>>>", result);
});
