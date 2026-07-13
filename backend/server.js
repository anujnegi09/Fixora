import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";

import { connectDB } from "./Config/DBConnection.js";
import { initSocket } from "./Config/Socket.js";
import { logger } from "./Config/Logger.js";
import { subscriptionCron } from "./Cron/SubscriptionCron.js";
import passport from "./Config/Passport.js"; 

import UserRoute from "./Route/UserRoute.js";
import ServiceRoute from "./Route/ServiceRoute.js";
import BookingRoute from "./Route/BookingRoute.js";
import AuthRoute from "./Route/AuthRoute.js";
import NotificationRoute from "./Route/NotificationRoute.js";
import ChatRoute from "./Route/ChatRoute.js";
import SubscriptionRoute from "./Route/SubscriptionRoute.js";

// ================================
// LOAD ENV
// ================================
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;


// ================================
// CREATE HTTP SERVER
// ================================
const server = http.createServer(app);


// ================================
// INITIALIZE SOCKET.IO
// ================================
initSocket(server);


// ================================
// MIDDLEWARES
// ================================
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/subscription/webhook", express.raw({ type: "application/json" }));

app.use(express.json({ limit: "10mb" }));

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(cookieParser());

app.use(express.static("public"));

app.use(passport.initialize());


// ================================
// ROUTES
// ================================
app.use("/auth", AuthRoute);

// app.use("/api/auth", AuthRoute);

app.use("/user", UserRoute);

app.use("/services", ServiceRoute);

app.use("/bookings", BookingRoute);

app.use("/notifications", NotificationRoute);

app.use("/chats", ChatRoute);

app.use("/subscription", SubscriptionRoute);


// ================================
// DATABASE CONNECTION
// ================================
connectDB()
// ================================
// START CRON JOB AND SERVER
// ================================
subscriptionCron.start()
  .then(() => {

    server.listen(PORT, () => {

      logger.info(`🚀 Server running on port ${PORT}`);

    });

  })

  .catch((err) => {

    logger.error(
      "❌ Failed to connect to database:",
      err
    );

  });




// import express from "express";
// import cookieParser from "cookie-parser";
// import dotenv from "dotenv";
// import cors from "cors";
// import { connectDB } from "./Config/DBConnection.js";
// import UserRoute from "./Routes/UserRoute.js";
// import ServiceRoute from "./Routes/ServiceRoute.js";
// import BookingRoute from "./Routes/BookingRoute.js";
// import AuthRoute from "./Routes/AuthRoute.js";
// import NotificationRoute from "./Routes/NotificationRoute.js";
// import passport from "./Config/Passport.js";
// import ChatRoute from "./Routes/ChatRoute.js";
// import http from "http";
// import { initSocket } from "./Config/Socket.js";

// // Load environment variables
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middlewares
// app.use(cors({
//   origin: "http://localhost:5173", // frontend URL
//   credentials: true, // allow cookies
// }));

// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// app.use(cookieParser());
// app.use(express.static("public"));
// app.use(passport.initialize());
// // app.use(passport.session());

// // Routes
// app.use("/auth", AuthRoute);
// app.use("/user", UserRoute);
// app.use("/service" , ServiceRoute);
// app.use("/booking", BookingRoute);
// app.use("/notification", NotificationRoute);
// app.use("/api/auth", AuthRoute);
// app.use("/api/chat", ChatRoute);
// // Connect to DB first, then start server
// connectDB()
//   .then(() => {
//     app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
//   })
//   .catch((err) => {
//     console.error("❌ Failed to connect to database:", err);
//   });
