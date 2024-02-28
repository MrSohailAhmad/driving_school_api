import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // here we can pass a ojects of objects
app.use(express.static("public"));
app.use(cookieParser());

// routes
import userRoutes from "./routes/user.routes.js";
app.use("/api/v1/user", userRoutes);

export { app };
