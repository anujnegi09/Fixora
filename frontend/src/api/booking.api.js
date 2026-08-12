import api from "./axios";

// ===============================
// CREATE BOOKING
// ===============================
export const createBookingApi = async (bookingData) => {
  const response = await api.post("/bookings/create", bookingData);
  return response.data;
};


// ===============================
// GET MY BOOKINGS
// ===============================
export const getMyBookingsApi = async (params) => {
  const response = await api.get("/bookings/my-bookings", {
    params: {
      limit: params?.limit,
      cursor: params?.cursor,
    },
  });

  return response.data;
};


// ===============================
// GET BOOKINGS FOR MY SERVICES
// ===============================
export const getBookingsForMyServicesApi = async (params) => {
  const response = await api.get("/bookings/my-service-bookings", {
    params: {
      limit: params?.limit,
      cursor: params?.cursor,
    },
  });

  return response.data;
};


// ===============================
// GET BOOKING BY ID
// ===============================
export const getBookingByIdApi = async (bookingId) => {
  const response = await api.get(`/bookings/${bookingId}`);
  return response.data;
};


// ===============================
// UPDATE BOOKING DETAILS
// ===============================
export const updateBookingDetailsApi = async (
  bookingId,
  bookingData
) => {
  const response = await api.patch(
    `/bookings/${bookingId}`,
    bookingData
  );

  return response.data;
};


// ===============================
// DELETE BOOKING
// ===============================
export const deleteBookingApi = async (bookingId) => {
  const response = await api.delete(
    `/bookings/delete/${bookingId}`
  );

  return response.data;
};


// ===============================
// UPDATE BOOKING STATUS
// ===============================
export const updateBookingStatusApi = async (
  bookingId,
  status
) => {
  const response = await api.patch(
    `/bookings/${bookingId}/update-booking-status`,
    { status }
  );

  return response.data;
};


// ===============================
// REQUEST COMPLETION
// ===============================
export const requestCompletionApi = async (bookingId) => {
  const response = await api.patch(
    `/bookings/${bookingId}/request-completion`
  );

  return response.data;
};


// ===============================
// GET COMPLETION OTP
// ===============================
export const getCompletionOTPApi = async (bookingId) => {
  const response = await api.get(
    `/bookings/${bookingId}/completion-otp`
  );

  return response.data;
};


// ===============================
// VERIFY COMPLETION OTP
// ===============================
export const verifyCompletionOTPApi = async (
  bookingId,
  otp
) => {
  const response = await api.patch(
    `/bookings/${bookingId}/verify-completion`,
    { otp }
  );

  return response.data;
};