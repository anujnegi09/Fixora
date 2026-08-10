import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  showSuccessToast,
  showErrorToast,
} from "../../utils/customToast.jsx";
import {createServiceApi, getAllServicesApi, getServiceByIdApi,
     updateServiceApi, deleteServiceApi,getMyServicesApi,
  toggleServiceVisibilityApi,} from "../../api/service.api.js";

export const createService= createAsyncThunk(
    "services/createService",
    async(formData,{rejectWithValue}) =>{
        try{
        const response = await createServiceApi(formData);
        showSuccessToast(response.message);
        return response;
        }catch(error){
            const message = error.response?.data?.message || "Failed to create service";
            showErrorToast(message);
            return rejectWithValue(message);
        }
    } 
);
// get all services
export const getAllServices = createAsyncThunk(
    "services/getAllServices",
    async (params, { rejectWithValue }) => {
        try {
            const response = await getAllServicesApi(params);
            return response;
        } catch (error) {
            const message =
                error.response?.data?.message ||
                "Failed to fetch services";

            showErrorToast(message);

            return rejectWithValue(message);
        }
    }
);
// export const getAllServices = createAsyncThunk(
//     "services/getAllServices",
//     async(_, {rejectWithValue}) =>{
//         try{
//         const response = await getAllServicesApi();
//         return response;
//         }catch(error){
//             const message = error.response?.data?.message || "Failed to fetch services";
//             toast.error(message);
//             return rejectWithValue(message);
//         }
//     } 
// );
// get service by id 
export const getServiceById= createAsyncThunk(
    "services/getServiceById",
    async(serviceId,{rejectWithValue}) =>{
        try{
        const response = await getServiceByIdApi(serviceId);
        return response;
        }catch(error){
            const message = error.response?.data?.message || "Failed to fetch service by Id";
            showErrorToast(message);
            return rejectWithValue(message);
        }
    } 
);

// update service
export const updateService = createAsyncThunk(
    "services/updateService",
    async ({ serviceId, serviceData }, { rejectWithValue }) => {
        try {
            const response = await updateServiceApi(serviceId, serviceData);
            showSuccessToast(response.message);
            return response;
        } catch (error) {
            const message = error.response?.data?.message || "Failed to update service";
            showErrorToast(message);
            return rejectWithValue(message);
        }
    }
);


//delete service
export const deleteService = createAsyncThunk(
    "services/deleteService",
    async(serviceId,{rejectWithValue}) =>{
        try{
        const response = await deleteServiceApi(serviceId);
        showSuccessToast(response.message);
         return {
        ...response,
        serviceId,
        };
        }catch(error){
            const message = error.response?.data?.message || "Failed to delete service";
            showErrorToast(message);
            return rejectWithValue(message);
        }
    } 
);

export const getMyServices = createAsyncThunk(
  "services/getMyServices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getMyServicesApi();
      return response;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to fetch your services";
      showErrorToast(message);
      return rejectWithValue(message);
    }
  }
);

export const toggleServiceVisibility = createAsyncThunk(
  "services/toggleServiceVisibility",
  async (serviceId, { rejectWithValue }) => {
    try {
      const response = await toggleServiceVisibilityApi(serviceId);
      showSuccessToast(response.message);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to toggle service visibility";
      showErrorToast(message);
      return rejectWithValue(message);
    }
  }
);