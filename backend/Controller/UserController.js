import User from "../Models/User.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import apiError from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";
import uploadOnCloudinary from "../Utils/uploadOnCloudinary.js";
import bcrypt from "bcryptjs";
import fs from "fs";

/**
 * =====================================================
 * 👤 GET OWN PROFILE
 * =====================================================
 */
export const getProfile = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new apiError(401, "Unauthorized");
  }
  const user = await User.findById(userId)
    .select("-password -refreshToken");

  if (!user) {
    throw new apiError(404, "User not found");
  }

  return res.status(200).json(
    new apiResponse(200, user, "Profile fetched successfully")
  );
});


/**
 * =====================================================
 * 🧑 UPDATE PROFILE
 * =====================================================
 */

export const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const {fullName,userName, phoneNumber } = req.body;
  const user = await User.findById(userId);

  if (!user) {
    throw new apiError(404, "User not found");
  }
  // ✅ Update full name
  if (fullName) {
    user.fullName = fullName.trim();
  }
  if (userName) {
  user.userName = userName.trim();
  }

  // ✅ Update phone number
  if (phoneNumber) {
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      throw new apiError(400, "Invalid phone number");
    }
    const existingUser = await User.findOne({
      phoneNumber,
      _id: { $ne: userId },
    });
    if (existingUser) {
      throw new apiError(
        409,
        "Phone number already exists"
      );
    }
    user.phoneNumber = phoneNumber;
  }
  // ✅ Upload avatar using Multer
  if (req.file) {
  const uploadedAvatar = await uploadOnCloudinary(req.file.path,"Fixora/avatars");
  if (!uploadedAvatar) {
    throw new apiError(500, "Failed to upload avatar");
  }
  user.avatar = uploadedAvatar.secure_url;
}
  await user.save();
  const updatedUser = await User.findById(userId)
    .select("-password -refreshToken");
  return res.status(200).json(
    new apiResponse(
      200,
      updatedUser,
      "Profile updated successfully"
    )
  );
});


// =============================
// complete profile CONTROLLER
// =============================

export const completeProfile = asyncHandler(async (req, res) => {

    const {
        phoneNumber,
    } = req.body;

    // Phone number is required
    if (!phoneNumber) {
        throw new apiError(400, "Phone number is required");
    }
    // Indian phone validation
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(phoneNumber)) {
        throw new apiError(400, "Invalid phone number");
    }
    // Prevent duplicate phone numbers
    const existingUser = await User.findOne({
        phoneNumber,
        _id: { $ne: req.user._id },
    });
    if (existingUser) {
        throw new apiError(
            409,
            "Phone number already exists"
        );
    }
    // Upload avatar if provided
    let avatar = req.user.avatar;

    if (req.file) {

        const uploadedAvatar =
            await uploadOnCloudinary(req.file.path,"Fixora/avatars");

        if (!uploadedAvatar) {
            throw new apiError(
                500,
                "Avatar upload failed"
            );
        }

        avatar = uploadedAvatar.secure_url;
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                phoneNumber,
                avatar,
                profileCompleted: true,
            },
        },
        {
            new: true,
        }
    ).select("-password -refreshToken");

    return res.status(200).json(
        new apiResponse(
            200,
            {
                user: updatedUser,
            },
            "Profile completed successfully"
        )
    );

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

    if (newPassword.length < 6) {
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


export const updateLocation = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const {
        address,
        city,
        state,
        pincode,
        latitude,
        longitude,
    } = req.body;

    if (
        !address ||
        latitude === undefined ||
        longitude === undefined
    ) {
        throw new apiError(
            400,
            "Location details are required"
        );
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new apiError(
            404,
            "User not found"
        );
    }

    user.location = {
        address,
        city,
        state,
        pincode,

        coordinates: {
            type: "Point",
            coordinates: [
                Number(longitude), // MongoDB requires [lng, lat]
                Number(latitude),
            ],
        },
    };

    await user.save({ validateBeforeSave: false });
    const updatedUser = await User.findById(userId)
    .select("-password -refreshToken");

    return res.status(200).json(
        new apiResponse(
            200,
            updatedUser,
            "Location updated successfully"
        )
    );

});