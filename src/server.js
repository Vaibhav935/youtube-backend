// import dotenv from "dotenv";
import { connectToDB } from "./db/db.js";
import app from "./app.js";

// dotenv.config();

connectToDB()
  .then(() => {
    app.listen(process.env.PORT || 8080, () => {
      console.log(`server is running on port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`MONGODB connection failed at server: ${err}`);
  });
