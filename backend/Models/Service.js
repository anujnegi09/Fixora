import mongoose from "mongoose";
 
const ServiceSchema = new mongoose.Schema(
  {
    // Link to User model (creator of the service)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // NEW: you'll constantly query "all services created by this user"
      // for the owner's dashboard, so this needs to be indexed.
    },
 
    title: {
      type: String,
      required: true,
      trim: true,
    },
 
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
   totalReviews: {
    type: Number,
    default: 0,
},
    availability: {
      days: {
        type: [
          {
            day: {
              type: String,
              required: true,
              enum: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
            },
            available: { type: Boolean, required: true },
          },
        ],
        // FIX: `required: true` on an array does NOT stop someone from
        // saving an EMPTY array []. Mongoose's `required` only blocks
        // `undefined`/`null`, not "empty". We add a custom validator
        // below to actually enforce "at least one day must be provided".
        validate: {
          validator: function (value) {
            return Array.isArray(value) && value.length > 0;
          },
          message: "Please provide availability for at least one day.",
        },
      },
    },

    location: {
      address: {
          type: String,
          required: true,
      },
      city: {
          type: String,
          required: true,
          index: true,
      },
      state: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
     coordinates: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point",
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true,
        },
      },
    },
    serviceRadius: {
    type: Number,
    required: true,
    default: 10, // kilometers
    },
    phoneNumber: {
      type: String,
      required: true,
      match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"],
    },
    price: {
      type: Number,
      required: true,
    },
  category: {
  type: String,
  required: true,
  enum: [
    "Electrician",
    "Plumber",
    "Carpenter",
    "Painter",
    "Cleaner",
    "Mechanic",
    "AC Repair",
    "Tutor",
    "Beautician",
    "other",
    ],
  },
    // used to control whether the service shows up in browse results
    // (should be tied to the user's active subscription status)
    isVisible: {
      type: Boolean,
      default: false,
    },

  },
  { timestamps: true }
);
// NEW: helps full-text search across title & description when users
// search for services (e.g. "plumber", "AC repair").

ServiceSchema.index({"location.coordinates": "2dsphere",});
ServiceSchema.index({ title: "text", description: "text" });
 
const Service = mongoose.model("Service", ServiceSchema);
 
export default Service;