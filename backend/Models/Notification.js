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
      enum: ["booking", "system"],
      default: "booking"
    },

    isRead: {
      type: Boolean,
      default: false
    },

    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);