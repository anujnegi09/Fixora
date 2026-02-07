import React, { useState } from "react";

const allServices = [
  {
    id: 1,
    title: "Plumbing Repair",
    description: "Fixing leaks and pipes in residential areas",
    location: "Delhi",
    phoneNumber: "9876543210",
    rating: 4.2,
    provider: {
      name: "Anuj Negi",
      profilePic: "https://i.pravatar.cc/100?img=3"
    }
  },
  {
    id: 2,
    title: "Electrician Service",
    description: "Home wiring, installation & repairs",
    location: "Mumbai",
    phoneNumber: "9123456789",
    rating: 3.8,
    provider: {
      name: "Ravi Sharma",
      profilePic: "https://i.pravatar.cc/100?img=4"
    }
  },
  {
    id: 3,
    title: "Home Tutor",
    description: "Math & Science expert for classes 6–10",
    location: "Bangalore",
    phoneNumber: "9998887777",
    rating: 4.7,
    provider: {
      name: "Priya Verma",
      profilePic: "https://i.pravatar.cc/100?img=5"
    }
  },
];

const Services = () => {
  const [search, setSearch] = useState("");
  const [selectedService, setSelectedService] = useState(null);

  // Filtered services based on search
  const filteredServices = allServices.filter(
    (service) =>
      service.title.toLowerCase().includes(search.toLowerCase()) ||
      service.description.toLowerCase().includes(search.toLowerCase()) ||
      service.location.toLowerCase().includes(search.toLowerCase())
  );

  // Open and close popup
  const handleOpen = (service) => setSelectedService(service);
  const handleClose = () => setSelectedService(null);

  return (
    <div className="pt-10 flex flex-col items-center w-full min-h-screen bg-gray-100 p-6">
      <div className="w-[90%] bg-white shadow-lg rounded-2xl p-6 space-y-5">
        <h2 className="text-2xl font-bold text-center">Available Services</h2>

        {/* Search bar */}
        <input
          name="search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search services by title, description, or location..."
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Services list */}
        <div className="flex flex-wrap gap-6 justify-center">
          {filteredServices.length === 0 ? (
            <p className="text-gray-500 text-center w-full">
              No matching services found.
            </p>
          ) : (
            filteredServices.map((service) => (
              <div
                key={service.id}
                onClick={() => handleOpen(service)}
                className="cursor-pointer w-[280px] border rounded-xl p-4 shadow-sm bg-white hover:shadow-lg hover:-translate-y-1 transition"
              >
                <h3 className="font-semibold text-lg">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
                <p className="text-sm text-gray-500">📍 {service.location}</p>
                <p className="text-sm text-gray-500">📞 {service.phoneNumber}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ✅ Popup with blurred background */}
      {selectedService && (
        <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm bg-white/30">
          <div className="bg-white w-[90%] sm:w-[400px] p-6 rounded-2xl shadow-2xl relative">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-3 text-gray-600 text-xl hover:text-black"
            >
              ✕
            </button>

            {/* Modal content */}
            <div className="flex flex-col items-center gap-3 text-center">
              <img
                src={selectedService.provider?.profilePic}
                alt="Provider"
                className="w-20 h-20 rounded-full border object-cover shadow"
              />
              <h3 className="text-xl font-bold">{selectedService.title}</h3>
              <p className="text-gray-600">{selectedService.description}</p>
              <p className="text-gray-500">📍 {selectedService.location}</p>
              <p className="text-gray-500">📞 {selectedService.phoneNumber}</p>
              <p className="text-gray-700 font-semibold">
                👤 {selectedService.provider?.name}
              </p>

              <a
                href={`https://wa.me/${selectedService.phoneNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Contact via WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
