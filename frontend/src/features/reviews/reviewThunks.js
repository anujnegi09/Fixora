import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  showSuccessToast,
  showErrorToast,
} from "../../utils/customToast.jsx";

import {
  addReviewApi,
  getServiceReviewsApi,
  updateReviewApi,
  deleteReviewApi,
  getMyReviewsApi,
  getMyServiceReviewsApi,
} from "../../api/review.api.js";

// ==========================================
// Add Review
// ==========================================

export const addReview = createAsyncThunk(
  "reviews/addReview",
  async ({ bookingId, reviewData }, { rejectWithValue }) => {
    try {
      const response = await addReviewApi(bookingId, reviewData);

      showSuccessToast(response.message);

      return response;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to submit review";

      showErrorToast(message);

      return rejectWithValue(message);
    }
  },
);

// ==========================================
// Get Service Reviews
// ==========================================

export const getServiceReviews = createAsyncThunk(
  "reviews/getServiceReviews",
  async (serviceId, { rejectWithValue }) => {
    try {
      const response = await getServiceReviewsApi(serviceId);

      return response;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to fetch service reviews";

      showErrorToast(message);

      return rejectWithValue(message);
    }
  },
);

// ==========================================
// Update Review
// ==========================================

export const updateReview = createAsyncThunk(
  "reviews/updateReview",
  async ({ reviewId, reviewData }, { rejectWithValue }) => {
    try {
      const response = await updateReviewApi(
        reviewId,
        reviewData,
      );

      showSuccessToast(response.message);

      return response;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to update review";

      showErrorToast(message);

      return rejectWithValue(message);
    }
  },
);

// ==========================================
// Delete Review
// ==========================================

export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (reviewId, { rejectWithValue }) => {
    try {
      const response = await deleteReviewApi(reviewId);

      showSuccessToast(response.message);

      return {
        ...response,
        reviewId,
      };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to delete review";

      showErrorToast(message);

      return rejectWithValue(message);
    }
  },
);

// ==========================================
// Get My Reviews
// ==========================================

export const getMyReviews = createAsyncThunk(
  "reviews/getMyReviews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getMyReviewsApi();

      return response;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to fetch your reviews";

      showErrorToast(message);

      return rejectWithValue(message);
    }
  },
);

// ==========================================
// Get My Service Reviews
// ==========================================

export const getMyServiceReviews = createAsyncThunk(
  "reviews/getMyServiceReviews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getMyServiceReviewsApi();

      return response;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to fetch your service reviews";

      showErrorToast(message);

      return rejectWithValue(message);
    }
  },
);