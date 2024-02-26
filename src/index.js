import dotenv from "dotenv";
import colors from "colors";
import express from "express";

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/home", (req, res) => {
  res.send("This is Home");
});

app.listen(port, () => {
  console.log(`Server are running on port ${port}`.toUpperCase().bgGreen);
});
