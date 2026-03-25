import mongoose from "mongoose";
import Booking from "../Models/Booking.js";
import Service from "../Models/Service.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import apiError from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";

/**
 * @desc Create a booking
 */
export const createBooking = asyncHandler(async (req, res) => {
  const { serviceId, bookingDate, notes } = req.body;

  if (!serviceId || !bookingDate) {
    throw new apiError(400, "Service ID and booking date are required");
  }

  // ✅ Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(serviceId)) {
    throw new apiError(400, "Invalid service ID");
  }

  const service = await Service.findById(serviceId);
  if (!service) {
    throw new apiError(404, "Service not found");
  }

  // 🚨 Prevent booking own service
  if (service.userId.toString() === req.user._id.toString()) {
    throw new apiError(400, "You cannot book your own service");
  }

  // 🚨 Prevent past date booking
  if (new Date(bookingDate) < new Date()) {
    throw new apiError(400, "Booking date cannot be in the past");
  }

  const booking = await Booking.create({
    bookedBy: req.user._id,
    serviceId: service._id,
    serviceOwner: service.userId,
    bookingDate,
    notes
  });

  res.status(201).json(
    new apiResponse(201, booking, "Booking created successfully")
  );
});

/**
 * @desc Get all bookings (pagination)
 */
export const getAllBookings = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const skip = (page - 1) * limit;

  const bookings = await Booking.find()
    .populate("bookedBy", "fullName email")
    .populate("serviceOwner", "fullName email")
    .populate("serviceId", "title description location phoneNumber")
    .skip(skip)
    .limit(parseInt(limit))
    .lean();

  const total = await Booking.countDocuments();

  res.status(200).json(
    new apiResponse(200, {
      bookings,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit)
    }, "Bookings fetched successfully")
  );
});

/**
 * @desc Get a single booking by ID
 */
export const getBookingById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // ✅ ObjectId validation
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new apiError(400, "Invalid booking ID");
  }

  const booking = await Booking.findById(id)
    .populate("bookedBy", "fullName email")
    .populate("serviceOwner", "fullName email")
    .populate("serviceId", "title description location phoneNumber")
    .lean();

  if (!booking) {
    throw new apiError(404, "Booking not found");
  }

  res.status(200).json(
    new apiResponse(200, booking, "Booking fetched successfully")
  );
});

/**
 * @desc Update a booking
 */
export const updateBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, notes, bookingDate } = req.body;

  // ✅ ObjectId validation
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new apiError(400, "Invalid booking ID");
  }

  const booking = await Booking.findById(id);
  if (!booking) {
    throw new apiError(404, "Booking not found");
  }

  // ✅ Authorization
  if (
    booking.bookedBy.toString() !== req.user._id.toString() &&
    booking.serviceOwner.toString() !== req.user._id.toString()
  ) {
    throw new apiError(403, "Not authorized");
  }

  // 🚨 Prevent past date update
  if (bookingDate && new Date(bookingDate) < new Date()) {
    throw new apiError(400, "Booking date cannot be in the past");
  }

  // ✅ Clean update
  Object.assign(booking, {
    ...(status && { status }),
    ...(notes && { notes }),
    ...(bookingDate && { bookingDate }),
  });

  const updatedBooking = await booking.save();

  res.status(200).json(
    new apiResponse(200, updatedBooking, "Booking updated successfully")
  );
});

/**
 * @desc Delete a booking
 */
export const deleteBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // ✅ ObjectId validation
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new apiError(400, "Invalid booking ID");
  }

  const booking = await Booking.findById(id);
  if (!booking) {
    throw new apiError(404, "Booking not found");
  }

  // ✅ Authorization
  if (
    booking.bookedBy.toString() !== req.user._id.toString() &&
    booking.serviceOwner.toString() !== req.user._id.toString()
  ) {
    throw new apiError(403, "Not authorized");
  }

  await booking.deleteOne();

  res.status(200).json(
    new apiResponse(200, null, "Booking deleted successfully")
  );
});

export const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ bookedBy: req.user._id })
    .populate("serviceId", "title description location phoneNumber")
    .populate("serviceOwner", "fullName email")
    .lean();

  res.status(200).json(
    new apiResponse(200, bookings, "User bookings fetched successfully")
  );
});


export const getBookingsForMyServices = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ serviceOwner: req.user._id })
    .populate("bookedBy", "fullName email")
    .populate("serviceId", "title description location phoneNumber")
    .lean();

  res.status(200).json(
    new apiResponse(200, bookings, "Bookings for your services fetched successfully")
  );
});