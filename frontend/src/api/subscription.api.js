import api from "./axios";

// ==========================================
// Create Subscription
// ==========================================

export const createSubscriptionApi = async (plan) => {
  const response = await api.post("/subscription/create", {
    plan,
  });

  return response.data;
};


// ==========================================
// Get My Subscription
// ==========================================

export const getMySubscriptionApi = async () => {
  const response = await api.get("/subscription/my-subscription");

  return response.data;
};


// ==========================================
// Verify Subscription Payment
// ==========================================

export const verifySubscriptionPaymentApi = async (paymentData) => {
  const response = await api.post(
    "/subscription/verify-payment",
    paymentData
  );

  return response.data;
};


// ==========================================
// Cancel Subscription
// ==========================================

export const cancelSubscriptionApi = async () => {
  const response = await api.post("/subscription/cancel");

  return response.data;
};