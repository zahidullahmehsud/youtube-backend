import dotenv from "dotenv";
import connectDB from "./db/db.js";
import { app } from "./app.js";

const PORT = process.env.PORT || 8000;

dotenv.config();
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection Failed", error);
  });
