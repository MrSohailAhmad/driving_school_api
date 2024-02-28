import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadFileToCloud = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("File is Upload to cloudinary".bgBlue, response.url);
    console.log("response".bgGreen, response);
    return response.url;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the file  from local server with path when upload operation got failed

    return null;
  }
};

export { uploadFileToCloud };
