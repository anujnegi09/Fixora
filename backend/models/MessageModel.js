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
 
    // NEW: a single ID that represents "the conversation between these
    // two people", no matter who is sender/receiver on a given message.
    // We build it as the two user IDs sorted alphabetically and joined
    // with an underscore, e.g. "64f1abc..._64f9xyz...".
    // Sorting first means the SAME conversationId is generated whether
    // userA messages userB, or userB messages userA.
    //
    // Why this matters: without it, fetching a chat thread needs an
    // "$or" query (sender=A & receiver=B) OR (sender=B & receiver=A),
    // which is slower and harder to index well. With conversationId,
    // fetching a thread is just:
    //   Message.find({ conversationId }).sort({ createdAt: 1 })
    conversationId: {
      type: String,
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
 
// NEW: speeds up loading a conversation's messages in order (newest/oldest)
MessageSchema.index({ conversationId: 1, createdAt: 1 });
 
// NEW: speeds up counting/fetching a user's unread messages
MessageSchema.index({ receiver: 1, isSeen: 1 });
 
// Helper function to build the same conversationId consistently.
// Use this in your controller/socket handler like:
//   import { buildConversationId } from "../models/message.model.js";
//   const conversationId = buildConversationId(senderId, receiverId);
export function buildConversationId(userIdA, userIdB) {
  return [userIdA.toString(), userIdB.toString()].sort().join("_");
}
 
const Message = mongoose.model("Message", MessageSchema);
 
export default Message;