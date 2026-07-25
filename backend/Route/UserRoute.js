import express from "express";
import { updateProfile, getProfile, changePassword, completeProfile } from "../Controller/UserController.js";
import { verifyJWT } from "../Middleware/authMiddleware.js";
import {upload} from "../Middleware/multerMiddleware.js";
import uploadOnCloudinary from "../Utils/uploadOnCloudinary.js";

const router = express.Router();

/**
 * =====================================================
 * 🔒 PROTECTED ROUTES (USER MUST BE LOGGED IN)
 * =====================================================
 */

//update profile
router.patch("/update-profile", verifyJWT,upload.single("avatar"), updateProfile);
//get profile
router.get("/profile", verifyJWT, getProfile);
// change password 
router.put("/change-password", verifyJWT, changePassword);
//complete profile
router.put("/complete-profile", verifyJWT,upload.single("avatar"), completeProfile);


export default router;
