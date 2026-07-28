import {createSlice} from "@reduxjs/toolkit";

import {register,login,logout,checkAuthentication,forgotPassword, resetPassword} from "./authThunks.js";

const initialState = {
    user : null,
    isAuthenticated : false,
    loading : false,
    error : null,
    forgotPasswordLoading: false,
    resetPasswordLoading: false,
};

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        clearError: (state)=>{
            state.error = null; 
        },
        setUser : (state,action)=>{
            state.user = action.payload;
            state.isAuthenticated = true;
        },
    },
    extraReducers :(builder)=> {
        builder
        
        //registration
        .addCase(register.pending,(state) =>{
            state.loading = true;
            state.error = null;
        })
        .addCase(register.fulfilled, (state) =>{
            state.loading = false;
        })
        .addCase(register.rejected , (state,action) =>{
            state.loading = false;
            state.error = action.payload;
        })

        //login
        .addCase(login.pending , (state) =>{
            state.loading = true;
            state.error = null;
        })
        .addCase(login.fulfilled , (state,action) =>{
            state.loading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        })
        .addCase(login.rejected , (state,action) =>{
            state.loading = false;
            state.error = action.payload;
        })

        //check auth
        .addCase(checkAuthentication.pending , (state) =>{
            state.loading = true;
            state.error = null;
        })
        .addCase(checkAuthentication.fulfilled , (state,action) =>{
            state.loading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.profileCompleted = action.payload.profileCompleted;
        })
        .addCase(checkAuthentication.rejected , (state,action) =>{
            state.loading = false;
            state.error = action.payload;
            state.user = null;
        })

        
        //logout
        .addCase(logout.pending , (state) =>{
            state.loading = true;
        })
        .addCase(logout.fulfilled , (state) =>{
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        })
        .addCase(logout.rejected , (state,action) =>{
            state.loading = false;
            state.error = action.payload;
        })

        // Forgot Password
        .addCase(forgotPassword.pending, (state) => {
            state.forgotPasswordLoading = true;
            state.error = null;
        })
        .addCase(forgotPassword.fulfilled, (state) => {
            state.forgotPasswordLoading = false;
        })
        .addCase(forgotPassword.rejected, (state, action) => {
            state.forgotPasswordLoading = false;
            state.error = action.payload;
        })

        // Reset Password
        .addCase(resetPassword.pending, (state) => {
            state.resetPasswordLoading = true;
            state.error = null;
        })
        .addCase(resetPassword.fulfilled, (state) => {
            state.resetPasswordLoading = false;
        })
        .addCase(resetPassword.rejected, (state, action) => {
            state.resetPasswordLoading = false;
            state.error = action.payload;
        })
    }
});

export const {clearError, setUser} = authSlice.actions;
export default authSlice.reducer;