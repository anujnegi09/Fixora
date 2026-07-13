import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    message: {
      type: String,
      required: true
    },

    type: {
      type: String,
      enum: [
        "booking_request",
        "booking_confirmed",
        "booking_rejected",
        "booking_cancelled",
        "new_message",
        "new_review",
        "subscription",
        "payment",
        "system"
      ],
      required: true
    },

    isRead: {
      type: Boolean,
      default: false
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service"
    },

    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);