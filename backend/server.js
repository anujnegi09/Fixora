import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./Config/DBConnection.js";
import UserRoute from "./Routes/UserRoute.js";
import ServiceRoute from "./Routes/ServiceRoute.js";
import BookingRoute from "./Routes/BookingRoute.js";
import AuthRoute from "./Routes/AuthRoute.js";
import NotificationRoute from "./Routes/NotificationRoute.js";
import passport from "./Config/Passport.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true, // allow cookies
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(passport.initialize());
// app.use(passport.session());

// Routes
app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/service" , ServiceRoute);
app.use("/booking", BookingRoute);
app.use("/notification", NotificationRoute);
app.use("/api/auth", AuthRoute);
// Connect to DB first, then start server
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Failed to connect to database:", err);
  });
