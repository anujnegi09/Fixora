import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    message: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: [
        "booking_request",
        "booking_updated",
        "booking_confirmed",
        "booking_rejected",
        "booking_cancelled",
        "review_reminder", // Customer should leave a review
        "new_review", // Provider received a new review
        "otp_generated",
        "subscription",
        "payment",
        "system",
      ],
      required: true,
      default: "system",
    },
    category: {
      type: String,
      enum: ["my_booking", "my_service_booking"],
      default: null,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },

    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
    reviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
      default: null,
    },
    redirectTo: {
      type: String,
      default: "/",
    },
  },
  { timestamps: true },
);

// NEW: this schema was already solid. Only addition — this speeds up
// the very common query "show this user's unread notifications"
// (e.g. for a notification bell/badge count).
notificationSchema.index({ userId: 1, isRead: 1 });

export default mongoose.model("Notification", notificationSchema);
