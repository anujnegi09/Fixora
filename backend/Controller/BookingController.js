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

  // Fetch the service to get owner
  const service = await Service.findById(serviceId);
  if (!service) {
    throw new apiError(404, "Service not found");
  }

  const booking = await Booking.create({
    bookedBy: req.user._id,        // user who booked
    serviceId: service._id,        // service being booked
    serviceOwner: service.userId,  // owner of the service
    bookingDate,
    notes
  });

  res.status(201).json(new apiResponse(201, "Booking created successfully", booking));
});

/**
 * @desc Get all bookings
 */
export const getAllBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find()
    .populate("bookedBy", "fullName email")
    .populate("serviceOwner", "fullName email")
    .populate("serviceId", "title description location phoneNumber");

  res.status(200).json(new apiResponse(200, "Bookings fetched successfully", bookings));
});

/**
 * @desc Get a single booking by ID
 */
export const getBookingById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const booking = await Booking.findById(id)
    .populate("bookedBy", "fullName email")
    .populate("serviceOwner", "fullName email")
    .populate("serviceId", "title description location phoneNumber");

  if (!booking) {
    throw new apiError(404, "Booking not found");
  }

  res.status(200).json(new apiResponse(200, "Booking fetched successfully", booking));
});

/**
 * @desc Update a booking (status, notes)
 */
export const updateBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, notes, bookingDate } = req.body;

  const booking = await Booking.findById(id);
  if (!booking) {
    throw new apiError(404, "Booking not found");
  }

  // Optional: only allow the user who booked or the service owner to update
  if (
    booking.bookedBy.toString() !== req.user._id.toString() &&
    booking.serviceOwner.toString() !== req.user._id.toString()
  ) {
    throw new apiError(403, "You are not authorized to update this booking");
  }

  booking.status = status || booking.status;
  booking.notes = notes || booking.notes;
  booking.bookingDate = bookingDate || booking.bookingDate;

  const updatedBooking = await booking.save();

  res.status(200).json(new apiResponse(200, "Booking updated successfully", updatedBooking));
});

/**
 * @desc Delete a booking
 */
export const deleteBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const booking = await Booking.findById(id);
  if (!booking) {
    throw new apiError(404, "Booking not found");
  }

  // Optional: only allow the user who booked or the service owner to delete
  if (
    booking.bookedBy.toString() !== req.user._id.toString() &&
    booking.serviceOwner.toString() !== req.user._id.toString()
  ) {
    throw new apiError(403, "You are not authorized to delete this booking");
  }

  await booking.deleteOne();

  res.status(200).json(new apiResponse(200, "Booking deleted successfully"));
});
