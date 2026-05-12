import express from "express";
import { updateProfile , getProfile } from "../Controller/UserController.js";
import { verifyJWT } from "../Middlewares/authMiddleware.js";

const router = express.Router();

/**
 * =====================================================
 * 🔒 PROTECTED ROUTES (USER MUST BE LOGGED IN)
 * =====================================================
 */
router.put("/update-profile", verifyJWT, updateProfile);
router.get("/profile", verifyJWT, getProfile);


export default router;
