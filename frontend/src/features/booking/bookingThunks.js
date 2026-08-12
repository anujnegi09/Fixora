import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  showSuccessToast,
  showErrorToast,
} from "../../utils/customToast.jsx";

import {
  createBookingApi,
  getMyBookingsApi,
  getBookingsForMyServicesApi,
  getBookingByIdApi,
  updateBookingDetailsApi,
  deleteBookingApi,
  updateBookingStatusApi,
  requestCompletionApi,
  getCompletionOTPApi,
  verifyCompletionOTPApi,
} from "../../api/booking.api.js";


// ==========================================
// CREATE BOOKING
// ==========================================
export const createBooking = createAsyncThunk(
  "bookings/createBooking",
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await createBookingApi(bookingData);

      showSuccessToast(response.message);

      return response;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to create booking";

      showErrorToast(message);

      return rejectWithValue(message);
    }
  }
);


// ==========================================
// GET MY BOOKINGS
// ==========================================
export const getMyBookings = createAsyncThunk(
  "bookings/getMyBookings",
  async (params, { rejectWithValue }) => {
    try {
      const response = await getMyBookingsApi(params);

      return response;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to fetch your bookings";

      showErrorToast(message);

      return rejectWithValue(message);
    }
  }
);


// ==========================================
// GET BOOKINGS FOR MY SERVICES
// ==========================================
export const getBookingsForMyServices = createAsyncThunk(
  "bookings/getBookingsForMyServices",
  async (params, { rejectWithValue }) => {
    try {
      const response = await getBookingsForMyServicesApi(params);

      return response;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to fetch bookings for your services";

      showErrorToast(message);

      return rejectWithValue(message);
    }
  }
);


// ==========================================
// GET BOOKING BY ID
// ==========================================
export const getBookingById = createAsyncThunk(
  "bookings/getBookingById",
  async (bookingId, { rejectWithValue }) => {
    try {
      const response = await getBookingByIdApi(bookingId);

      return response;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to fetch booking";

      showErrorToast(message);

      return rejectWithValue(message);
    }
  }
);


// ==========================================
// UPDATE BOOKING DETAILS
// ==========================================
export const updateBookingDetails = createAsyncThunk(
  "bookings/updateBookingDetails",
  async ({ bookingId, bookingData }, { rejectWithValue }) => {
    try {
      const response = await updateBookingDetailsApi(
        bookingId,
        bookingData
      );

      showSuccessToast(response.message);

      return response;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to update booking";

      showErrorToast(message);

      return rejectWithValue(message);
    }
  }
);


// ==========================================
// DELETE BOOKING
// ==========================================
export const deleteBooking = createAsyncThunk(
  "bookings/deleteBooking",
  async (bookingId, { rejectWithValue }) => {
    try {
      const response = await deleteBookingApi(bookingId);

      showSuccessToast(response.message);

      return {
        ...response,
        bookingId,
      };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to delete booking";

      showErrorToast(message);

      return rejectWithValue(message);
    }
  }
);


// ==========================================
// UPDATE BOOKING STATUS
// ==========================================
export const updateBookingStatus = createAsyncThunk(
  "bookings/updateBookingStatus",
  async ({ bookingId, status }, { rejectWithValue }) => {
    try {
      const response = await updateBookingStatusApi(
        bookingId,
        status
      );

      showSuccessToast(response.message);

      return response;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to update booking status";

      showErrorToast(message);

      return rejectWithValue(message);
    }
  }
);


// ==========================================
// REQUEST COMPLETION
// ==========================================
export const requestCompletion = createAsyncThunk(
  "bookings/requestCompletion",
  async (bookingId, { rejectWithValue }) => {
    try {
      const response = await requestCompletionApi(bookingId);

      showSuccessToast(response.message);

      return response;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to request completion";

      showErrorToast(message);

      return rejectWithValue(message);
    }
  }
);


// ==========================================
// GET COMPLETION OTP
// ==========================================
export const getCompletionOTP = createAsyncThunk(
  "bookings/getCompletionOTP",
  async (bookingId, { rejectWithValue }) => {
    try {
      const response = await getCompletionOTPApi(bookingId);

      return response;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to fetch completion OTP";

      showErrorToast(message);

      return rejectWithValue(message);
    }
  }
);


// ==========================================
// VERIFY COMPLETION OTP
// ==========================================
export const verifyCompletionOTP = createAsyncThunk(
  "bookings/verifyCompletionOTP",
  async ({ bookingId, otp }, { rejectWithValue }) => {
    try {
      const response = await verifyCompletionOTPApi(
        bookingId,
        otp
      );

      showSuccessToast(response.message);

      return response;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to verify completion OTP";

      showErrorToast(message);

      return rejectWithValue(message);
    }
  }
);