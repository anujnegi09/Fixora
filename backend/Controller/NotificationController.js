import Notification from "../Models/Notification.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import apiError from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";

/**
 * =========================================
 * 📥 GET ALL NOTIFICATIONS (for logged user)
 * =========================================
 */
export const getNotifications = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const notifications = await Notification.find({ userId })
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new apiResponse(200, notifications, "Notifications fetched successfully")
  );
});


/**
 * =========================================
 * ✅ MARK SINGLE NOTIFICATION AS READ
 * =========================================
 */
export const markAsRead = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const notification = await Notification.findById(id);

  if (!notification) {
    throw new apiError(404, "Notification not found");
  }

  // 🔒 Ensure user owns this notification
  if (notification.userId.toString() !== req.user._id.toString()) {
    throw new apiError(403, "Not authorized");
  }

  notification.isRead = true;
  await notification.save();

  return res.status(200).json(
    new apiResponse(200, notification, "Notification marked as read")
  );
});


/**
 * =========================================
 * ✅ MARK ALL NOTIFICATIONS AS READ
 * =========================================
 */
export const markAllAsRead = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  await Notification.updateMany(
    { userId, isRead: false },
    { $set: { isRead: true } }
  );

  return res.status(200).json(
    new apiResponse(200, {}, "All notifications marked as read")
  );
});


/**
 * =========================================
 * 🗑️ DELETE SINGLE NOTIFICATION
 * =========================================
 */
export const deleteNotification = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const notification = await Notification.findById(id);

  if (!notification) {
    throw new apiError(404, "Notification not found");
  }

  // 🔒 Security check
  if (notification.userId.toString() !== req.user._id.toString()) {
    throw new apiError(403, "Not authorized");
  }

  await notification.deleteOne();

  return res.status(200).json(
    new apiResponse(200, {}, "Notification deleted successfully")
  );
});