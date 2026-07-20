import express from "express";
import { getNotifications,
    getNotificationById,
    markAsRead , 
    markAllAsRead,
    deleteNotification} from "../Controller/NotificationController.js";
import { verifyJWT } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyJWT, getNotifications);

router.patch("/read/:id", verifyJWT, markAsRead);

router.patch("/read-all", verifyJWT, markAllAsRead);

router.delete("/:id", verifyJWT, deleteNotification);

router.get("/:id", verifyJWT, getNotificationById)

export default router;
