// User
export const selectUser = (state) => state.auth.user;

// Authentication Status
export const selectIsAuthenticated = (state) =>
  state.auth.isAuthenticated;

// Loading State
export const selectLoading = (state) => state.auth.loading;

// Forgot Password Loading
export const selectForgotPasswordLoading = (state) =>
  state.auth.forgotPasswordLoading;

// Reset Password Loading
export const selectResetPasswordLoading = (state) =>
  state.auth.resetPasswordLoading;

// Error State
export const selectError = (state) => state.auth.error;