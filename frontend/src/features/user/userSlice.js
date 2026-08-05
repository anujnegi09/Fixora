import { createSlice } from "@reduxjs/toolkit";

import {
  getProfile,
  updateProfile,
  completeProfile,
  changePassword,
  updateLocation
} from "./userThunks";

const initialState = {
  profile: null,
  loading: false,
  updateProfileLoading: false,
  completeProfileLoading: false,
  changePasswordLoading: false,
  updateLocationLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",

  initialState,

  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },

    clearProfile: (state) => {
      state.profile = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ==========================
      // Get Profile
      // ==========================

      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.data;
      })

      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // Update Profile
      // ==========================

      .addCase(updateProfile.pending, (state) => {
        state.updateProfileLoading = true;
        state.error = null;
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updateProfileLoading = false;
        state.profile = action.payload.data;
      })

      .addCase(updateProfile.rejected, (state, action) => {
        state.updateProfileLoading = false;
        state.error = action.payload;
      })

      // ==========================
      // Complete Profile
      // ==========================

      .addCase(completeProfile.pending, (state) => {
        state.completeProfileLoading = true;
        state.error = null;
      })

      .addCase(completeProfile.fulfilled, (state, action) => {
        state.completeProfileLoading = false;
        state.profile = action.payload.data;
      })

      .addCase(completeProfile.rejected, (state, action) => {
        state.completeProfileLoading = false;
        state.error = action.payload;
      })

      // ==========================
      // Change Password
      // ==========================

      .addCase(changePassword.pending, (state) => {
        state.changePasswordLoading = true;
        state.error = null;
      })

      .addCase(changePassword.fulfilled, (state) => {
        state.changePasswordLoading = false;
      })

      .addCase(changePassword.rejected, (state, action) => {
        state.changePasswordLoading = false;
        state.error = action.payload;
      })

        // ==========================
      // update location
      // ==========================
      .addCase(updateLocation.pending, (state) => {
         state.updateLocationLoading = true;
         state.error = null;
      })
      .addCase(updateLocation.fulfilled, (state, action) => {
          state.updateLocationLoading = false;
          state.profile = action.payload.data;
      })    
      .addCase(updateLocation.rejected, (state, action) => {
          state.updateLocationLoading = false;
          state.error = action.payload;
      })
     
  },
});

export const { clearUserError, clearProfile } = userSlice.actions;

export default userSlice.reducer;