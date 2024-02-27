// require("dotenv").config({ path: "./env" });
import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";
import { app } from "./app.js";
dotenv.config({ path: "./env" });
const PORT = process.env.PORT || 9000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Are Runing on ${PORT}`.yellow);
    });
  })
  .catch((err) => {
    console.log("MONGO DB Connection Failed !!!", err);
  });

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
