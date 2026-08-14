import {configureStore} from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice.js";
import userSlice from "../features/user/userSlice.js";
import serviceSlice from "../features/services/serviceSlice.js"
import locationSlice from "../features/location/locationSlice.js"
import bookingSlice from "../features/bookings/bookingSlice.js"


export const store = configureStore({
    reducer :{
        auth : authSlice,
        user : userSlice,
        service : serviceSlice,
        location : locationSlice,
        booking : bookingSlice,
        
    },
    devTools : import.meta.env.DEV,
});

