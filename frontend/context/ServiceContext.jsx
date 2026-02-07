// import React, { createContext, useState } from "react";

// export const ServiceContext = createContext();

// export const ServiceProvider = ({ children }) => {
//   const daysOfWeek = [
//     "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
//   ];

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     location: "",
//     rating: 0,
//     phoneNumber: "",
//     availability: daysOfWeek.map(day => ({ day, available: false })),
//   });

//   const [services, setServices] = useState([]);

//   // ✅ Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   // ✅ Toggle day availability
//   const handleToggleDay = (day) => {
//     setFormData(prev => ({
//       ...prev,
//       availability: prev.availability.map(item =>
//         item.day === day ? { ...item, available: !item.available } : item
//       ),
//     }));
//   };

//   // ✅ Submit form and add service
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setServices(prev => [...prev, { ...formData, id: Date.now() }]);
//     setFormData({
//       title: "",
//       description: "",
//       location: "",
//       rating: 0,
//       phoneNumber: "",
//       availability: daysOfWeek.map(day => ({ day, available: false })),
//     });
//   };

//   // ✅ Delete a service
//   const handleDelete = (id) => {
//     setServices(prev => prev.filter(service => service.id !== id));
//   };

//   return (
//     <ServiceContext.Provider
//       value={{
//         formData,
//         setFormData,
//         services,
//         handleChange,
//         handleToggleDay,
//         handleSubmit,
//         handleDelete,
//       }}
//     >
//       {children}
//     </ServiceContext.Provider>
//   );
// };



import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;
axios.defaults.withCredentials = true;

export const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [singleService, setSingleService] = useState(null);
  const [loading, setLoading] = useState(false);

  /** =============================
   * 📌 Get All Services
   * ============================== */
  const fetchServices = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/service/services");
      if (data.success) {
        setServices(data.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  /** =============================
   * 📌 Create a new Service
   * ============================== */
  const createService = async (formData) => {
    try {
      const { data } = await axios.post("/api/service/create-service", formData);
      if (data.success) {
        toast.success("Service created successfully");
        fetchServices(); // Refresh list
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create service");
    }
  };

  /** =============================
   * 📌 Get Service by ID
   * ============================== */
  const getServiceById = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/service/${id}`);
      if (data.success) {
        setSingleService(data.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch service");
    } finally {
      setLoading(false);
    }
  };

  /** =============================
   * 📌 Update Service
   * ============================== */
  const updateService = async (id, formData) => {
    try {
      const { data } = await axios.put(`/api/service/${id}`, formData);
      if (data.success) {
        toast.success("Service updated");
        fetchServices();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update service");
    }
  };

  /** =============================
   * 📌 Delete Service
   * ============================== */
  const deleteService = async (id) => {
    try {
      const { data } = await axios.delete(`/api/service/${id}`);
      if (data.success) {
        toast.success("Service deleted");
        fetchServices();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete service");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <ServiceContext.Provider
      value={{
        services,
        singleService,
        loading,
        fetchServices,
        createService,
        getServiceById,
        updateService,
        deleteService,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};
