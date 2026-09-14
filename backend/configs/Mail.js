import dotenv from "dotenv";
import { Resend } from "resend";

console.log("📧 mail.js FILE LOADED");

dotenv.config();

console.log("📧 Creating Resend client...");

const resend = new Resend(process.env.RESEND_API_KEY);

console.log("📧 Resend client created");

export default resend;
