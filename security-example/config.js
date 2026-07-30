require("dotenv").config();

const googleAuthConfig = {
  CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};

module.exports = { googleAuthConfig };
