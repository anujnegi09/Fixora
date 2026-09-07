import express from "express";

import {
  sendMessage,
  getMessages,
  markMessagesAsSeen,
  getChatUsers,
} from "../controllers/ChatContoller.js";

import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();


// SEND MESSAGE
router.post(
  "/send",
  verifyJWT,
  sendMessage
);


// GET CHAT
router.get(
  "/:userId",
  verifyJWT,
  getMessages
);


// MARK AS SEEN
router.put(
  "/seen/:userId",
  verifyJWT,
  markMessagesAsSeen
);


// GET CHAT USERS
router.get(
  "/users/all",
  verifyJWT,
  getChatUsers
);

export default router;