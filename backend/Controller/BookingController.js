import mongoose from "mongoose";
import Booking from "../Models/Booking.js";
import Service from "../Models/Service.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import apiError from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";
import { getIO } from "../Config/Socket.js";
import Notification from "../Models/Notification.js";
import { sendNotification } from "../Services/NotificationService.js";
import redisClient from "../Config/Redis.js";

export const createBooking = asyncHandler(async (req, res) => {
  const { serviceId, bookingType, startTime, notes } = req.body;

  if (!serviceId || !bookingType) {
    throw new apiError(400, "Service ID and booking type are required");
  }
  if (!mongoose.Types.ObjectId.isValid(serviceId)) {
    throw new apiError(400, "Invalid service ID");
  }

  if (!["instant", "scheduled"].includes(bookingType)) {
    throw new apiError(400, "Invalid booking type");
  }
  const service = await Service.findOne({
    _id: serviceId,
    isVisible: true,
  }).populate("userId", "fullName avatar");
  if (!service) {
    throw new apiError(404, "Service not found");
  }

  // PREVENT BOOKING OWN SERVICE
  if (service.userId.toString() === req.user._id.toString()) {
    throw new apiError(400, "You cannot book your own service");
  }

  if (!service.bookingOptions.includes(bookingType)) {
    throw new apiError(
      400,
      `This service does not support ${bookingType} booking`,
    );
  }
  let bookingStartTime;
  if (bookingType === "instant") {
    bookingStartTime = new Date();
  } else {
    if (!startTime) {
      throw new apiError(400, "Start time is required for scheduled booking");
    }
    bookingStartTime = new Date(startTime);
    if (isNaN(bookingStartTime.getTime())) {
      throw new apiError(400, "Invalid start time");
    }
    if (bookingStartTime <= new Date()) {
      throw new apiError(400, "Scheduled booking must be in the future");
    }
  }
  const booking = await Booking.create({
    bookedBy: req.user._id,
    serviceId: service._id,
    serviceOwner: service.userId,
    bookingType,
    startTime: bookingStartTime,
    price: service.price,
    notes,
    status: "pending",
  });

  let notificationMessage;
  if (bookingType === "instant") {
    notificationMessage = `${req.user.fullName} requested your "${service.title}" service instantly.`;
  } else {
    const formattedDate = bookingStartTime.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const formattedTime = bookingStartTime.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    notificationMessage = `${req.user.fullName} scheduled your "${service.title}" service for ${formattedDate} at ${formattedTime}.`;
  }
  await sendNotification({
    userId: service.userId,
    type: "booking_request",
    message: notificationMessage,
    bookingId: booking._id,
    serviceId: service._id,
    redirectTo: `/bookings/${booking._id}`,
  });

  const io = getIO();
  io.to(booking.serviceOwner.toString()).emit("newBooking", {
    message: "📢 New booking request!",
    booking,
  });
  return res
    .status(201)
    .json(new apiResponse(201, booking, "Booking created successfully"));
});
// export const createBooking = asyncHandler(async (req, res) => {
//   const { serviceId, bookingType, startTime, notes } = req.body;

//   if (!serviceId || !bookingType) {
//     throw new apiError(400, "Service ID and booking date are required");
//   }

//   // ✅ Validate ObjectId
//   if (!mongoose.Types.ObjectId.isValid(serviceId)) {
//     throw new apiError(400, "Invalid service ID");
//   }

//   const service = await Service.findById(serviceId);
//   if (!service) {
//     throw new apiError(404, "Service not found");
//   }

//   // 🚨 Prevent booking own service
//   if (service.userId.toString() === req.user._id.toString()) {
//     throw new apiError(400, "You cannot book your own service");
//   }

//   // 🚨 Prevent past date booking
//   if (new Date(bookingDate) < new Date()) {
//     throw new apiError(400, "Booking date cannot be in the past");
//   }

//   const booking = await Booking.create({
//     bookedBy: req.user._id,
//     serviceId: service._id,
//     serviceOwner: service.userId,
//     bookingDate,
//     notes,
//   });

