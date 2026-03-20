import express from "express";
import {
  register,
  login,
  logout,
  refreshAccessToken,
  updateProfile,
  checkAuth,
  verifyEmail,
} from "../Controller/UserController.js";
import { verifyJWT } from "../Middlewares/authMiddleware.js";

const router = express.Router();

/**
 * =====================================================
 * 🧾 PUBLIC ROUTES
 * =====================================================
 */

router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshAccessToken);

/**
 * =====================================================
 * 🔒 PROTECTED ROUTES (USER MUST BE LOGGED IN)
 * =====================================================
 */
router.get("/check-auth", verifyJWT, checkAuth);
router.post("/logout", verifyJWT, logout);
router.put("/update-profile", verifyJWT, updateProfile);

// ===================================
//   EMAIL VERIFICATION ROUTE
// ===================================
router.get("/verify-email/:token", verifyEmail);

export default router;
