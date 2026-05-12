import express from "express";
import passport from "passport";
import {
  register,
  login,
  logout,
  refreshAccessToken,
  checkAuth,
  verifyEmail,
} from "../Controller/AuthController.js";
import {
  googleCallback,
} from "../Controller/AuthController.js";

import { verifyJWT } from "../Middlewares/authMiddleware.js";

const router = express.Router();

/**
 * =====================================================
 * 🧾 PUBLIC ROUTES
 * =====================================================
 */

// Register user
router.post("/register", register);

// Login user
router.post("/login", login);

// Refresh access token
router.post("/refresh-token", refreshAccessToken);

// Email verification
router.get("/verify-email/:token", verifyEmail);


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




















// import express from "express";
// import {
//   register,
//   login,
//   logout,
//   refreshAccessToken,
//   updateProfile,
//   checkAuth,
//   verifyEmail,
// } from "../Controller/UserController.js";
// import { verifyJWT } from "../Middlewares/authMiddleware.js";

// const router = express.Router();

// /**
//  * =====================================================
//  * 🧾 PUBLIC ROUTES
//  * =====================================================
//  */

// router.post("/register", register);
// router.post("/login", login);
// router.post("/refresh-token", refreshAccessToken);

// /**
//  * =====================================================
//  * 🔒 PROTECTED ROUTES (USER MUST BE LOGGED IN)
//  * =====================================================
//  */
// router.get("/check-auth", verifyJWT, checkAuth);
// router.post("/logout", verifyJWT, logout);

// // ===================================
// //   EMAIL VERIFICATION ROUTE
// // ===================================
// router.get("/verify-email/:token", verifyEmail);

// export default router;