//   await sendNotification({
//     userId: service.userId,
//     type: "booking_request",
//     message: `${req.user.fullName} booked your "${service.title}" service.`,
//     bookingId: booking._id,
//     serviceId: service._id,
//     redirectTo: `/bookings/${booking._id}`,
//   });

//   const io = getIO();
//   io.to(booking.serviceOwner.toString()).emit("newBooking", {
//     message: "📢 New booking request!",
//     booking,
//   });

//   res
//     .status(201)
//     .json(new apiResponse(201, booking, "Booking created successfully"));
// });
/**
 * =====================================================
 * GET BOOKING BY USER
 * =====================================================
 */
export const getBookingById = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    throw new apiError(400, "Invalid booking ID");
  }
  const booking = await Booking.findById(bookingId)
    .populate("bookedBy", "fullName email profilePhoto")
    .populate("serviceOwner", "fullName email profilePhoto")
    .populate("serviceId", "title description location phoneNumber")
    .lean();
  if (!booking) {
    throw new apiError(404, "Booking not found");
  }
  // Only customer or provider can view
  const isCustomer =
    booking.bookedBy._id.toString() === req.user._id.toString();
  const isProvider =
    booking.serviceOwner._id.toString() === req.user._id.toString();

  if (!isCustomer && !isProvider) {
    throw new apiError(403, "You are not authorized to view this booking.");
  }

  return res
    .status(200)
    .json(new apiResponse(200, booking, "Booking fetched successfully"));
});

/**
 * =====================================================
 * DELETE BOOKING
 * =====================================================
 */
export const deleteBooking = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;

  // ✅ ObjectId validation
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    throw new apiError(400, "Invalid booking ID");
  }

  const booking = await Booking.findById(bookingId).populate(
    "serviceId",
    "title",
  );
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

  await sendNotification({
    userId: booking.serviceOwner,
    type: "booking_deleted",
    message: `${req.user.fullName} delete the booking details for "${booking.serviceId.title}".`,
    bookingId: booking._id,
    serviceId: booking.serviceId,
    redirectTo: `/bookings/${booking._id}`,
  });

  res
    .status(200)
    .json(new apiResponse(200, null, "Booking deleted successfully"));
});

/**
 * =====================================================
 * UPDATE BOOKING DETAILS (ONLY BY THE USER WHO BOOKED THE SERVICE)
 * =====================================================
 */
export const updateBookingDetails = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  const { startTime, notes } = req.body;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    throw new apiError(400, "Invalid booking ID");
  }

  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new apiError(404, "Booking not found");
  }

  // Only the customer can update
  if (booking.bookedBy.toString() !== req.user._id.toString()) {
    throw new apiError(403, "Only the customer can update booking details.");
  }

  // Don't allow editing after provider has responded
  if (booking.status !== "pending") {
    throw new apiError(400, "Booking can only be updated while it is pending.");
  }

  // Validate booking date
  if (startTime) {
    const selectedStartTime = new Date(startTime);

    if (isNaN(selectedStartTime.getTime())) {
      throw new apiError(400, "Invalid start time.");
    }

    if (selectedStartTime <= new Date()) {
      throw new apiError(400, "Booking time must be in the future.");
    }

    // Only scheduled bookings should change their time
    if (booking.bookingType !== "scheduled") {
      throw new apiError(
        400,
        "Instant bookings cannot have their time changed.",
      );
    }

    booking.startTime = selectedStartTime;
  }

  if (notes !== undefined) {
    booking.notes = notes.trim();
  }

  await booking.save();

  const service = await Service.findById(booking.serviceId);

  await sendNotification({
    userId: booking.serviceOwner,
    type: "booking_updated",
    message: `${req.user.fullName} updated the booking details for "${service.title}".`,
    bookingId: booking._id,
    serviceId: booking.serviceId,
    redirectTo: `/bookings/${booking._id}`,
  });

  return res
    .status(200)
    .json(new apiResponse(200, booking, "Booking updated successfully."));
});
/**
 * =====================================================
 * GET MY BOOKINGS
 * =====================================================
 */
