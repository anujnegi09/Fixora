// ==========================
// Location
// ==========================

export const selectLocation = (state) => state.location.location;

export const selectAddress = (state) => state.location.location.address;

export const selectCity = (state) => state.location.location.city;

export const selectState = (state) => state.location.location.state;

export const selectPincode = (state) => state.location.location.pincode;

export const selectLatitude = (state) => state.location.location.latitude;

export const selectLongitude = (state) => state.location.location.longitude;

// ==========================
// Search Results
// ==========================

export const selectSearchResults = (state) =>
    state.location.searchResults;

// ==========================
// Loading
// ==========================

export const selectReverseGeocodeLoading = (state) =>
    state.location.reverseGeocodeLoading;

export const selectSearchLocationLoading = (state) =>
    state.location.searchLocationLoading;

// ==========================
// Error
// ==========================

export const selectLocationError = (state) =>
    state.location.error;