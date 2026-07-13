import User from "../Model/User.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import apiError from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";
import cloudinary from "../Config/CloudinarySetup.js";

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
  const { profilePhoto, fullName } = req.body;
  const userId = req.user?._id;

  if (!userId) {
    throw new apiError(401, "Unauthorized");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new apiError(404, "User not found");
  }

  let updatedData = {};

  // ✅ Update name
  if (fullName) {
    updatedData.fullName = fullName.trim();
  }

  // ✅ Upload profile photo
  if (profilePhoto) {
    const upload = await cloudinary.uploader.upload(profilePhoto, {
      folder: "Fixora/avatars", // better naming
    });

    updatedData.profilePhoto = upload.secure_url;
  }

  // ❗ Prevent empty update
  if (Object.keys(updatedData).length === 0) {
    throw new apiError(400, "No data provided to update");
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    updatedData,
    { new: true }
  ).select("-password -refreshToken");

  return res.status(200).json(
    new apiResponse(200, updatedUser, "Profile updated successfully")
  );
});

// import User from "../Models/User.js";
// import { asyncHandler } from "../Utils/asyncHandler.js";
// import apiError from "../Utils/apiError.js";
// import apiResponse from "../Utils/apiResponse.js";
// import cloudinary from "../Config/CloudinarySetup.js";


// /**
//  * =====================================================
//  * 🧑 UPDATE PROFILE
//  * =====================================================
//  */
// export const updateProfile = asyncHandler(async (req, res) => {
//   const { profilePhoto, fullName } = req.body;
//   const userId = req.user?._id;

//   if (!userId) throw new apiError(401, "Unauthorized");

//   const user = await User.findById(userId);
//   if (!user) throw new apiError(404, "User not found");

//   let updatedData = {};
//   if (fullName) updatedData.fullName = fullName;

//   if (profilePhoto) {
//     const upload = await cloudinary.uploader.upload(profilePhoto, {
//       folder: "LocalSkillHub/avatars",
//     });
//     updatedData.profilePhoto = upload.secure_url;
//   }

//   const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
//     new: true,
//   }).select("-password -refreshToken");

//   return res
//     .status(200)
//     .json(new apiResponse(200, updatedUser, "Profile updated successfully"));
// });

// export const getProfile = asyncHandler(async (req, res) => {
//   const userId = req.user?._id;
//   if(!userId ) throw new apiError(401, "Un")
// }
// )

