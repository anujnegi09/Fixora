import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    // User who booked the service
    bookedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Service being booked
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true
    },

    // Owner of the service (creator)
    serviceOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Date & time of booking
    bookingDate: {
      type: Date,
      required: true
    },

    // Booking status
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending"
    },
    // additional notes 
    notes: {
      type: String
    }
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;
