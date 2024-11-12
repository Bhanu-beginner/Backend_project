const express = require("express");
const app = express();
const env = require("dotenv");
env.config();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("hi im from the backend");
});

app.listen(PORT, () => {
  console.log(`Server is running on the port: ${PORT}`);
});
