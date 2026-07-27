import {createAsyncThunk} from "@reduxjs/toolkit";
import {toast} from "react-hot-toast";

import {loginUser,registerUser,logoutUser,checkAuth,resetPassword,forgotPassword} from "../../api/auth.api.js";

export const register = createAsyncThunk(
    "auth/register",
    async(formData,{rejectWithValue}) =>{
        try{
            const response = await registerUser(formData);
            toast.success(response.message || "Registration successful");
            return response;
        }
        catch(error){
            const message = error.response?.data?.message || "Registration failed";
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async(credentials,{rejectWithValue}) =>{
        try{
            const response = await loginUser(credentials);
            toast.success(response.message || "Login successful");
            return response;
        }catch(error){
            const message = error.response?.data?.message || "Login failed";
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);

export const logout = createAsyncThunk(
    "/auth/logout",
    async(_,{rejectWithValue}) =>{
        try{
            const response = await logoutUser();
            toast.success(response.message || "Logged out");
            return response;
        }catch(error){
            const message = error.response?.data?.message || "Logout failed";
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);

export const checkAuthentication = createAsyncThunk(
    "auth/checkAuthentication",
    async(_,{rejectWithValue}) =>{
        try{
            const response = await checkAuth();
            return response;
        }catch(error){
           const message = error.response?.data?.message || "Unauthorized";
           return rejectWithValue(message);
        }
    }
);

export const forgotPassword = createAsyncThunk(
    "auth/forgotPassword",
    async ({token, formData},{rejectWithValue})=>{
        try{
            const response = await forgotPassword(token, formData);
            toast.success(response.message);
            return response;
        } catch(error){
            const message = error.response?.data?.message || "Failed to send reset link.";
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);

export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async ({ token, formData }, { rejectWithValue }) => {
        try {
            const response = await resetPassword(token, formData);
            toast.success(response.message);
            return response;
        } catch (error) {
            const message = error.response?.data?.message || "Password reset failed";
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);

