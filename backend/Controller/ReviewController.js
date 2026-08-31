import mongoose from "mongoose";
import Review from "../Models/Review.js";
import Booking from "../Models/Booking.js";
import Service from "../Models/Service.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import apiError from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";

const updateServiceRating = async (serviceId) => {
  const result = await Review.aggregate([
    {
      $match: {
        serviceId: new mongoose.Types.ObjectId(serviceId),
      },
    },
    {
      $group: {
        _id: "$serviceId",
        averageRating: { $avg: "$rating" },
        totalReviews: { $sum: 1 },
      },
    },
  ]);

  if (result.length === 0) {
    await Service.findByIdAndUpdate(serviceId, {
      rating: 0,
      totalReviews: 0,
    });
  } else {
    await Service.findByIdAndUpdate(serviceId, {
      rating: Number(result[0].averageRating.toFixed(1)),
      totalReviews: result[0].totalReviews,
    });
  }
};

export const addReview = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;

  const { rating, review } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    throw new apiError(400, "Rating must be between 1 and 5");
  }

  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new apiError(404, "Booking not found");
  }

  if (booking.bookedBy.toString() !== req.user._id.toString()) {
    throw new apiError(403, "Not authorized");
  }

  if (["cancelled", "rejected"].includes(booking.status)) {
    throw new apiError(400, "You cannot review this booking");
  }

  const alreadyReviewed = await Review.findOne({
    bookingId,
  });

  if (alreadyReviewed) {
    throw new apiError(400, "Review already submitted");
  }

  const newReview = await Review.create({
    bookingId,
    serviceId: booking.serviceId,
    reviewedBy: req.user._id,
    serviceOwner: booking.serviceOwner,
    rating,
    review,
  });

  await updateServiceRating(booking.serviceId);

  return res
    .status(201)
    .json(new apiResponse(201, newReview, "Review submitted successfully"));
});

export const getServiceReviews = asyncHandler(async (req, res) => {
  const { serviceId } = req.params;

  const reviews = await Review.find({
    serviceId,
  })
    .populate("reviewer", "fullName profilePhoto")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new apiResponse(200, reviews, "Reviews fetched successfully"));
});

export const updateReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;

  const { rating, review } = req.body;

  const existingReview = await Review.findById(reviewId);

  if (!existingReview) {
    throw new apiError(404, "Review not found");
  }

  if (existingReview.reviewer.toString() !== req.user._id.toString()) {
    throw new apiError(403, "Not authorized");
  }

  if (rating) {
    if (rating < 1 || rating > 5) {
      throw new apiError(400, "Rating must be between 1 and 5");
    }

    existingReview.rating = rating;
  }

  if (review) {
    existingReview.review = review;
  }

  await existingReview.save();

  await updateServiceRating(existingReview.serviceId);

  return res
    .status(200)
    .json(new apiResponse(200, existingReview, "Review updated successfully"));
});

export const deleteReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;

  const review = await Review.findById(reviewId);

  if (!review) {
    throw new apiError(404, "Review not found");
  }

  if (review.reviewer.toString() !== req.user._id.toString()) {
    throw new apiError(403, "Not authorized");
  }

  const serviceId = review.serviceId;

  await review.deleteOne();

  await updateServiceRating(serviceId);

  return res
    .status(200)
    .json(new apiResponse(200, {}, "Review deleted successfully"));
});

export const getMyReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({
    reviewedBy : req.user._id,
  })
    .populate("serviceId", "title")
    .populate("reviewedBy", "fullName avatar")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new apiResponse(200, reviews, "Your reviews fetched successfully"));
});

export const getMyServiceReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({
    serviceOwner: req.user._id,
  })
    .populate("reviewer", "fullName avatar")
    .populate("serviceId", "title")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(
      new apiResponse(200, reviews, "Service reviews fetched successfully"),
    );
});
