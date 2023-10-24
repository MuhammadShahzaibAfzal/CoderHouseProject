import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";

import { APP_PORT, DB_URL } from "./config/index.js";
import { activationRouter, authRouter, roomRouter } from "./routes/index.js";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";

const app = express();
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};

/* FOR JSON DATA */
app.use(express.json({ limit: "8mb" }));
/* FOR CROSS ORIGIN */
app.use(cors(corsOptions));
/* FOR COOKIES */
app.use(cookieParser());
/* STATIC  */
app.use("/storage", express.static("storage"));
/* ROOT FOLDER PATH */
const __filename = fileURLToPath(import.meta.url);
const src = dirname(__filename);
export const ROOT_PATH = dirname(src);

/* REGISTER ROUTES */
app.use("/api/auth", authRouter);
app.use("/api/activate", activationRouter);
app.use("/api/rooms", roomRouter);

/* ERRO HANDLER MIDDLEWARE */
app.use(errorHandlerMiddleware);

/* DATABASE CONFIGURATION */
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("MongoDB connected successfully 😍😍");
  })
  .catch((err) => {
    console.log("Something went wrong while connecting to MongoDB 😢😢");
    console.log(err);
  });

/* CREATE SERVER */
app.listen(APP_PORT, () =>
  console.log(`Server is Listning on port ${APP_PORT}`)
);
