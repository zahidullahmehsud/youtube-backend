import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINATY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) {
    console.log("File not found");
    return null;
  }
  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //File has been uploaded successfully
    fs.unlinkSync(localFilePath);
    console.log("File is uploaded on cloudinary", response.url);
    return response;
  } catch (error) {
    // File has been from local system when occur any error during uploading
    fs.unlinkSync(localFilePath);
    console.log("File uploading failed");
    return null;
  }
};

export { uploadOnCloudinary };
