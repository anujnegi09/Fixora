import { createSlice } from "@reduxjs/toolkit";

import {
  createBooking,
  getMyBookings,
  getBookingsForMyServices,
  getBookingById,
  updateBookingDetails,
  deleteBooking,
  updateBookingStatus,
  requestCompletion,
  getCompletionOTP,
  verifyCompletionOTP,
} from "./bookingThunks.js";

const initialState = {
  // Lists
  myBookings: [],
  serviceBookings: [],

  // Single booking
  booking: null,

  // Pagination
  myBookingsNextCursor: null,
  myBookingsHasMore: false,

  serviceBookingsNextCursor: null,
  serviceBookingsHasMore: false,

  // General loading
  loading: false,

  // Operation-specific loading
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
  statusLoading: false,
  completionLoading: false,
  otpLoading: false,
  verifyOtpLoading: false,

  // Error
  error: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,

  reducers: {
    clearBookingError: (state) => {
      state.error = null;
    },

    clearCurrentBooking: (state) => {
      state.booking = null;
    },

    clearCompletionOTP: (state) => {
      if (state.booking) {
        state.booking.otp = undefined;
      }
    },
  },

  extraReducers: (builder) => {
    builder

      // ==========================================
      // CREATE BOOKING
      // ==========================================
      .addCase(createBooking.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })

      .addCase(createBooking.fulfilled, (state, action) => {
        state.createLoading = false;

        if (action.payload.data) {
          state.myBookings.unshift(action.payload.data);
        }
      })

      .addCase(createBooking.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      })


      // ==========================================
      // GET MY BOOKINGS
      // ==========================================
      .addCase(getMyBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getMyBookings.fulfilled, (state, action) => {
        state.loading = false;

        const data = action.payload.data;

        if (!data) return;

        state.myBookings = data.bookings || [];
        state.myBookingsNextCursor = data.nextCursor || null;
        state.myBookingsHasMore = data.hasMore || false;
      })

      .addCase(getMyBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // ==========================================
      // GET BOOKINGS FOR MY SERVICES
      // ==========================================
      .addCase(
        getBookingsForMyServices.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        getBookingsForMyServices.fulfilled,
        (state, action) => {
          state.loading = false;

          const data = action.payload.data;

          if (!data) return;

          state.serviceBookings = data.bookings || [];
          state.serviceBookingsNextCursor =
            data.nextCursor || null;
          state.serviceBookingsHasMore =
            data.hasMore || false;
        }
      )

      .addCase(
        getBookingsForMyServices.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )


      // ==========================================
      // GET BOOKING BY ID
      // ==========================================
      .addCase(getBookingById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getBookingById.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = action.payload.data;
      })

      .addCase(getBookingById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // ==========================================
      // UPDATE BOOKING DETAILS
      // ==========================================
      .addCase(updateBookingDetails.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })

      .addCase(updateBookingDetails.fulfilled, (state, action) => {
        state.updateLoading = false;

        const updatedBooking = action.payload.data;

        if (!updatedBooking) return;

        // Update current booking
        state.booking = updatedBooking;

        // Update user's bookings
        state.myBookings = state.myBookings.map((booking) =>
          booking._id === updatedBooking._id
            ? updatedBooking
            : booking
        );

        // Update service owner's bookings
        state.serviceBookings = state.serviceBookings.map(
          (booking) =>
            booking._id === updatedBooking._id
              ? updatedBooking
              : booking
        );
      })

      .addCase(updateBookingDetails.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      })


      // ==========================================
      // DELETE BOOKING
      // ==========================================
      .addCase(deleteBooking.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })

      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.deleteLoading = false;

        const deletedBookingId = action.payload.bookingId;

        state.myBookings = state.myBookings.filter(
          (booking) => booking._id !== deletedBookingId
        );

        state.serviceBookings = state.serviceBookings.filter(
          (booking) => booking._id !== deletedBookingId
        );

        if (state.booking?._id === deletedBookingId) {
          state.booking = null;
        }
      })

      .addCase(deleteBooking.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      })


      // ==========================================
      // UPDATE BOOKING STATUS
      // ==========================================
      .addCase(updateBookingStatus.pending, (state) => {
        state.statusLoading = true;
        state.error = null;
      })

      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        state.statusLoading = false;

        const updatedBooking = action.payload.data;

        if (!updatedBooking) return;

        // Update current booking
        state.booking = updatedBooking;

        // Update user's bookings
        state.myBookings = state.myBookings.map((booking) =>
          booking._id === updatedBooking._id
            ? updatedBooking
            : booking
        );

        // Update service owner's bookings
        state.serviceBookings = state.serviceBookings.map(
          (booking) =>
            booking._id === updatedBooking._id
              ? updatedBooking
              : booking
        );
      })

      .addCase(updateBookingStatus.rejected, (state, action) => {
        state.statusLoading = false;
        state.error = action.payload;
      })


      // ==========================================
      // REQUEST COMPLETION
      // ==========================================
      .addCase(requestCompletion.pending, (state) => {
        state.completionLoading = true;
        state.error = null;
      })

      .addCase(requestCompletion.fulfilled, (state, action) => {
        state.completionLoading = false;

        /*
         * Backend currently returns:
         * { success, data: {}, message }
         *
         * So there may not be a complete booking object here.
         *
         * We can at least update the current booking status.
         */
        if (state.booking) {
          state.booking.status = "completion_requested";
        }

        // Also update the service booking list
        if (state.booking?._id) {
          state.serviceBookings = state.serviceBookings.map(
            (booking) =>
              booking._id === state.booking._id
                ? {
                    ...booking,
                    status: "completion_requested",
                  }
                : booking
          );
        }
      })

      .addCase(requestCompletion.rejected, (state, action) => {
        state.completionLoading = false;
        state.error = action.payload;
      })


      // ==========================================
      // GET COMPLETION OTP
      // ==========================================
      .addCase(getCompletionOTP.pending, (state) => {
        state.otpLoading = true;
        state.error = null;
      })

      .addCase(getCompletionOTP.fulfilled, (state, action) => {
        state.otpLoading = false;

        /*
         * Backend returns:
         * data: { otp }
         */
        if (state.booking && action.payload.data?.otp) {
          state.booking.otp = action.payload.data.otp;
        }
      })

      .addCase(getCompletionOTP.rejected, (state, action) => {
        state.otpLoading = false;
        state.error = action.payload;
      })


      // ==========================================
      // VERIFY COMPLETION OTP
      // ==========================================
      .addCase(verifyCompletionOTP.pending, (state) => {
        state.verifyOtpLoading = true;
        state.error = null;
      })

      .addCase(verifyCompletionOTP.fulfilled, (state, action) => {
        state.verifyOtpLoading = false;

        const completedBooking = action.payload.data;

        if (!completedBooking) return;

        // Update current booking
        state.booking = completedBooking;

        // Update user's bookings
        state.myBookings = state.myBookings.map((booking) =>
          booking._id === completedBooking._id
            ? completedBooking
            : booking
        );

        // Update service owner's bookings
        state.serviceBookings = state.serviceBookings.map(
          (booking) =>
            booking._id === completedBooking._id
              ? completedBooking
              : booking
        );
      })

      .addCase(verifyCompletionOTP.rejected, (state, action) => {
        state.verifyOtpLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearBookingError,
  clearCurrentBooking,
  clearCompletionOTP,
} = bookingSlice.actions;

export default bookingSlice.reducer;