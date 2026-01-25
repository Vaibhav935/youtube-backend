import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  express.json({
    // .json because express can't understand json data directly (which comes under body)
    limit: "16kb", // limit is because we do not want too much data to come to our server
  })
);
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // urlencoded is used because we want express to understand all data coming through url
app.use(express.static("public")) // to tell express about assets



export default app;
