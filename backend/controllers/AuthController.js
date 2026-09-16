import bcrypt from "bcryptjs";
import User from "../models/UserModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import generateToken from "../utils/generateToken.js";
import crypto from "crypto";
import resend from "../configs/Mail.js";
/**
 * =====================================================
 * 🔐 REGISTER USER
 * =====================================================
 */
export const register = asyncHandler(async (req, res) => {
  const { phoneNumber, fullName, email, userName, password } = req.body;

  if (!phoneNumber || !fullName || !email || !userName || !password) {
    throw new apiError(400, "All fields are required");
  }
  if (!email.includes("@")) {
    throw new apiError(400, "Invalid email format");
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { userName: userName.toLowerCase() }],
  });

  if (existingUser) {
    throw new apiError(400, "Email or username already registered");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Generate 6-digit OTP
  const verificationOtp = Math.floor(
    100000 + Math.random() * 900000,
  ).toString();

  // OTP valid for 10 minutes
  const verificationOtpExpiry = new Date(Date.now() + 10 * 60 * 1000);

  const user = await User.create({
    phoneNumber,
    fullName,
    email,
    userName: userName.toLowerCase(),
    password: hashedPassword,
    authProvider: "local",
    verificationOtp,
    verificationOtpExpiry,
  });
  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: "Verify your Fixora account",
    html: `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden;">

        <div style="background: #4f46e5; color: #ffffff; padding: 20px; text-align: center;">
          <img
            src="https://raw.githubusercontent.com/anujnegi09/Fixora/main/frontend/src/assets/Logo.png"
            alt="Fixora"
            style="height: 50px; width: 50px; border-radius: 50%;"
          >
          <h2 style="margin: 0;">Fixora</h2>
        </div>

        <div style="padding: 30px; color: #333;">
          <h2 style="margin-top: 0;">Verify Your Email</h2>

          <p>Hi ${user.fullName || "User"},</p>

          <p>
            Thank you for signing up on <strong>Fixora</strong>.
            Please use the OTP below to verify your email address.
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <div style="
              display: inline-block;
              background: #f3f4f6;
              padding: 15px 30px;
              border-radius: 8px;
              font-size: 32px;
              font-weight: bold;
              letter-spacing: 8px;
              color: #4f46e5;
            ">
              ${verificationOtp}
            </div>
          </div>

          <p>
            This OTP will expire in <strong>10 minutes</strong>.
          </p>

          <p>
            If you did not create this account, please ignore this email.
          </p>

          <p>
            Best regards,<br>
            <strong>Fixora Team</strong>
          </p>
        </div>

        <div style="
          background: #f9f9f9;
          text-align: center;
          padding: 15px;
          font-size: 12px;
          color: #777;
        ">
          © ${new Date().getFullYear()} Fixora. All rights reserved.
        </div>

      </div>
    </div>
  `,
  });
  if (error) {
    console.error("❌ RESEND ERROR:", error);
    throw new apiError(500, "Unable to send verification email");
  }

  return res
    .status(201)
    .json(
      new apiResponse(
        201,
        {},
        "Account created successfully. Please verify your email.",
      ),
    );
});

/**
 * =====================================================
 * 🔑 LOGIN USER
 * =====================================================
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new apiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user) throw new apiError(404, "No account found with this email");

  // Prevent google users from local login
  if (user.authProvider === "google") {
    throw new apiError(
      400,
      "This account was created with Google. Please continue with Google login.",
    );
  }

  if (!user.isVerified) {
    throw new apiError(403, "Please verify your email before logging in");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new apiError(400, "Invalid password");

  // 🪙 Generate tokens
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  // Save refresh token
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  // Exclude sensitive info
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  // 🍪 Set cookies
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });

  // ✅ Response
  return res.status(200).json(
    new apiResponse(
      200,
      {
        user: loggedInUser,
        accessToken,
      },
      "Login successful",
    ),
  );
});

/**
 * =====================================================
 * 🔁 REFRESH ACCESS TOKEN
 * =====================================================
 */
export const refreshAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw new apiError(401, "Refresh token missing");
  }

  const user = await User.findOne({ refreshToken });
  if (!user) {
    throw new apiError(403, "Invalid refresh token");
  }

  const newAccessToken = user.generateAccessToken();
  const newRefreshToken = user.generateRefreshToken();

  // Update refresh token
  user.refreshToken = newRefreshToken;
  await user.save({ validateBeforeSave: false });

  // Replace cookies
  res.cookie("accessToken", newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  });

  return res
    .status(200)
    .json(new apiResponse(200, {}, "Access token refreshed successfully"));
});

/**
 * =====================================================
 * 🚪 LOGOUT USER
 * =====================================================
 */
export const logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw new apiError(400, "No refresh token found in cookies");
  }

  // Find user by refresh token and clear it
  const user = await User.findOne({ refreshToken });
  if (user) {
    user.refreshToken = null;
    await user.save({ validateBeforeSave: false });
  }

  // 🧹 Clear cookies properly (for both dev and production)
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });

  return res
    .status(200)
    .json(new apiResponse(200, {}, "Logged out successfully"));
});

