import express from "express";
import {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  getMyBookings,
  getBookingsForMyServices
} from "../Controller/BookingController.js";

import { verifyJWT } from "../Middlewares/authMiddleware.js";

const router = express.Router();

/**
 * =========================
 *  BOOKING ROUTES
 * =========================
 */

// ✅ Create booking
router.post("/", verifyJWT, createBooking);

// ✅ User-specific routes (MUST come before :id)
router.get("/my-bookings", verifyJWT, getMyBookings);
router.get("/my-service-bookings", verifyJWT, getBookingsForMyServices);

// ✅ Get all bookings
router.get("/", verifyJWT, getAllBookings);

// ✅ Get booking by ID
router.get("/:id", verifyJWT, getBookingById);

// ✅ Update booking
router.patch("/:id", verifyJWT, updateBooking);

// ✅ Delete booking
router.delete("/:id", verifyJWT, deleteBooking);

export default router;