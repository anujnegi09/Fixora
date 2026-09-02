// ==========================================
// Reviews
// ==========================================

export const selectReviews = (state) =>
  state.review.reviews;

export const selectMyReviews = (state) =>
  state.review.myReviews;

export const selectMyServiceReviews = (state) =>
  state.review.myServiceReviews;

// ==========================================
// Loading
// ==========================================

export const selectReviewLoading = (state) =>
  state.review.loading;

export const selectAddReviewLoading = (state) =>
  state.review.addLoading;

export const selectUpdateReviewLoading = (state) =>
  state.review.updateLoading;

export const selectDeleteReviewLoading = (state) =>
  state.review.deleteLoading;

export const selectMyReviewsLoading = (state) =>
  state.review.myReviewsLoading;

export const selectMyServiceReviewsLoading = (state) =>
  state.review.myServiceReviewsLoading;

// ==========================================
// Error
// ==========================================

export const selectReviewError = (state) =>
  state.review.error;