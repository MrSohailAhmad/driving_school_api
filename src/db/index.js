import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.MONGO_DB_URI}/${DB_NAME}`
    );

    console.log(
      `\n MongoDB connected !! DB HOST: ${connection.connection.host}`.cyan
        .italic
    );
  } catch (error) {
    console.log("MONGODB connection FAILD", error).bgred;
    process.exit(1);
  }
};

export default connectDB;
