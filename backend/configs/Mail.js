import dotenv from "dotenv"
import nodemailer from "nodemailer";
import  logger  from "./Logger.js";

dotenv.config();

// console.log("EMAIL_USER:", process.env.EMAIL_USER);
// console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
transporter.verify((error, success) => {
  if (error) {
    logger.error("Transporter Error:", error);
  } else {
    logger.info("Server is ready to send emails");
  }
});