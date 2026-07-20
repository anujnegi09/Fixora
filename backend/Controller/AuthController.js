import bcrypt from "bcryptjs";
import User from "../Models/User.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import apiError from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";
import generateToken from "../Utils/generateToken.js";
import { transporter } from "../Config/Mail.js";
import crypto from "crypto";

/**
 * =====================================================
 * 🔐 REGISTER USER
 * =====================================================
 */
export const register = asyncHandler(async (req, res) => {
  const { fullName, email, userName, password } = req.body;

  if (!fullName || !email || !userName || !password) {
    throw new apiError(400, "All fields are required");
  }
  if (!email.includes("@")) {
  throw new apiError(400, "Invalid email format");
  }
  
  const existingUser = await User.findOne({
    $or: [{ email }, { userName : userName.toLowerCase() }],
  });

  if (existingUser) {
    throw new apiError(400, "Email or username already registered");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Email verification token
  const verificationToken = generateToken();
  const verificationTokenExpiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

  const user = await User.create({
    fullName,
    email,
    userName : userName.toLowerCase(),
    password: hashedPassword,
    authProvider : "local",
    verificationToken,
    verificationTokenExpiry,
  });

  const verificationUrl = `${process.env.BASE_URL}/users/verify-email/${verificationToken}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "Verify your email",
    html: `
       <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <div style="background: #4f46e5; color: #ffffff; padding: 20px; text-align: center;">
        <img src="https://raw.githubusercontent.com/anujnegi09/Fixora/main/frontend/src/assets/Logo.png" alt="Fixora" style="height: 50px;  width: 50px; border-radius: 50%;">
        <h2 style="margin: 0;">Fixora</h2>
      </div>

      <!-- Body -->
      <div style="padding: 30px; color: #333;">
        <h2 style="margin-top: 0;">Verify Your Email</h2>
        <p>Hi ${user.fullName || "User"},</p>
        
        <p>Thank you for signing up on <strong>Fixora</strong>. Please verify your email address to get started.</p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" 
             style="background: #4f46e5; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Verify Email
          </a>
        </div>

        <p>If the button above doesn’t work, copy and paste the link below into your browser:</p>
        <p style="word-break: break-all; color: #4f46e5;">${verificationUrl}</p>

        <p style="margin-top: 20px;">This link will expire in 24 hours.</p>

        <p>If you did not create this account, please ignore this email.</p>

        <p>Best regards,<br><strong>Fixora Team</strong></p>
      </div>

      <!-- Footer -->
      <div style="background: #f9f9f9; text-align: center; padding: 15px; font-size: 12px; color: #777;">
        © ${new Date().getFullYear()} Fixora. All rights reserved.
      </div>
      
    </div>
  </div>
    `,
  });

  return res.status(201).json(
    new apiResponse(
      201,
      {},
      "Account created successfully. Please verify your email."
    )
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
      "This account was created with Google. Please continue with Google login."
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
  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  // 🍪 Set cookies
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  // ✅ Response
  return res.status(200).json(
    new apiResponse(
      200,
      {
        user: loggedInUser,accessToken
      },
      "Login successful"
    )
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
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
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
    sameSite: "strict",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res
    .status(200)
    .json(new apiResponse(200, {}, "Logged out successfully"));
});


// =============================
// CHANGE PASSWORD CONTROLLER
// =============================

export const changePassword = asyncHandler(async (req, res) => {

    const {
        currentPassword,
        newPassword,
        confirmPassword
    } = req.body;

    if (
        !currentPassword ||
        !newPassword ||
        !confirmPassword
    ) {
        throw new apiError(400, "All fields are required");
    }

    if (newPassword !== confirmPassword) {
        throw new apiError(
            400,
            "Passwords do not match"
        );
    }

    if (newPassword.length < 8) {
        throw new apiError(
            400,
            "Password must be at least 8 characters"
        );
    }

    const user = await User.findById(req.user._id);

    const isMatch = await bcrypt.compare(
        currentPassword,
        user.password
    );

    if (!isMatch) {
        throw new apiError(
            400,
            "Current password is incorrect"
        );
    }

    if (currentPassword === newPassword) {
        throw new apiError(
            400,
            "New password must be different"
        );
    }

    const hashedPassword = await bcrypt.hash(
        newPassword,
        10
    );

    user.password = hashedPassword;

    user.refreshToken = null;

    await user.save();

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.status(200).json({
        success: true,
        message:
            "Password changed successfully. Please login again."
    });

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
    return res.status(200).json(
      new apiResponse(
        200,
        {},
        "If an account with this email exists, a reset link has been sent."
      )
    );
  }

  // Google users don't have local passwords
  if (user.authProvider === "google") {
    throw new apiError(
      400,
      "This account uses Google Sign-In."
    );
  }

  // Generate secure token
  const resetToken = crypto.randomBytes(32).toString("hex");

  user.passwordResetToken = resetToken;
  user.passwordResetTokenExpiry =
    Date.now() + 15 * 60 * 1000; // 15 minutes

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
      "Password reset link sent successfully."
    )
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
    throw new apiError(
      400,
      "Password must be at least 8 characters long"
    );
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
    sameSite: "strict",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.status(200).json(
    new apiResponse(
      200,
      {},
      "Password reset successfully. Please login again."
    )
  );
});

// =============================
// 🌟 CHECK AUTH CONTROLLER
// =============================
export const checkAuth = asyncHandler(async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
});

// ===================================
//   EMAIL VERIFICATION CONTROLLER
// ===================================
export const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;

  const user = await User.findOne({
    verificationToken: token,
    verificationTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new apiError(400, "Invalid or expired token");
  }

  // Mark user verified
  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpiry = undefined;

  // Generate tokens
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  // Set cookies
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json(
    new apiResponse(
      200,
      {},
      "Email verified and logged in successfully"
    )
  );
});

/**
 * ==========================================
 * GOOGLE CALLBACK CONTROLLER
 * ==========================================
**/

export const googleCallback = async (req, res) => {

  try {

    const user = req.user;

    // Generate tokens
    const accessToken = user.generateAccessToken();

    const refreshToken = user.generateRefreshToken();

    // Save refresh token
    user.refreshToken = refreshToken;

    await user.save({
      validateBeforeSave: false,
    });

    // Safe user
    const safeUser = await User.findById(user._id)
      .select("-password -refreshToken");

    // Cookie options
    const cookieOptions = {
      httpOnly: true,

      secure: process.env.NODE_ENV === "production",

      sameSite: "strict",
    };

    // Set cookies
    res.cookie(
      "accessToken",
      accessToken,
      cookieOptions
    );

    res.cookie(
      "refreshToken",
      refreshToken,
      cookieOptions
    );

    // Response
    return res.status(200).json({
      success: true,

      message: "Google login successful",

      user: safeUser,

      accessToken,
    });

  } catch (error) {

    console.log("Google Auth Error:", error);

    return res.status(500).json({
      success: false,
      message: "Google authentication failed",
    });
  }
};


