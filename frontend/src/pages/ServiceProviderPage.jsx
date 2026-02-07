import React, { useState, useEffect } from "react";
import axios from "axios";

const ServiceProvider = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    phoneNumber: "",
    availability: {
      days: [
        { day: "Monday", available: false },
        { day: "Tuesday", available: false },
        { day: "Wednesday", available: false },
        { day: "Thursday", available: false },
        { day: "Friday", available: false },
        { day: "Saturday", available: false },
        { day: "Sunday", available: false },
      ],
    },
  });

  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch user's services
  const fetchServices = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/services/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(res.data.services || []);
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleDayToggle = (index) => {
    const updatedDays = [...formData.availability.days];
    updatedDays[index].available = !updatedDays[index].available;
    setFormData({ ...formData, availability: { days: updatedDays } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const token = localStorage.getItem("token");

    try {
      if (editingService) {
        await axios.put(
          `http://localhost:5000/api/services/${editingService._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage("✅ Service updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/services", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage("✅ Service created successfully!");
      }

      setFormData({
        title: "",
        description: "",
        location: "",
        phoneNumber: "",
        availability: {
          days: formData.availability.days.map((d) => ({
            ...d,
            available: false,
          })),
        },
      });
      setEditingService(null);
      fetchServices();
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to save service");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      location: service.location,
      phoneNumber: service.phoneNumber,
      availability: service.availability,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchServices();
    } catch (err) {
      console.error(err);
      alert("Failed to delete service");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-start justify-between min-h-screen bg-gradient-to-r from-gray-100 via-blue-50 to-gray-100 p-8 gap-6">
      {/* ✅ Left Side: Create / Update Form */}
      <div
        className="w-full md:w-1/2 bg-white p-8 rounded-2xl shadow-xl border border-gray-200 transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          {editingService ? "Update Service" : "Create New Service"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="title"
            placeholder="Service title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="3"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          ></textarea>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="10-digit phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* ✅ Availability */}
          <div>
            <p className="font-semibold text-gray-700 mb-2">Availability</p>
            <div className="grid grid-cols-2 gap-2">
              {formData.availability.days.map((day, i) => (
                <label
                  key={day.day}
                  className={`flex items-center gap-2 border rounded-lg p-2 cursor-pointer transition ${
                    day.available
                      ? "bg-blue-100 border-blue-500"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={day.available}
                    onChange={() => handleDayToggle(i)}
                  />
                  {day.day}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {loading
              ? "Saving..."
              : editingService
              ? "Update Service"
              : "Create Service"}
          </button>

          {message && (
            <p
              className={`text-center font-semibold ${
                message.includes("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>

      {/* ✅ Right Side: Created Services */}
      <div
        className="w-full md:w-1/2 bg-white rounded-2xl shadow-xl p-8 border border-gray-200 transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Your Created Services
        </h2>

        {services.length === 0 ? (
          <p className="text-gray-500 text-center">
            No services created yet. Start by adding one!
          </p>
        ) : (
          <div className="grid sm:grid-cols-1 gap-4">
            {services.map((service) => (
              <div
                key={service._id}
                className="border p-4 rounded-xl shadow-sm bg-gray-50 hover:bg-blue-50 transition-all duration-300 hover:scale-[1.02]"
              >
                <h3 className="font-semibold text-lg text-blue-700">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {service.description}
                </p>
                <p className="text-gray-500 text-sm">📍 {service.location}</p>
                <p className="text-gray-500 text-sm mb-2">
                  📞 {service.phoneNumber}
                </p>

                <div className="flex justify-between mt-3">
                  <button
                    onClick={() => handleEdit(service)}
                    className="px-3 py-1 bg-yellow-400 text-white rounded-md hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceProvider;
