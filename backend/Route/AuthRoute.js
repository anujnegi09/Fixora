import express from "express";
import passport from "passport";
import {
  register,
  login,
  logout,
  refreshAccessToken,
  checkAuth,
  verifyEmail,
  forgotPassword,
  resetPassword,
  googleCallback
} from "../Controller/AuthController.js";
import { verifyJWT } from "../Middleware/authMiddleware.js";
import {upload} from "../Middleware/multerMiddleware.js";

const router = express.Router();

/**
 * =====================================================
 * 🧾 PUBLIC ROUTES
 * =====================================================
 */

// Register user
router.post("/register",upload.single("profilePhoto"), register);

// Login user
router.post("/login", login);

// Refresh access token
router.post("/refresh-token", refreshAccessToken);

// Email verification
router.get("/verify-email/:token", verifyEmail);

// Send password reset email
router.post("/forgot-password", forgotPassword);

// Reset password using token from email
router.post("/reset-password/:token", resetPassword);


/**
 * ==========================================
 * GOOGLE AUTH
 * ==========================================
 */

// Start Google Login
router.get(
  "/google",

  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

// Google Callback
router.get(
  "/google/callback",

  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),

  googleCallback
);

/**
 * =====================================================
 * 🔒 PROTECTED ROUTES
 * =====================================================
 */

// Check logged in user
router.get("/check-auth", verifyJWT, checkAuth);

// Logout
router.post("/logout", verifyJWT, logout);



export default router;