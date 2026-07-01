const axios = require("axios");

async function sendRequest(url, data) {
  try {
    const response = await axios.get(url);
    // const data = await response.data;
    return response.data;
  } catch (error) {
    console.error("Error occurred while sending request:", error);
    throw error;
  }
}

module.exports = { sendRequest };
