import express from "express";
import {
  createBooking,
  getBookingById,
  updateBookingDetails,
  deleteBooking,
  getMyBookings,
  getBookingsForMyServices,
  updateBookingStatus,
  requestCompletion,
  getCompletionOTP,
  verifyCompletionOTP
} from "../Controller/BookingController.js";

import { verifyJWT } from "../Middleware/authMiddleware.js";

const router = express.Router();

/**
 * =========================
 *  BOOKING ROUTES
 * =========================
 */

// ✅ Create booking
router.post("/create", verifyJWT, createBooking);

// ✅ User-specific routes (MUST come before :id)
router.get("/my-bookings", verifyJWT, getMyBookings);
router.get("/my-service-bookings", verifyJWT, getBookingsForMyServices);

// ✅ Get booking by ID
router.get("/:id", verifyJWT, getBookingById);

// ✅ Update booking
router.patch("/:id", verifyJWT, updateBookingDetails);

// ✅ Delete booking
router.delete("/delete/:id", verifyJWT, deleteBooking);

router.patch("/:id/update-booking-status", verifyJWT, updateBookingStatus);

router.patch("/:bookingId/request-completion",verifyJWT,requestCompletion);

router.get("/:bookingId/completion-otp",  verifyJWT,getCompletionOTP);

router.patch( "/:bookingId/verify-completion",verifyJWT,verifyCompletionOTP);

export default router;