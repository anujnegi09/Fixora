import { createSlice } from "@reduxjs/toolkit";

import {
  createService,
  getAllServices,
  getServiceById,
  getMyServices,
  updateService,
  deleteService,
  toggleServiceVisibility,
} from "./serviceThunks.js";

const initialState = {
  services: [],
  service: null,
  myServices: [],

  loading: false,

  createLoading: false,
  updateLoading: false,
  deleteLoading: false,

  error: null,
};

const serviceSlice = createSlice({
  name: "service",
  initialState,

  reducers: {
    clearServiceError: (state) => {
      state.error = null;
    },

    clearCurrentService: (state) => {
      state.service = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Create Service
      .addCase(createService.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.createLoading = false;

        if (action.payload.data) {
          state.services.unshift(action.payload.data);
          state.myServices.unshift(action.payload.data);
        }
      })
      .addCase(createService.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      })

      // Get All Services
      .addCase(getAllServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload.data.services;
      })
      .addCase(getAllServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Service By Id
      .addCase(getServiceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getServiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.service = action.payload.data;
      })
      .addCase(getServiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get My Services
      .addCase(getMyServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyServices.fulfilled, (state, action) => {
        state.loading = false;
        state.myServices = action.payload.data;
      })
      .addCase(getMyServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Service
      .addCase(updateService.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.updateLoading = false;

        state.service = action.payload.data;

        state.services = state.services.map((service) =>
          service._id === action.payload.data._id
            ? action.payload.data
            : service
        );

        state.myServices = state.myServices.map((service) =>
          service._id === action.payload.data._id
            ? action.payload.data
            : service
        );
      })
      .addCase(updateService.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      })

      // Delete Service
      .addCase(deleteService.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.deleteLoading = false;

        state.services = state.services.filter(
          (service) => service._id !== action.payload.data._id
        );

        state.myServices = state.myServices.filter(
          (service) => service._id !== action.payload.data._id
        );

        if (state.service?._id === action.payload.data._id) {
          state.service = null;
        }
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      })

      // Toggle Service Visibility
      .addCase(toggleServiceVisibility.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(toggleServiceVisibility.fulfilled, (state, action) => {
        state.updateLoading = false;

        state.services = state.services.map((service) =>
          service._id === action.payload.data._id
            ? action.payload.data
            : service
        );

        state.myServices = state.myServices.map((service) =>
          service._id === action.payload.data._id
            ? action.payload.data
            : service
        );

        if (state.service?._id === action.payload.data._id) {
          state.service = action.payload.data;
        }
      })
      .addCase(toggleServiceVisibility.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearServiceError, clearCurrentService } = serviceSlice.actions;

export default serviceSlice.reducer;