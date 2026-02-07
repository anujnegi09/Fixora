import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;
axios.defaults.withCredentials = true;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check Auth
  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/users/check-auth");
      if (data.success) {
        setAuthUser(data.user);
      }
    } catch (err) {
      setAuthUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (credentials) => {
    try {
      const { data } = await axios.post("/api/users/login", credentials);
      if (data.success) {
        setAuthUser(data.user);
        toast.success("Logged in successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  // Logout
  const logout = async () => {
    try {
      const { data } = await axios.post("/api/users/logout");
      if (data.success) {
        setAuthUser(null);
        toast.success("Logged out successfully");
      }
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  // Update Profile
  const updateProfile = async (formData) => {
    try {
      const { data } = await axios.put("/api/users/update-profile", formData);
      if (data.success) {
        setAuthUser(data.user);
        toast.success("Profile updated");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ authUser, loading, login, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
