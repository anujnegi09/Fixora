import { createSlice } from "@reduxjs/toolkit";

import { reverseGeocode,searchLocation,} from "./locationThunks";

const initialState = {
    location: {
        address: "",
        city: "",
        state: "",
        pincode: "",
        latitude: null,
        longitude: null,
    },
    searchResults: [],
    reverseGeocodeLoading: false,
    searchLocationLoading: false,
    error: null,
};

const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        clearLocationError: (state) => {
            state.error = null;
        },
        clearSearchResults: (state) => {
            state.searchResults = [];
        },
        clearSelectedLocation: (state) => {
            state.location = {
                address: "",
                city: "",
                state: "",
                pincode: "",
                latitude: null,
                longitude: null,
            };
        },
    },
    extraReducers: (builder) => {
        builder
        // ==========================
        // Reverse Geocode
        // ==========================
        .addCase(reverseGeocode.pending, (state) => {
            state.reverseGeocodeLoading = true;
            state.error = null;
        })
        .addCase(reverseGeocode.fulfilled, (state, action) => {
            state.reverseGeocodeLoading = false;
            state.location = {
                address: action.payload.display_name,
                city:
                    action.payload.address.city ||
                    action.payload.address.town ||
                    action.payload.address.village ||
                    "",
                state: action.payload.address.state || "",
                pincode: action.payload.address.postcode || "",
                latitude: Number(action.meta.arg.lat),
                longitude: Number(action.meta.arg.lng),
            };
        })
        .addCase(reverseGeocode.rejected, (state, action) => {
            state.reverseGeocodeLoading = false;
            state.error = action.payload;
        })

        // ==========================
        // Search Location
        // ==========================

        .addCase(searchLocation.pending, (state) => {
            state.searchLocationLoading = true;
            state.error = null;
        })
        .addCase(searchLocation.fulfilled, (state, action) => {
            state.searchLocationLoading = false;
            state.searchResults = action.payload;
        })
        .addCase(searchLocation.rejected, (state, action) => {
            state.searchLocationLoading = false;
            state.error = action.payload;
        });
    },
});
export const {clearLocationError,clearSearchResults,clearSelectedLocation,} = locationSlice.actions;
export default locationSlice.reducer;