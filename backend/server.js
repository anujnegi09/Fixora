import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";

import { connectDB } from "./configs/DBConnection.js";
import { initSocket } from "./configs/Socket.js";
import  logger  from "./configs/Logger.js";
import subscriptionCron  from "./crons/subscriptionCron.js";
import passport from "./configs/Passport.js"; 
import { connectRedis } from "./configs/Redis.js";

import UserRoute from "./routes/UserRoute.js";
import ServiceRoute from "./routes/ServiceRoute.js";
import BookingRoute from "./routes/BookingRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import NotificationRoute from "./routes/NotificationRoute.js";
import ChatRoute from "./routes/ChatRoute.js";
import SubscriptionRoute from "./routes/SubscriptionRoute.js";
import ReviewRoute from "./routes/ReviewRoute.js"
import LocationRoute from "./routes/LocationRoute.js";
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
    origin: process.env.FRONTEND_URL,
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

app.use("/location", LocationRoute);



const startServer = async () => {
    try {
        await connectDB();
        await connectRedis();

        subscriptionCron.start();

        server.listen(PORT, () => {
            logger.info(`🚀 Server running on port ${PORT}`);
        });
    } catch (error) {
        logger.error(error.message);
        process.exit(1);
    }
};

startServer();