import express from "express";
import {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking
} from "../Controller/BookingController.js";

import { verifyJWT } from "../Middlewares/authMiddleware.js";

const router = express.Router();

/**
 * =========================
 *  BOOKING ROUTES
 * =========================
 */

// Create a booking (User must be logged in)
router.post("/", verifyJWT, createBooking);

// Get all bookings (Admin / later restrict)
router.get("/", verifyJWT, getAllBookings);

// Get single booking by ID
router.get("/:id", verifyJWT, getBookingById);

// Update booking (status, date, notes)
router.put("/:id", verifyJWT, updateBooking);

// Delete / cancel booking
router.delete("/:id", verifyJWT, deleteBooking);

export default router;
