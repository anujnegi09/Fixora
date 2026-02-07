import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
    },
    history: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
    },
    profilePhoto: {
      type: String, // store Cloudinary URL
      default: "",
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// === Access Token Method ===
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      userName: this.userName,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY, // e.g., "15m"
    }
  );
};

// === Refresh Token Method ===
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY, // e.g., "7d"
    }
  );
};

const User = mongoose.model("User", userSchema);

export default User;
