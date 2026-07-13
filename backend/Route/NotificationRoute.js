import express from "express";
import { getNotifications,
    markAsRead , 
    markAllAsRead,
    deleteNotification} from "../Controller/NotificationController.js";
import { verifyJWT } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyJWT, getNotifications);

router.patch("/:id/read", verifyJWT, markAsRead);

router.patch("/read-all", verifyJWT, markAllAsRead);

router.delete("/:id", verifyJWT, deleteNotification);

export default router;
