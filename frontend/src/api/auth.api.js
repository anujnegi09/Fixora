import api from "./axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

/**
 * Register a new user
 */
export const registerUser = async (formData) => {
    const response = await api.post("/users/register", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};

/**
 * Login user
 */
export const loginUser = async (credentials) => {
    const response = await api.post("/users/login", credentials);

    return response.data;
};

/**
 * Logout user
 */
export const logoutUser = async () => {
    const response = await api.post("/users/logout");

    return response.data;
};

/**
 * Check if the user is authenticated
 */
export const checkAuth = async () => {
    const response = await api.get("/users/check-auth");

    return response.data;
};

/**
 * Refresh access token
 */
export const refreshAccessToken = async () => {
    const response = await api.post("/users/refresh-token");

    return response.data;
};

/**
 * Verify email
 */
export const verifyEmail = async (token) => {
    const response = await api.get(`/users/verify-email/${token}`);

    return response.data;
};

/**
 * Forgot password
 */
export const forgotPassword = async (formData) => {
    const response = await api.post("/users/forgot-password",formData);

    return response.data;
};

/**
 * reset password
 */
export const resetPassword = async (token,formData) => {
    const response = await api.post(`/users/reset-password/${token}`,formData);
    return response.data;
};


// Google Login
export const loginWithGoogle = () => {
    window.location.href = `${BACKEND_URL}/users/google`;
};



