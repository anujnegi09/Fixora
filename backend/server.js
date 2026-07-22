import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";

import { connectDB } from "./Config/DBConnection.js";
import { initSocket } from "./Config/Socket.js";
import  logger  from "./Config/Logger.js";
import subscriptionCron  from "./Cron/SubscriptionCron.js";
import passport from "./Config/Passport.js"; 

import UserRoute from "./Route/UserRoute.js";
import ServiceRoute from "./Route/ServiceRoute.js";
import BookingRoute from "./Route/BookingRoute.js";
import AuthRoute from "./Route/AuthRoute.js";
import NotificationRoute from "./Route/NotificationRoute.js";
import ChatRoute from "./Route/ChatRoute.js";
import SubscriptionRoute from "./Route/SubscriptionRoute.js";
import ReviewRoute from "./Route/ReviewRoute.js"
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
app.use("/users", AuthRoute);



app.use("/users", UserRoute);

app.use("/services", ServiceRoute);

app.use("/bookings", BookingRoute);

app.use("/notifications", NotificationRoute);

app.use("/chats", ChatRoute);

app.use("/subscription", SubscriptionRoute);

app.use("/reviews", ReviewRoute);




connectDB()
  .then(() => {
      subscriptionCron.start();

      server.listen(PORT, () => {
          logger.info(`🚀 Server running on port ${PORT}`);
      });
  })
  .catch((error) => {
      logger.error(error.message);
  });


// // ================================
// // DATABASE CONNECTION
// // ================================
// connectDB()
// // ================================
// // START CRON JOB AND SERVER
// // ================================
// subscriptionCron.start()
//   // .then(() => {

//     server.listen(PORT, () => {

//       logger.info(`🚀 Server running on port ${PORT}`);

//     });

//   // })

//   // .catch((err) => {

//   //   logger.error(
//   //     "❌ Failed to connect to database:",
//   //     err
//   //   );

//   // });




