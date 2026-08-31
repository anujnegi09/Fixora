import api from "./axios.js";

export const addReviewApi = async (bookingId, reviewData) => {
  const response = await api.post(
    `/reviews/${bookingId}`,
    reviewData
  );

  return response.data;
};


export const getServiceReviewsApi = async (serviceId) => {
  const response = await api.get(
    `/reviews/service/${serviceId}`
  );

  return response.data;
};


export const updateReviewApi = async (reviewId, reviewData) => {
  const response = await api.patch(
    `/reviews/${reviewId}`,
    reviewData
  );

  return response.data;
};

export const deleteReviewApi = async (reviewId) => {
  const response = await api.delete(
    `/reviews/${reviewId}`
  );

  return response.data;
};

export const getMyReviewsApi = async () => {
  const response = await api.get("/reviews/my-reviews");

  return response.data;
};

export const getMyServiceReviewsApi = async () => {
  const response = await api.get("/reviews/my-service-reviews");

  return response.data;
};