import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ApiError } from "./ApiError.js";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image", // change this to any if u want to upload videos and other file
    });

    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    try {
      fs.unlinkSync(localFilePath);
    } catch (unlinkError) {
      console.log("Error while deleting local file : ", unlinkError);
    }

    console.log("Cloudinary upload failed : ", error);
    return null;
  }
};

const deleteFromCloudinary = async (cloudinary_url) => {
  try {
    if (!cloudinary_url) {
      throw new ApiError(400, "Public url of the file should be provided");
    }

    const public_id = cloudinary_url.split("/").pop().split(".")[0];

    const response = await cloudinary.uploader.destroy(public_id);

    return response;
  } catch (error) {
    console.error("Error while deleting the file from Cloudinary:", error);
    throw new ApiError(500, "Failed to delete file from Cloudinary");
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
