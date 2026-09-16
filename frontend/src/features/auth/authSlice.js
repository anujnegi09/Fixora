import { createSlice } from "@reduxjs/toolkit";

import {
  register,
  login,
  logout,
  checkAuthentication,
  forgotPassword,
  resetPassword,
  resendVerificationEmail,
  verifyEmail,
} from "./authThunks.js";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  authChecked: false,
  error: null,
  resendVerificationLoading: false,
  forgotPasswordLoading: false,
  resetPasswordLoading: false,
  verifyEmailLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder

      //registration
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //check auth
      .addCase(checkAuthentication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuthentication.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.authChecked = true;
        state.profileCompleted = action.payload.profileCompleted;
      })
      .addCase(checkAuthentication.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.authChecked = true;
        state.error = action.payload;
      })

      //logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.forgotPasswordLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.forgotPasswordLoading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.forgotPasswordLoading = false;
        state.error = action.payload;
      })

      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.resetPasswordLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.resetPasswordLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPasswordLoading = false;
        state.error = action.payload;
      })

      // Verify Email
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(verifyEmail.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })

      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(resendVerificationEmail.pending, (state) => {
        state.verifyEmailLoading = true;
        state.resendVerificationLoading = true;
      })

      .addCase(resendVerificationEmail.fulfilled, (state) => {
        state.verifyEmailLoading = false;
        state.resendVerificationLoading = false;
      })

      .addCase(resendVerificationEmail.rejected, (state, action) => {
        state.verifyEmailLoading = true;
        state.resendVerificationLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
