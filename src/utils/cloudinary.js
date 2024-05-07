
import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name: "samanvith", 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});


 // upload oncloudinary
export const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path);
     fs.unlinkSync(file.path); // Pass the file path instead of the file object
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    throw error;
  }
};

