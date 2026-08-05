import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

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
            toast.error(message);
            return rejectWithValue(message);
        }
    } 
);



export const updateProfile = createAsyncThunk(
    "user/updateProfile",
    async(formData,{rejectWithValue}) =>{
        try{
        const response = await updateProfileApi(formData);
        toast.success(response.message);
        return response;
        }catch(error){
            const message = error.response?.data?.message || "Failed to update profile";
            toast.error(message);
            return rejectWithValue(message);
        }
    } 
);

export const completeProfile = createAsyncThunk(
    "user/completeProfile",
    async(formData,{rejectWithValue}) =>{
        try{
        const response = await completeProfileApi(formData);
        toast.success(response.message);
        return response;
        }catch(error){
            const message = error.response?.data?.message || "Failed to complete profile";
            toast.error(message);
            return rejectWithValue(message);
        }
    } 
);


export const changePassword = createAsyncThunk(
    "user/changePassword",
    async(formData,{rejectWithValue}) =>{
        try{
        const response = await changePasswordApi(formData);
        toast.success(response.message);
        return response;
        }catch(error){
            const message = error.response?.data?.message || "Failed to change password";
            toast.error(message);
            return rejectWithValue(message);
        }
    } 
);

export const updateLocation = createAsyncThunk(
    "user/updateLocation",
    async (locationData, { rejectWithValue }) => {
        try {
            const response = await updateLocationApi(locationData);
            toast.success(response.message);
            return response;
        } catch (error) {
            const message =
                error.response?.data?.message ||
                "Failed to update location";
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);