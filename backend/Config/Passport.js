import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../Models/User.js";
import dotenc from "dotenv";
import  logger  from "./Logger.js";

dotenc.config();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    

    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        // 🔍 Check existing user
        let user = await User.findOne({ email });

        if (user && user.authProvider === "local") {
          return done(
            new Error(
              "An account with this email already exists. Please sign in with your password."
            ),
            null
          );
        }

        // ✅ If no user → create
        if (!user) {
          user = await User.create({
            fullName: profile.displayName,
            email: profile.emails[0].value,
            userName:profile.emails[0].value.split("@")[0] + Date.now(),
            googleId: profile.id,
            authProvider: "google",
            profilePhoto: profile.photos[0]?.value,
            isVerified: true,
            phoneNumber: null,
            profileCompleted: false,
         });
        }

       if (!user.googleId) {
        user.googleId = profile.id;
        user.authProvider = "google";
        await user.save({
        validateBeforeSave: false,
        });
       }

        return done(null, user);

      } catch (error) {
        logger.error("Error in Google Strategy:", error);
        return done(error, null);
      }
    }
  )
);

export default passport;