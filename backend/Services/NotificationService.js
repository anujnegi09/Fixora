import Notification from "../Models/Notification.js";
import { getIO } from "../Config/Socket.js";

export const sendNotification = async ({
  userId,
  type,
  category = null,
  message,
  bookingId = null,
  serviceId = null,
  reviewId = null,
  redirectTo = "/",
  
}) => {

  // Save notification
  const notification = await Notification.create({
    userId,
    type,
    category,
    message,
    bookingId,
    serviceId,
    reviewId,
    redirectTo
  });

  // Send instantly
  const io = getIO();

  io.to(userId.toString()).emit(
    "newNotification",
    notification
  );

  return notification;
};