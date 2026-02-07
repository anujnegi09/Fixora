import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  // 🔗 Link to User model (creator of the service)
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",   // references your User model
    required: true
  },

  title: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
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
              "Sunday"
            ]
          },
          available: { type: Boolean, required: true }
        }
      ],
      required: true
    }
  },

  phoneNumber: {
    type: String,
    required: true,
    match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"]
  }

}, { timestamps: true });

const Service = mongoose.model("Service", ServiceSchema);

export default Service;
