import dotenv from "dotenv"
import nodemailer from "nodemailer";

dotenv.config();

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
transporter.verify((error, success) => {
  if (error) {
    console.log("Transporter Error:", error);
  } else {
    console.log("Server is ready to send emails");
  }
});