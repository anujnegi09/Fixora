import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    // User who booked the service
    bookedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // for faster lookups when user wants to see their bookings
    },

    // Service being booked
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
      index: true,
    },

    // Owner of the service (creator)
    serviceOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // for faster lookups when service owner wants to see bookings for their services
    },
    bookingType: {
      type: String,
      enum: ["instant", "scheduled"],
      required: true,
      default: "scheduled",
    },
    // Date & time of booking
    startTime: {
      type: Date,
      required: true,
      index: true,
    },

    price: {
      type: Number,
    },
    // Booking status
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "completed",
        "completion_requested",
        "cancelled", // user cancelled
        "rejected", // owner rejected
      ],
      default: "pending",
    },
    // additional notes
    notes: {
      type: String,
      trim: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    otpVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;
