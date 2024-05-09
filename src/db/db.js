import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    //Online database connection
    // const connectionInstance = await mongoose.connect(
    //   `${process.env.MONGODB_URL}/${DB_NAME}`
    // );

    //Local database connection
    const connectionInstance = await mongoose.connect(
      `${process.env.LOCAL_DATABASE_URL}/${DB_NAME}`
    );

    console.log("Database is connected");
  } catch (error) {
    console.log("Database Connection error", error);
  }
};

export default connectDB;
