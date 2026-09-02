import { createSlice } from "@reduxjs/toolkit";

import {
  addReview,
  getServiceReviews,
  updateReview,
  deleteReview,
  getMyReviews,
  getMyServiceReviews,
} from "./reviewThunks.js";

const initialState = {
  // ==========================================
  // Reviews
  // ==========================================

  reviews: [],

  // Reviews written by logged-in user
  myReviews: [],

  // Reviews received on logged-in user's services
  myServiceReviews: [],

  // ==========================================
  // Loading
  // ==========================================

  loading: false,

  addLoading: false,
  updateLoading: false,
  deleteLoading: false,

  myReviewsLoading: false,
  myServiceReviewsLoading: false,

  // ==========================================
  // Error
  // ==========================================

  error: null,
};

const reviewSlice = createSlice({
  name: "review",

  initialState,

  reducers: {
    clearReviewError: (state) => {
      state.error = null;
    },

    clearReviews: (state) => {
      state.reviews = [];
    },

    clearMyReviews: (state) => {
      state.myReviews = [];
    },

    clearMyServiceReviews: (state) => {
      state.myServiceReviews = [];
    },
  },

  extraReducers: (builder) => {
    builder

      // ==========================================
      // Add Review
      // ==========================================

      .addCase(addReview.pending, (state) => {
        state.addLoading = true;
        state.error = null;
      })

      .addCase(addReview.fulfilled, (state, action) => {
        state.addLoading = false;

        if (action.payload.data) {
          state.myReviews.unshift(action.payload.data);
          state.reviews.unshift(action.payload.data);
        }
      })

      .addCase(addReview.rejected, (state, action) => {
        state.addLoading = false;
        state.error = action.payload;
      })

      // ==========================================
      // Get Service Reviews
      // ==========================================

      .addCase(getServiceReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getServiceReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.data || [];
      })

      .addCase(getServiceReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================================
      // Get My Reviews
      // ==========================================

      .addCase(getMyReviews.pending, (state) => {
        state.myReviewsLoading = true;
        state.error = null;
      })

      .addCase(getMyReviews.fulfilled, (state, action) => {
        state.myReviewsLoading = false;
        state.myReviews = action.payload.data || [];
      })

      .addCase(getMyReviews.rejected, (state, action) => {
        state.myReviewsLoading = false;
        state.error = action.payload;
      })

      // ==========================================
      // Get My Service Reviews
      // ==========================================

      .addCase(getMyServiceReviews.pending, (state) => {
        state.myServiceReviewsLoading = true;
        state.error = null;
      })

      .addCase(getMyServiceReviews.fulfilled, (state, action) => {
        state.myServiceReviewsLoading = false;
        state.myServiceReviews = action.payload.data || [];
      })

      .addCase(getMyServiceReviews.rejected, (state, action) => {
        state.myServiceReviewsLoading = false;
        state.error = action.payload;
      })

      // ==========================================
      // Update Review
      // ==========================================

      .addCase(updateReview.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })

      .addCase(updateReview.fulfilled, (state, action) => {
        state.updateLoading = false;

        const updatedReview = action.payload.data;

        if (!updatedReview) return;

        // Update in all service reviews
        state.reviews = state.reviews.map((review) =>
          review._id === updatedReview._id
            ? updatedReview
            : review
        );

        // Update in user's reviews
        state.myReviews = state.myReviews.map((review) =>
          review._id === updatedReview._id
            ? updatedReview
            : review
        );

        // Update in provider's received reviews
        state.myServiceReviews = state.myServiceReviews.map(
          (review) =>
            review._id === updatedReview._id
              ? updatedReview
              : review
        );
      })

      .addCase(updateReview.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      })

      // ==========================================
      // Delete Review
      // ==========================================

      .addCase(deleteReview.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })

      .addCase(deleteReview.fulfilled, (state, action) => {
        state.deleteLoading = false;

        const deletedReviewId = action.payload.reviewId;

        state.reviews = state.reviews.filter(
          (review) => review._id !== deletedReviewId
        );

        state.myReviews = state.myReviews.filter(
          (review) => review._id !== deletedReviewId
        );

        state.myServiceReviews = state.myServiceReviews.filter(
          (review) => review._id !== deletedReviewId
        );
      })

      .addCase(deleteReview.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearReviewError,
  clearReviews,
  clearMyReviews,
  clearMyServiceReviews,
} = reviewSlice.actions;

export default reviewSlice.reducer;