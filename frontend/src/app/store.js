import {configureStore} from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice.js";
import userSlice from "../features/user/userSlice.js";


export const store = configureStore({
    reducer :{
        auth : authSlice,
        user : userSlice,
        
    },
    devTools : import.meta.env.DEV,
});

