import express from "express";
import { getNotifications,
    getNotificationById,
    markAsRead , 
    markAllAsRead,
    deleteNotification, getNewNotificationCount, markNewNotificationsAsSeen
} from "../Controller/NotificationController.js";
import { verifyJWT } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyJWT, getNotifications);

router.patch("/read/:id", verifyJWT, markAsRead);

router.patch("/read-all", verifyJWT, markAllAsRead);

router.delete("/:id", verifyJWT, deleteNotification);

router.get("/new-count", verifyJWT,getNewNotificationCount);


router.get("/:id", verifyJWT, getNotificationById);


router.patch(
  "/mark-new-as-seen",
  verifyJWT,
  markNewNotificationsAsSeen
);

export default router;
