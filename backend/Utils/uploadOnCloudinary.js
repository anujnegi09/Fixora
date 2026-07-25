import fs from "fs";
import cloudinary from "../Config/CloudinarySetup.js";
import logger from "../Config/Logger.js";

const uploadOnCloudinary = async (
  localFilePath,
  folder = "Fixora"
) => {
  try {
    if (!localFilePath) {
      return null;
    }

    const response = await cloudinary.uploader.upload(
      localFilePath,
      {
        folder,
        resource_type: "image",
      }
    );

    // Delete temporary file after successful upload
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return response;
  } catch (error) {

    // Delete temp file even if upload fails
    if (
      localFilePath &&
      fs.existsSync(localFilePath)
    ) {
      fs.unlinkSync(localFilePath);
    }

    logger.error(
      `Cloudinary Upload Error: ${error.message}`
    );

    return null;
  }
};

export default uploadOnCloudinary;