import {configureStore} from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice.js";
import userSlice from "../features/user/userSlice.js";
import serviceSlice from "../features/services/serviceSlice.js"
import locationSlice from "../features/location/locationSlice.js"




export const store = configureStore({
    reducer :{
        auth : authSlice,
        user : userSlice,
        service :serviceSlice,
        location : locationSlice
        
    },
    devTools : import.meta.env.DEV,
});

