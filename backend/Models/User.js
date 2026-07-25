import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    phoneNumber : {
      type: String,
      default: null,
      trim: true,
      minlength : 10,
      maxlength : 10
    },
    profileCompleted: {  //for user who signup with google need to complete profile (adding phone number)
      type: Boolean,
      default: false,
    },
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
//       required: function () {
// // password required ONLY for local auth
//       return !this.googleId;
//       },
      minLength: 6,
    },
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    googleId: {
      type: String,
      default: null,
    },
    history: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
    },
    // profilePhoto: {
    //   type: String, // store Cloudinary URL
    //   default: "",
    // },
    avatar: {
    type: String,
},

address: {
    type: String,
},

city: {
    type: String,
},

state: {
    type: String,
},
    refreshToken: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    verificationToken: {
      type: String
    },
    verificationTokenExpiry: {
      type: Date
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetTokenExpiry: {
      type: Date,
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
