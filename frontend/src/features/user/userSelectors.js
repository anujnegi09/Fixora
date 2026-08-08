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

// export const selectUserLocation = (state) =>
//     state.user.profile?.location;

export const selectUpdateLocationLoading = (state) =>
    state.user.updateLocationLoading;

// export const selectUserLocation = (state) => {
//   const location = state.user.profile?.location;

//   if (!location) {
//     return {
//       address: "",
//       city: "",
//       state: "",
//       pincode: "",
//       latitude: null,
//       longitude: null,
//     };
//   }

//   return {
//     address: location.address || "",
//     city: location.city || "",
//     state: location.state || "",
//     pincode: location.pincode || "",
//     latitude: location.latitude ?? null,
//     longitude: location.longitude ?? null,
//   };
// };

export const selectUserLocation = (state) => {
  const location = state.user.profile?.location;

  if (!location) {
    return {
      address: "",
      city: "",
      state: "",
      pincode: "",
      latitude: null,
      longitude: null,
    };
  }

  return {
    address: location.address || "",
    city: location.city || "",
    state: location.state || "",
    pincode: location.pincode || "",

    longitude:
      location.coordinates?.coordinates?.[0] ?? null,

    latitude:
      location.coordinates?.coordinates?.[1] ?? null,
  };
};