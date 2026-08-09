import api from "./axios";


//create service
export const createServiceApi = async (formData) => {
  const response = await api.post("/services/create", formData);

  return response.data;
};

//get all services 
// export const getAllServicesApi = async (params) => {
//     const response = await api.get("/services", params,);
//     return response.data;
// };
export const getAllServicesApi = async (params) => {
  const response = await api.get("/services", {
    params: {
      page: params?.page,
      limit: params?.limit,
      title: params?.search,
      latitude: params?.latitude,
      longitude: params?.longitude,
    },
  });

  return response.data;
};
// export const getAllServicesApi = async (params) => {
//   const response = await api.get("/services",{params});
//   return response.data;
// };

//get by id 
export const getServiceByIdApi = async (serviceId)=>{
  const response = await api.get(`/services/${serviceId}`);
  return response.data;
}

//update service 
export const updateServiceApi = async (serviceId,serviceData) => {
  const response = await api.patch(`/services/update/${serviceId}`, serviceData);

  return response.data;
};

export const deleteServiceApi = async (serviceId) => {
  const response = await api.delete(`/services/${serviceId}`);
  return response.data;
};

export const getMyServicesApi= async()=>{
  const response = await api.get("services/my-services");
  return response.data;
}
export const toggleServiceVisibilityApi = async(serviceId) =>{
  const response = await api.patch(`services/${serviceId}/toggle-visibility`);
  return response.data;
}