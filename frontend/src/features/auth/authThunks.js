import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  showSuccessToast,
  showErrorToast,
} from "../../utils/customToast.jsx";

import {loginUser,registerUser,logoutUser,checkAuth,resetPassword as ResetPassword ,forgotPassword as ForgotPassword} from "../../api/auth.api.js";

import { getProfile } from "../user/userThunks";


export const register = createAsyncThunk(
    "auth/register",
    async(formData,{rejectWithValue}) =>{
        try{
            const response = await registerUser(formData);
            showSuccessToast(response.message || "Registration successful");
            return response;
        }
        catch(error){
            const message = error.response?.data?.message || "Registration failed";
            showErrorToast(message);
            return rejectWithValue(message);
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async(credentials,{rejectWithValue}) =>{
        try{
            const response = await loginUser(credentials);
            showSuccessToast(response.message || "Login successful");
            return response;
        }catch(error){
            const message = error.response?.data?.message || "Login failed";
            showErrorToast(message);
            return rejectWithValue(message);
        }
    }
);

export const logout = createAsyncThunk(
    "/auth/logout",
    async(_,{rejectWithValue}) =>{
        try{
            const response = await logoutUser();
            showSuccessToast(response.message || "Logged out");
            return response;
        }catch(error){
            const message = error.response?.data?.message || "Logout failed";
            showErrorToast(message);
            return rejectWithValue(message);
        }
    }
);


export const checkAuthentication = createAsyncThunk(
  "auth/checkAuthentication",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await checkAuth();
      // Automatically load profile
      await dispatch(getProfile()).unwrap();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);


export const forgotPassword = createAsyncThunk(
    "auth/forgotPassword",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await ForgotPassword(formData);
            showSuccessToast(response.message);
            return response;
        } catch (error) {
            const message =
                error.response?.data?.message ||
                "Failed to send reset link.";
                showErrorToast(message);
            return rejectWithValue(message);
        }
    }
);

export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async ({ token, formData }, { rejectWithValue }) => {
        try {
            const response = await ResetPassword(token, formData);
            showSuccessToast(response.message);
            return response;
        } catch (error) {
            const message = error.response?.data?.message || "Password reset failed";
            showErrorToast(message);
            return rejectWithValue(message);
        }
    }
);

