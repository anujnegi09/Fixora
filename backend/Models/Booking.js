import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    // User who booked the service
    bookedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index : true // for faster lookups when user wants to see their bookings
    },

    // Service being booked
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },

    // Owner of the service (creator)
    serviceOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index : true // for faster lookups when service owner wants to see bookings for their services
    },

    // Date & time of booking
    bookingDate: {
      type: Date,
      required: true
    },
    price: {
      type: Number
    },
    // Booking status
    status: {
      type: String,
      enum: ["pending",
          "confirmed",
          "completed",
          "completion_requested",
          "cancelled",   // user cancelled
          "rejected"     // owner rejected
        ],
      default: "pending"
    },
    // additional notes 
    notes: {
      type: String,
      trim : true
    },
    isRead: {
      type: Boolean,
      default: false
    },
    completionOTP: {
      type: String,
      default: null,
    },

    otpExpiresAt: {
      type: Date,
      default: null,
    },

    otpVerified: {
      type: Boolean,
      default: false,
    },    
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;




// import mongoose from "mongoose";
 
// const BookingSchema = new mongoose.Schema(
//   {
//     // User who booked the service
//     bookedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//       index: true,
//     },
 
//     // Service being booked
//     serviceId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Service",
//       required: true,
//       index: true, // NEW: you'll also query "all bookings for this service"
//       // (e.g. to check which time slots are already taken)
//     },
 
//     // Owner of the service (creator)
//     serviceOwner: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//       index: true, // for faster lookups when service owner wants to see bookings for their services
//     },

//     // Date & time of booking
//     bookingDate: {
//       type: Date,
//       required: true,
//     },
//     price: {
//       type: Number,
//     },
//     // Booking status
//     status: {
//       type: String,
//       enum: [
//         "pending",
//         "confirmed",
//         "completed",
//         "cancelled", // user cancelled
//         "rejected", // owner rejected
//       ],
//       default: "pending",
//     },
//     // additional notes
//     notes: {
//       type: String,
//       trim: true,
//     },
//     isRead: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true }
// );
 
// // NOTE (not applied automatically, needs your business decision):
// // If two people should NEVER be able to book the exact same service
// // at the exact same date/time, you can enforce that at the database
// // level with a compound unique index like this:
// //
// // BookingSchema.index({ serviceId: 1, bookingDate: 1 }, { unique: true });
// //
// // Only add this if double-booking the same slot should be impossible.
// // If bookingDate is just a rough day (not an exact time slot), skip this.
 
// const Booking = mongoose.model("Booking", BookingSchema);
 
// export default Booking;