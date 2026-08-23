import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createSubscriptionApi,
  getMySubscriptionApi,
  verifySubscriptionPaymentApi,
  cancelSubscriptionApi,
} from "../../api/subscription.api";

import {
  showSuccessToast,
  showErrorToast,
} from "../../utils/customToast.jsx";


export const createSubscription = createAsyncThunk(
  "subscription/createSubscription",

  async (plan, { rejectWithValue }) => {
    try {
      const response = await createSubscriptionApi(plan);
      showSuccessToast(response.message)
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to create subscription";

      showErrorToast(message);

      return rejectWithValue(message);
    }
  }
);


// ==========================================
// Get My Subscription
// ==========================================

export const getMySubscription = createAsyncThunk(
  "subscription/getMySubscription",

  async (_, { rejectWithValue }) => {
    try {
      const response = await getMySubscriptionApi();

      return response;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to fetch subscription";

      showErrorToast(message);

      return rejectWithValue(message);
    }
  }
);


// ==========================================
// Verify Subscription Payment
// ==========================================

export const verifySubscriptionPayment = createAsyncThunk(
  "subscription/verifySubscriptionPayment",

  async (paymentData, { rejectWithValue }) => {
    try {
      const response =
        await verifySubscriptionPaymentApi(paymentData);

      return response;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to verify subscription payment";

      showErrorToast(message);

      return rejectWithValue(message);
    }
  }
);


// ==========================================
// Cancel Subscription
// ==========================================

export const cancelSubscription = createAsyncThunk(
  "subscription/cancelSubscription",

  async (_, { rejectWithValue }) => {
    try {
      const response = await cancelSubscriptionApi();

      return response;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to cancel subscription";

      showErrorToast(message);

      return rejectWithValue(message);
    }
  }
);