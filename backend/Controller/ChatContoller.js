import mongoose from "mongoose";
import Message, { buildConversationId } from "../Models/Message.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import apiError from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";
import { getIO } from "../Config/Socket.js";


// ======================================
// SEND MESSAGE
// ======================================

export const sendMessage = asyncHandler(async (req, res) => {

  const senderId = req.user._id;

  const { receiverId, message, bookingId } = req.body;

  if (!receiverId || !message) {
    throw new apiError(400, "Receiver and message are required");
  }

  if (!mongoose.Types.ObjectId.isValid(receiverId)) {
    throw new apiError(400, "Invalid receiver ID");
  }

  const conversationId = buildConversationId(senderId, receiverId);
  const newMessage = await Message.create({
    sender: senderId,
    receiver: receiverId,
    bookingId,
    conversationId,
    message,
  });

  const populatedMessage = await Message.findById(newMessage._id)
    .populate("sender", "fullName profilePhoto")
    .populate("receiver", "fullName profilePhoto");

  // 🔥 REAL TIME MESSAGE
  const io = getIO();

  io.to(receiverId.toString()).emit("newMessage", populatedMessage);

  return res.status(201).json(
    new apiResponse(
      201,
      populatedMessage,
      "Message sent successfully"
    )
  );
});


// ======================================
// GET CHAT BETWEEN TWO USERS
// ======================================

export const getMessages = asyncHandler(async (req, res) => {

  const myId = req.user._id;

  const { userId } = req.params;

  const conversationId = buildConversationId(myId, userId);

  const messages = await Message.find({
   converationId,
  })
    .sort({ createdAt: 1 })
    .populate("sender", "fullName profilePhoto")
    .populate("receiver", "fullName profilePhoto");

  return res.status(200).json(
    new apiResponse(
      200,
      messages,
      "Messages fetched successfully"
    )
  );
});


// ======================================
// MARK MESSAGE AS SEEN
// ======================================

export const markMessagesAsSeen = asyncHandler(async (req, res) => {

  const { userId } = req.params;

  await Message.updateMany(
    {
      sender: userId,
      receiver: req.user._id,
      isSeen: false,
    },
    {
      isSeen: true,
    }
  );

  return res.status(200).json(
    new apiResponse(
      200,
      {},
      "Messages marked as seen"
    )
  );
});


// ======================================
// GET CHAT USERS
// ======================================

import User from "../Models/User.js";

export const getChatUsers = asyncHandler(async (req, res) => {
  const myId = req.user._id;

  const chats = await Message.aggregate([
    {
      $match: {
        $or: [
          { sender: myId },
          { receiver: myId },
        ],
      },
    },

    {
      $sort: {
        createdAt: -1,
      },
    },

    {
      $group: {
        _id: "$conversationId",

        lastMessage: {
          $first: "$message",
        },

        lastMessageTime: {
          $first: "$createdAt",
        },

        sender: {
          $first: "$sender",
        },

        receiver: {
          $first: "$receiver",
        },

        unreadCount: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ["$receiver", myId] },
                  { $eq: ["$isSeen", false] },
                ],
              },
              1,
              0,
            ],
          },
        },
      },
    },

    {
      $addFields: {
        otherUser: {
          $cond: [
            { $eq: ["$sender", myId] },
            "$receiver",
            "$sender",
          ],
        },
      },
    },

    {
      $lookup: {
        from: "users",
        localField: "otherUser",
        foreignField: "_id",
        as: "user",
      },
    },

    {
      $unwind: "$user",
    },

    {
      $project: {
        _id: 0,

        conversationId: "$_id",

        user: {
          _id: "$user._id",
          fullName: "$user.fullName",
          profilePhoto: "$user.profilePhoto",
        },

        lastMessage: 1,

        lastMessageTime: 1,

        unreadCount: 1,
      },
    },

    {
      $sort: {
        lastMessageTime: -1,
      },
    },
  ]);

  return res.status(200).json(
    new apiResponse(
      200,
      chats,
      "Chat users fetched successfully"
    )
  );
});