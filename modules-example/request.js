const REQUEST_TIMEOUT = 500;

function encrypt(data) {
  return "encrypted data";
}

function sendRequest(url, data) {
  const encryptedData = encrypt(data);
  console.log(`Sending request to ${url} with data: ${encryptedData}`);
}

module.exports = { sendRequest, REQUEST_TIMEOUT };
