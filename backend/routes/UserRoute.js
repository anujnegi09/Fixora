import express from "express";
import { updateProfile, getProfile, changePassword, completeProfile, updateLocation } from "../controllers/UserController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import {upload} from "../middlewares/multerMiddleware.js";
import uploadOnCloudinary from "../utils/uploadOnCloudinary.js";

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
router.patch("/change-password", verifyJWT, changePassword);
//complete profile
router.patch("/complete-profile", verifyJWT,upload.single("avatar"), completeProfile);

router.patch("/location",verifyJWT, updateLocation);


export default router;
