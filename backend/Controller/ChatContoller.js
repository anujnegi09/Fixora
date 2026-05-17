import mongoose from "mongoose";
import Message from "../Models/Message.js";
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

  const newMessage = await Message.create({
    sender: senderId,
    receiver: receiverId,
    bookingId,
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

  const messages = await Message.find({
    $or: [
      { sender: myId, receiver: userId },
      { sender: userId, receiver: myId },
    ],
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

export const getChatUsers = asyncHandler(async (req, res) => {

  const myId = req.user._id;

  const users = await Message.aggregate([

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
        _id: {
          $cond: [
            { $eq: ["$sender", myId] },
            "$receiver",
            "$sender",
          ],
        },

        lastMessage: {
          $first: "$message",
        },

        createdAt: {
          $first: "$createdAt",
        },
      },
    },
  ]);

  return res.status(200).json(
    new apiResponse(
      200,
      users,
      "Chat users fetched successfully"
    )
  );
});