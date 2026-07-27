import {completeProfile as CompleteProfile,changePasword} from "../../api/user.api.js";





export const completeProfile = createAsyncThunk(
    "user/completeProfile",
    async(formdata,{rejectWithValue}) =>{
        try{
        const response = await CompleteProfile(formdata);
        toast.success(response.message);
        return response;
        }catch(error){
            const message = error.response?.data?.message || "Failed to complete profile";
            toast(message);
            return rejectWithValue(message);
        }
    } 
);