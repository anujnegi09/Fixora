// Profile
export const selectProfile = (state) => state.user.profile;

// Loading
export const selectUserLoading = (state) => state.user.loading;

// Update Profile Loading
export const selectUpdateProfileLoading = (state) =>
  state.user.updateProfileLoading;

// Complete Profile Loading
export const selectCompleteProfileLoading = (state) =>
  state.user.completeProfileLoading;

// Change Password Loading
export const selectChangePasswordLoading = (state) =>
  state.user.changePasswordLoading;

// Error
export const selectUserError = (state) => state.user.error;