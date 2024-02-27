// require("dotenv").config({ path: "./env" });
import dotenv from "dotenv";
import colors from "colors";
import express from "express";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";

dotenv.config({ path: "./env" });

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/home", (req, res) => {
  res.send("This is Home");
});

connectDB();
// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGO_DB_URI}/${DB_NAME}`);

//     app.on("error", () => {
//       console.log("ERROR: ", error);
//       throw error;
//     });

//     app.listen(process.env.PORT, () => {
//       console.log(`App is listion on ${process.ebv.PORT}`.bgBlue);
//     });
//   } catch (error) {
//     console.log("ERROR:", error);
//   }
// })();

app.listen(port, () => {
  console.log(`Server are running on port ${port}`.toUpperCase().yellow);
});
