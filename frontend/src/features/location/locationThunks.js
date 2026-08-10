import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  showSuccessToast,
  showErrorToast,
} from "../../utils/customToast.jsx";
import { reverseGeocodeApi, searchLocationApi} from "../../api/location.api.js";



export const reverseGeocode = createAsyncThunk(
    "location/reverseGeocode",
    async ({ lat, lng }, { rejectWithValue }) => {
        try {
            const response = await reverseGeocodeApi(lat, lng);
            return response;
        }catch (error) {
            const message = error.response?.data?.message || "Failed to fetch address";
            showErrorToast(message);
            return rejectWithValue(message);
        }
    }
);

export const searchLocation = createAsyncThunk(
    "location/searchLocation",
    async (query, { rejectWithValue }) => {
        try {
            const response = await searchLocationApi(query);
            return response;
        } catch (error) {
            const message = error.response?.data?.message || "Failed to search location";
            showErrorToast(message);
            return rejectWithValue(message);
        }
    }
);