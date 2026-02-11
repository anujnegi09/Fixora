import bcrypt from "bcryptjs";
import User from "../Models/User.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import apiError from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";
import cloudinary from "../Utils/cloudinarySetup.js";

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

  // Check if email or username already exists
  const existingUser = await User.findOne({
    $or: [{ email }, { userName }],
  });
  if (existingUser) {
    throw new apiError(400, "Email or username already registered");
  }

  // 🔑 Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 🧍 Create new user
  const user = await User.create({
    fullName,
    email,
    userName,
    password: hashedPassword,
  });

  // 🪙 Generate tokens
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  // 💾 Save refresh token
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  // 🍪 Set cookies
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
  });

  // ✅ Response
  return res.status(201).json(
    new apiResponse(
      201,
      {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        userName: user.userName,
      },
      "Account created successfully"
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

/**
 * =====================================================
 * 🧑 UPDATE PROFILE
 * =====================================================
 */
export const updateProfile = asyncHandler(async (req, res) => {
  const { profilePhoto, fullName } = req.body;
  const userId = req.user?._id;

  if (!userId) throw new apiError(401, "Unauthorized");

  const user = await User.findById(userId);
  if (!user) throw new apiError(404, "User not found");

  let updatedData = {};
  if (fullName) updatedData.fullName = fullName;

  if (profilePhoto) {
    const upload = await cloudinary.uploader.upload(profilePhoto, {
      folder: "LocalSkillHub/avatars",
    });
    updatedData.profilePhoto = upload.secure_url;
  }

  const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
    new: true,
  }).select("-password -refreshToken");

  return res
    .status(200)
    .json(new apiResponse(200, updatedUser, "Profile updated successfully"));
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


