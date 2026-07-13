import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    isSeen: {
      type: Boolean,
      default: false,
    },

    messageType: {
      type: String,
      enum: ["text", "image"],
      default: "text",
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);

export default Message;