export const getMyBookings = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const cursor = req.query.cursor;

  const query = {
    bookedBy: req.user._id,
  };

  if (cursor) {
    query._id = { $lt: cursor };
  }

  const bookings = await Booking.find(query)
    .populate("serviceId", "title description location phoneNumber")
    .populate("serviceOwner", "fullName email avatar")
    .sort({ _id: -1 })
    .limit(limit + 1)
    .lean();

  let nextCursor = null;
  let hasMore = false;

  if (bookings.length > limit) {
    hasMore = true;
    const lastBooking = bookings.pop();
    nextCursor = lastBooking._id;
  }

  return res.status(200).json(
    new apiResponse(
      200,
      {
        bookings,
        nextCursor,
        hasMore,
      },
      "User bookings fetched successfully",
    ),
  );
});
/**
 * =====================================================
 * GET BOOKING FOR MY SERVICES
 * =====================================================
 */
export const getBookingsForMyServices = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const cursor = req.query.cursor;

  const query = {
    serviceOwner: req.user._id,
  };

  if (cursor) {
    query._id = { $lt: cursor };
  }

  const bookings = await Booking.find(query)
    .populate("bookedBy", "fullName email avatar")
    .populate("serviceId", "title description location phoneNumber")
    .sort({ _id: -1 })
    .limit(limit + 1)
    .lean();

  let nextCursor = null;
  let hasMore = false;

  if (bookings.length > limit) {
    hasMore = true;
    const lastBooking = bookings.pop();
    nextCursor = lastBooking._id;
  }

  return res.status(200).json(
    new apiResponse(
      200,
      {
        bookings,
        nextCursor,
        hasMore,
      },
      "Bookings for your services fetched successfully",
    ),
  );
});

/**
 * =====================================================
 * UPDATE BOOKING STATUS (ONLY BY THE SERVICE OWNER)
 * =====================================================
 */
export const updateBookingStatus = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  const { status } = req.body;
  const userId = req.user._id;

  // Provider can only confirm, reject or cancel
  const allowedStatuses = ["confirmed", "rejected", "cancelled"];

  if (!allowedStatuses.includes(status)) {
    throw new apiError(400, "Invalid status value");
  }

  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new apiError(404, "Booking not found");
  }

  // // Only service provider
  // if (booking.serviceOwner.toString() !== userId.toString()) {
  //   throw new apiError(403, "Not authorized");
  // }
  const isServiceOwner = booking.serviceOwner.toString() === userId.toString();

  const isCustomer = booking.bookedBy.toString() === userId.toString();

  // ==========================================
  // CONFIRM / REJECT
  // Only service provider can do this
  // ==========================================

  if (status === "confirmed" || status === "rejected") {
    if (!isServiceOwner) {
      throw new apiError(
        403,
        "Only the service provider can confirm or reject the booking",
      );
    }

    if (booking.status !== "pending") {
      throw new apiError(
        400,
        "Only pending bookings can be confirmed or rejected",
      );
    }
  }

  // ==========================================
  // CANCEL
  // Only customer can do this
  // ==========================================

  if (status === "cancelled") {
    if (!isCustomer) {
      throw new apiError(403, "Only the customer can cancel this booking");
    }

    if (!["pending", "confirmed"].includes(booking.status)) {
      throw new apiError(400, "This booking cannot be cancelled");
    }
  }

  // Finalized bookings cannot be changed
  if (["completed", "cancelled", "rejected"].includes(booking.status)) {
    throw new apiError(400, "Booking is already finalized.");
  }

  // Can't confirm/reject/cancel twice
  if (booking.status === status) {
    throw new apiError(400, `Booking is already ${status}.`);
  }

  booking.status = status;

  await booking.save();
  const updatedBooking = await Booking.findById(bookingId)
    .populate("serviceId")
    .populate("serviceOwner", "fullName userName avatar")
    .populate("bookedBy", "fullName userName avatar");

  const io = getIO();

  io.to(booking.bookedBy.toString()).emit("bookingStatusChanged", booking);

  let notificationType;
  let notificationMessage;

  switch (status) {
    case "confirmed":
      notificationType = "booking_confirmed";
      notificationMessage = "✅ Your booking has been confirmed.";
      break;
    case "rejected":
      notificationType = "booking_rejected";
      notificationMessage = "❌ Your booking has been rejected.";
      break;
    case "cancelled":
      notificationType = "booking_cancelled";
      notificationMessage = "🚫 Your booking has been cancelled.";
      break;
    default:
      notificationType = "system";
      notificationMessage = `Booking status updated to ${status}.`;
  }

  await sendNotification({
    userId: booking.bookedBy,
    type: notificationType,
    message: notificationMessage,
    bookingId: booking._id,
    serviceId: booking.serviceId,
    redirectTo: `/bookings/${booking._id}`,
  });

  return res
    .status(200)
    .json(
      new apiResponse(200, updatedBooking, `Booking ${status} successfully`),
    );
});

