require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/home", (req, res) => {
  res.send("This is Home");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
