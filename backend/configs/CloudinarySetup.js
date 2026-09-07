import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import logger from "./Logger.js";

dotenv.config();

const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;

if (
  !CLOUDINARY_CLOUD_NAME ||
  !CLOUDINARY_API_KEY ||
  !CLOUDINARY_API_SECRET
) {
  logger.error("Cloudinary environment variables are missing.");
  throw new Error("Cloudinary configuration is incomplete.");
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export default cloudinary;