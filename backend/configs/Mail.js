import dotenv from "dotenv"
console.log("📧 mail.js FILE LOADED");
import nodemailer from "nodemailer";
console.log("📧 Creating transporter...");

import  logger  from "./Logger.js";

dotenv.config();

// console.log("EMAIL_USER:", process.env.EMAIL_USER);
// console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  // service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});
console.log("📧 Transporter created");
// transporter.verify((error, success) => {
//   if (error) {
//     logger.error("Transporter Error:", error);
//   } else {
//     logger.info("Server is ready to send emails");
//   }
// });
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ TRANSPORTER VERIFY ERROR:");
    console.error(error);
  } else {
    console.log("✅ SMTP SERVER READY");
    console.log("VERIFY SUCCESS:", success);
  }
});