// =============================
// forget PASSWORD CONTROLLER
// =============================

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new apiError(400, "Email is required");
  }

  const user = await User.findOne({ email });

  // Don't reveal whether email exists
  if (!user) {
    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          {},
          "If an account with this email exists, a reset link has been sent.",
        ),
      );
  }

  // Google users don't have local passwords
  if (user.authProvider === "google") {
    throw new apiError(400, "This account uses Google Sign-In.");
  }

  // Generate secure token
  const resetToken = crypto.randomBytes(32).toString("hex");

  user.passwordResetToken = resetToken;
  user.passwordResetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "Reset Your Password",
    html: `
      <h2>Reset Password</h2>

      <p>Hello ${user.fullName},</p>

      <p>You requested to reset your password.</p>

      <a href="${resetUrl}">
        Reset Password
      </a>

      <p>This link expires in 15 minutes.</p>

      <p>If you didn't request this, ignore this email.</p>
    `,
  });

  return res.status(200).json(
    new apiResponse(
      200,
      {},

      "Password reset link sent successfully.",
    ),
  );
});

// =============================
// RESET PASSWORD CONTROLLER (after forgot password)
// =============================

export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { newPassword, confirmPassword } = req.body;

  // Validate input
  if (!newPassword || !confirmPassword) {
    throw new apiError(400, "All fields are required");
  }

  if (newPassword !== confirmPassword) {
    throw new apiError(400, "Passwords do not match");
  }

  if (newPassword.length < 8) {
    throw new apiError(400, "Password must be at least 8 characters long");
  }

  // Find user with valid token
  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new apiError(400, "Invalid or expired reset token");
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update password
  user.password = hashedPassword;

  // Remove reset token
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpiry = undefined;

  // Logout from all devices
  user.refreshToken = null;

  await user.save({ validateBeforeSave: false });

  // Clear cookies
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        {},
        "Password reset successfully. Please login again.",
      ),
    );
});

// =============================
// 🌟 CHECK AUTH CONTROLLER
// =============================
export const checkAuth = asyncHandler(async (req, res) => {
  return res.status(200).json(
    {
      success: true,
      user: req.user,
      profileCompleted: req.user.profileCompleted,
    },
    "User authenticated successfully",
  );
});

// ===================================
//   EMAIL VERIFICATION CONTROLLER
// ===================================
export const verifyEmail = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    throw new apiError(400, "Email and OTP are required");
  }

  const user = await User.findOne({
    email: email.toLowerCase(),
  });

  if (!user) {
    throw new apiError(404, "User not found");
  }

  if (user.isVerified) {
    throw new apiError(400, "Email is already verified");
  }

  if (!user.verificationOtp) {
    throw new apiError(400, "No verification OTP found");
  }

  if (!user.verificationOtpExpiry || user.verificationOtpExpiry < new Date()) {
    throw new apiError(400, "OTP has expired");
  }

  if (user.verificationOtp !== otp) {
    throw new apiError(400, "Invalid OTP");
  }

  // Mark email as verified
  user.isVerified = true;
  user.verificationOtp = undefined;
  user.verificationOtpExpiry = undefined;

  // Generate tokens
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;

  await user.save({ validateBeforeSave: false });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  });

  return res
    .status(200)
    .json(
      new apiResponse(200, {}, "Email verified and logged in successfully"),
    );
});

// ===================================
//   AGAIN EMAIL VERIFICATION CONTROLLER
// ===================================
export const resendVerification = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new apiError(400, "Email is required");
  }

  const user = await User.findOne({
    email: email.toLowerCase(),
  });

  if (!user) {
    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          {},
          "If an account exists with this email, an OTP has been sent.",
        ),
      );
  }

  if (user.isVerified) {
    throw new apiError(400, "Email is already verified");
  }

  // Generate new OTP
  const verificationOtp = Math.floor(
    100000 + Math.random() * 900000,
  ).toString();

  const verificationOtpExpiry = new Date(Date.now() + 10 * 60 * 1000);

  // This automatically invalidates the old OTP
  user.verificationOtp = verificationOtp;
  user.verificationOtpExpiry = verificationOtpExpiry;

  await user.save();

  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: "Your Fixora verification OTP",
    html: `
      <h2>Verify your Fixora account</h2>

      <p>Your new verification OTP is:</p>

      <h1>${verificationOtp}</h1>

      <p>This OTP will expire in 10 minutes.</p>
    `,
  });

  if (error) {
    console.error("❌ RESEND ERROR:", error);
    throw new apiError(500, "Unable to send verification OTP");
  }

  return res
    .status(200)
    .json(new apiResponse(200, {}, "Verification OTP sent successfully."));
});

/**
 * ==========================================
 * GOOGLE CALLBACK CONTROLLER
 * ==========================================
 **/
export const googleCallback = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new apiError(401, "Google authentication failed");
  }

  // Generate Tokens
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  // Save Refresh Token
  user.refreshToken = refreshToken;

  await user.save({
    validateBeforeSave: false,
  });

  // Get Safe User
  const safeUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  // Cookie Options
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  };

  // Set Cookies
  res.cookie("accessToken", accessToken, cookieOptions);
  res.cookie("refreshToken", refreshToken, cookieOptions);

  return res.redirect(`${process.env.FRONTEND_URL}/auth/google/success`);
});