/**
 * =====================================================
 * REQUEST COMPLETION (BY THE SERVICE PROVIDER AND NOTIFICATION GOES TO THE USER FOR OTP)
 * =====================================================
 */
export const requestCompletion = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;

  const providerId = req.user._id;

  const booking = await Booking.findById(bookingId).populate(
  "serviceId",
  "title"
);

  if (!booking) {
    throw new apiError(404, "Booking not found");
  }

  // Only service provider

  if (booking.serviceOwner.toString() !== providerId.toString()) {
    throw new apiError(403, "Not authorized");
  }

  if (booking.status !== "confirmed") {
    throw new apiError(400, "Booking is not in confirmed state");
  }

  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Store OTP in Redis for 15 minutes
  await redisClient.set(`booking:${booking._id}:otp`, otp, {
    EX: 15 * 60, // 15 minutes
  });

  booking.status = "completion_requested";

  await booking.save();

  // Notification
  await sendNotification({
    userId: booking.bookedBy,
    type: "otp_generated",
    message: `The service provider is asking for an OTP to complete your "${booking.serviceId.title}" service. Your OTP is ${otp}.`,
    bookingId: booking._id,
    serviceId: booking.serviceId,
    redirectTo: `/notifications`,
  });
  return res
    .status(200)
    .json(new apiResponse(200, {}, "Completion OTP generated successfully"));
});
/**
 * =====================================================
 * GET COMPLETION OTP
 * =====================================================
 */
export const getCompletionOTP = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;

  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new apiError(404, "Booking not found");
  }

  if (booking.bookedBy.toString() !== req.user._id.toString()) {
    throw new apiError(403, "Not authorized");
  }

  if (booking.status !== "completion_requested") {
    throw new apiError(400, "OTP not generated yet");
  }
  const otp = await redisClient.get(`booking:${booking._id}:otp`);
  if (!otp) {
    throw new apiError(400, "OTP expired or not found");
  }

  return res.status(200).json(
    new apiResponse(
      200,
      {
        otp,
      },

      "OTP fetched successfully",
    ),
  );
});
/**
 * =====================================================
 * PROVIDER ENTER THE OTP AND SERVER VERIFY IT
 * =====================================================
 */
export const verifyCompletionOTP = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;

  const { otp } = req.body;

  if (!otp) {
    throw new apiError(400, "OTP is required");
  }

  if (!/^\d{6}$/.test(otp)) {
    throw new apiError(400, "OTP must be a 6-digit number");
  }

  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new apiError(404, "Booking not found");
  }

  // Only provider

  if (booking.serviceOwner.toString() !== req.user._id.toString()) {
    throw new apiError(403, "Not authorized");
  }

  if (booking.status !== "completion_requested") {
    throw new apiError(400, "Completion not requested");
  }
  const savedOTP = await redisClient.get(`booking:${booking._id}:otp`);

  if (!savedOTP) {
    throw new apiError(400, "OTP expired or not found");
  }

  if (savedOTP !== otp) {
    throw new apiError(400, "Invalid OTP");
  }

  booking.status = "completed";

  booking.otpVerified = true;

  await redisClient.del(`booking:${booking._id}:otp`);

  await booking.save();

  await booking.populate("serviceId", "title");

  await sendNotification({
    userId: booking.bookedBy,
    type: "review_reminder",
    message: `Please rate your experience with "${booking.serviceId.title}".`,
    bookingId: booking._id,
    serviceId: booking.serviceId,
    redirectTo: `/bookings/${booking._id}`,
  });

  return res.status(200).json(
    new apiResponse(
      200,

      booking,

      "Booking completed successfully",
    ),
  );
});
