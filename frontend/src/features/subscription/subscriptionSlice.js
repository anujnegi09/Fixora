import { createSlice } from "@reduxjs/toolkit";

import {
  createSubscription,
  getMySubscription,
  verifySubscriptionPayment,
  cancelSubscription,
} from "./subscriptionThunks.js";

const initialState = {
  subscription: null,

  loading: false,

  createLoading: false,
  verifyLoading: false,
  cancelLoading: false,

  error: null,
};

const subscriptionSlice = createSlice({
  name: "subscription",

  initialState,

  reducers: {
    clearSubscriptionError: (state) => {
      state.error = null;
    },

    clearSubscription: (state) => {
      state.subscription = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ==========================================
      // Create Subscription
      // ==========================================

      .addCase(createSubscription.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })

    //   .addCase(createSubscription.fulfilled, (state, action) => {
    //     state.createLoading = false;
    .addCase(createSubscription.fulfilled, (state, action) => {
        state.createLoading = false;
        if (action.payload.data?.subscription) {
        state.subscription = action.payload.data.subscription;
        }
    })

      .addCase(createSubscription.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      })


      // ==========================================
      // Get My Subscription
      // ==========================================

      .addCase(getMySubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getMySubscription.fulfilled, (state, action) => {
        state.loading = false;

        state.subscription = action.payload.data;
      })

      .addCase(getMySubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // ==========================================
      // Verify Subscription Payment
      // ==========================================

      .addCase(verifySubscriptionPayment.pending, (state) => {
        state.verifyLoading = true;
        state.error = null;
      })

      .addCase(verifySubscriptionPayment.fulfilled,(state, action) => {
        state.verifyLoading = false;
        state.subscription = action.payload.data;
       })

      .addCase(
        verifySubscriptionPayment.rejected,
        (state, action) => {
          state.verifyLoading = false;
          state.error = action.payload;
        }
      )


      // ==========================================
      // Cancel Subscription
      // ==========================================

      .addCase(cancelSubscription.pending, (state) => {
        state.cancelLoading = true;
        state.error = null;
      })

      .addCase(cancelSubscription.fulfilled, (state, action) => {
        state.cancelLoading = false;

        if (action.payload.data) {
          state.subscription = action.payload.data;
        } else {
          state.subscription = null;
        }
      })

      .addCase(cancelSubscription.rejected, (state, action) => {
        state.cancelLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearSubscriptionError,
  clearSubscription,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;