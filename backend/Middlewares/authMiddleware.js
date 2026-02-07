import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import apiError from "../Utils/apiError.js";
import { asyncHandler } from "../Utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  // Get token from cookies or Authorization header
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new apiError(401, "Unauthorized request - token missing");
  }

  try {
    // Verify JWT
     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Find user from token payload
    const user = await User.findById(decoded?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new apiError(404, "User not found or deleted");
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (error) {
    throw new apiError(401, "Invalid or expired token");
  }
});
