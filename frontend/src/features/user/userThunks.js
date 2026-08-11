import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  showSuccessToast,
  showErrorToast,
} from "../../utils/customToast.jsx";
import { getProfileApi, updateProfileApi,
    completeProfileApi, changePasswordApi, updateLocationApi  } from "../../api/user.api.js";


export const getProfile = createAsyncThunk(
    "user/getProfile",
    async(_,{rejectWithValue}) =>{
        try{
        const response = await getProfileApi();
        return response;
        }catch(error){
            const message = error.response?.data?.message || "Failed to fetch profile";
            showErrorToast(message);
            return rejectWithValue(message);
        }
    } 
);



export const updateProfile = createAsyncThunk(
    "user/updateProfile",
    async(formData,{rejectWithValue}) =>{
        try{
        const response = await updateProfileApi(formData);
        console.log("UPDATED USER:", response.data);
console.log("UPDATED AVATAR:", response.data?.avatar);
        showSuccessToast(response.message);
        return response;
        }catch(error){
            console.log("UPDATE PROFILE ERROR:", error);
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);
            const message = error.response?.data?.message || "Failed to update profile";
            showErrorToast(message);
            return rejectWithValue(message);
        }
    } 
);

export const completeProfile = createAsyncThunk(
    "user/completeProfile",
    async(formData,{rejectWithValue}) =>{
        try{
        const response = await completeProfileApi(formData);
        showSuccessToast(response.message);
        return response;
        }catch(error){
            const message = error.response?.data?.message || "Failed to complete profile";
            showErrorToast(message);
            return rejectWithValue(message);
        }
    } 
);


export const changePassword = createAsyncThunk(
    "user/changePassword",
    async(formData,{rejectWithValue}) =>{
        try{
        const response = await changePasswordApi(formData);
        showSuccessToast(response.message);
        return response;
        }catch(error){
            const message = error.response?.data?.message || "Failed to change password";
            showErrorToast(message);
            return rejectWithValue(message);
        }
    } 
);

export const updateLocation = createAsyncThunk(
    "user/updateLocation",
    async (locationData, { rejectWithValue }) => {
        try {
            const response = await updateLocationApi(locationData);
            showSuccessToast(response.message);
            return response;
        } catch (error) {
            const message = error.response?.data?.message || "Failed to update location";
            showErrorToast(message);
            return rejectWithValue(message);
        }
    }
);