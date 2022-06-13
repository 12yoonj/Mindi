import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const MONGODB_URI: string =
  process.env.MONGODB_URI || "MONGODB_URI does not exist in .env file.";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("mongodb is successfully connected");
  })
  .catch((error) => {
    console.error(error);
  });