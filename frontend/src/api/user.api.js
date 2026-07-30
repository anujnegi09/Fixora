import api from "./axios";


export const getProfileApi = async () => {
  const response = await api.get("/users/profile");
  return response.data;
};


export const updateProfileApi = async (formData) => {
  const response = await api.patch("/users/update-profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const completeProfileApi = async (formData) => {
  const response = await api.patch("/users/complete-profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const changePasswordApi = async (formData) => {
  const response = await api.patch("/users/change-password", formData);

  return response.data;
};