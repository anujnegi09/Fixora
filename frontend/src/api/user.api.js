import api from "./axios.js";


/**
 * complete profile
 */
export const completeProfile = async(formdata)=>{
    const response = await api.patch("/users/compele-profile", formdata,{
         headers: {
        "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

/**
 * change password
 */
export const changePassword = async (passwordData) => {
    const response = await api.patch("/users/change-password", {
        passwordData,
    });

    return response.data;
};