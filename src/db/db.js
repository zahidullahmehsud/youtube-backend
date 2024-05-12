import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import dotenv from "dotenv";
dotenv.config();

const connectionURL = process.env.MONGODB_URL.replace("<dbname>", DB_NAME);
const connectDB = async () => {
  try {
    //Online database connection
    const connectionInstance = await mongoose.connect(connectionURL);

    //Local database connection
    // const connectionInstance = await mongoose.connect(
    //   `${process.env.LOCAL_DATABASE_URL}/${DB_NAME}`
    // );

    console.log("Database is connected");
  } catch (error) {
    console.log("Database Connection error", error);
  }
};

export default connectDB;
