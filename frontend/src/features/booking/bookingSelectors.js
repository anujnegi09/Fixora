// bookingSelectors.js

// ===============================
// BOOKING LISTS
// ===============================

export const selectMyBookings = (state) =>
  state.booking.myBookings;

export const selectServiceBookings = (state) =>
  state.booking.serviceBookings;


// ===============================
// CURRENT BOOKING
// ===============================

export const selectBooking = (state) =>
  state.booking.booking;


// ===============================
// PAGINATION
// ===============================

export const selectMyBookingsNextCursor = (state) =>
  state.booking.myBookingsNextCursor;

export const selectMyBookingsHasMore = (state) =>
  state.booking.myBookingsHasMore;

export const selectServiceBookingsNextCursor = (state) =>
  state.booking.serviceBookingsNextCursor;

export const selectServiceBookingsHasMore = (state) =>
  state.booking.serviceBookingsHasMore;


// ===============================
// GENERAL LOADING
// ===============================

export const selectBookingLoading = (state) =>
  state.booking.loading;


// ===============================
// OPERATION LOADING
// ===============================

export const selectCreateBookingLoading = (state) =>
  state.booking.createLoading;

export const selectUpdateBookingLoading = (state) =>
  state.booking.updateLoading;

export const selectDeleteBookingLoading = (state) =>
  state.booking.deleteLoading;

export const selectBookingStatusLoading = (state) =>
  state.booking.statusLoading;

export const selectCompletionLoading = (state) =>
  state.booking.completionLoading;

export const selectOtpLoading = (state) =>
  state.booking.otpLoading;

export const selectVerifyOtpLoading = (state) =>
  state.booking.verifyOtpLoading;


// ===============================
// ERROR
// ===============================

export const selectBookingError = (state) =>
  state.booking.error;


// ===============================
// COMPLETION OTP
// ===============================

export const selectCompletionOTP = (state) =>
  state.booking.booking?.otp;