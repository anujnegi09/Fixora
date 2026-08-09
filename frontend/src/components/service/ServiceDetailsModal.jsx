import { useEffect } from "react";
import {
  FaTimes,
  FaMapMarkerAlt,
  FaPhone,
  FaRupeeSign,
  FaClock,
} from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";

import { getServiceById } from "../../features/services/serviceThunks";

import {
  selectService,
  selectServiceLoading,
  selectServiceError,
} from "../../features/services/serviceSelectors";

const ServiceDetailsModal = ({ serviceId, onClose, onBook }) => {
console.log("ServiceDetailsModal rendered");
console.log("serviceId:", serviceId);
  const dispatch = useDispatch();

  const service = useSelector(selectService);
  const loading = useSelector(selectServiceLoading);
  const error = useSelector(selectServiceError);

  // ==========================================
  // GET SERVICE DETAILS
  // ==========================================

  useEffect(() => {
    if (serviceId) {
      dispatch(getServiceById(serviceId));
    }
  }, [dispatch, serviceId]);

  // ==========================================
  // CLOSE ON ESC
  // ==========================================

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div
      className="
        fixed
        inset-0
        z-[999]
        flex
        items-center
        justify-center
        bg-black/50
        p-4
        backdrop-blur-sm
        scrollbar-hide
      "
      onClick={onClose}
    >
      <div
        className="
          relative
          max-h-[90vh]
          w-full
          max-w-2xl
          overflow-y-auto
          scrollbar-hide
          rounded-2xl
          bg-white
          shadow-2xl
         
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <div
          className="
            sticky
            top-0
            z-10
            flex
            items-center
            justify-between
            border-b
            bg-white
            px-6
            py-3
          "
        >
          <h2 className="text-xl font-bold text-gray-800">Service Details</h2>

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-full
              p-2
              text-gray-500
              transition
              hover:bg-gray-100
              hover:text-gray-800
            "
          >
            <FaTimes />
          </button>
        </div>

        {/* ================================= */}
        {/* CONTENT */}
        {/* ================================= */}

        <div className="px-8 py-5">
          {/* Loading */}

          {loading && (
            <div className="py-12 text-center">
              <p className="text-blue-600">Loading service details...</p>
            </div>
          )}

          {/* Error */}

          {!loading && error && (
            <div className="py-12 text-center">
              <p className="text-red-500">{error}</p>
            </div>
          )}

          {/* Service */}

          {!loading && !error && service && (
            <>
              {/* Category */}
              <div className="flex justify-end">
              <span
                className="
                  inline-block
                  rounded-full
                  bg-blue-50
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  text-blue-600
                "
              >
                {service.category || "Service"}
              </span>
              </div>

              {/* Title */}

              <h1
                className="
                  mt-3
                  text-2xl
                  font-bold
                  text-gray-800
                "
              >
                {service.title}
              </h1>

              {/* Description */}

              <div className="mt-2">
                <h3 className="text-sm font-semibold text-gray-500">
                  Description
                </h3>

                <p className="mt-2 leading-6 text-gray-700">
                  {service.description || "No description available."}
                </p>
              </div>

              {/* ================================= */}
              {/* SERVICE INFORMATION */}
              {/* ================================= */}

              <div
                className="
                  mt-6
                  grid
                  grid-cols-1
                  gap-4
                  sm:grid-cols-2
                "
              >
                {/* Price */}

                <div className="rounded-xl bg-gray-50 p-4">
                  <div className="flex items-center gap-2 text-gray-500">
                    <FaRupeeSign />

                    <span className="text-sm">Price</span>
                  </div>

                  <p className="mt-1 text-xl font-bold text-gray-800">
                    ₹{service.price}
                  </p>
                </div>

                {/* Radius */}

                <div className="rounded-xl bg-gray-50 p-4">
                  <div className="flex items-center gap-2 text-gray-500">
                    <FaMapMarkerAlt />

                    <span className="text-sm">Service Radius</span>
                  </div>

                  <p className="mt-1 text-xl font-bold text-gray-800">
                    {service.serviceRadius} km
                  </p>
                </div>
              </div>

              {/* ================================= */}
              {/* LOCATION */}
              {/* ================================= */}

              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-500">
                  Location
                </h3>

                <div className="mt-2 flex gap-3 rounded-xl bg-gray-50 p-4">
                  <FaMapMarkerAlt className="mt-1 shrink-0 text-red-500" />

                  <div>
                    <p className="font-medium text-gray-800">
                      {service.location?.city}
                      {service.location?.state && `, ${service.location.state}`}
                    </p>

                    <p className="mt-1 text-sm text-gray-600">
                      {service.location?.address}
                    </p>

                    {service.location?.pincode && (
                      <p className="mt-1 text-sm text-gray-500">
                        Pincode: {service.location.pincode}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* ================================= */}
              {/* PHONE */}
              {/* ================================= */}

              {service.phoneNumber && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-gray-500">
                    Contact
                  </h3>

                  <div className="mt-2 flex items-center gap-3">
                    <FaPhone className="text-green-600" />

                    <span className="text-gray-700">{service.phoneNumber}</span>
                  </div>
                </div>
              )}

              {/* ================================= */}
              {/* AVAILABILITY */}
              {/* ================================= */}

              {service.availability?.days && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-gray-500">
                    Availability
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {service.availability.days
                      .filter((day) => day.available)
                      .map((day) => (
                        <span
                          key={day.day}
                          className="
                            rounded-full
                            bg-green-50
                            px-3
                            py-1
                            text-xs
                            font-medium
                            text-green-700
                          "
                        >
                          {day.day}
                        </span>
                      ))}
                  </div>
                </div>
              )}

              {/* ================================= */}
              {/* BOOK NOW */}
              {/* ================================= */}

              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="
                    w-1/2
                    rounded-xl
                    border
                    border-gray-300
                    py-3
                    font-medium
                    text-gray-700
                    transition
                    hover:bg-gray-50
                  "
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() => onBook(service)}
                  className="
                    w-1/2
                    rounded-xl
                    bg-blue-600
                    py-3
                    font-semibold
                    text-white
                    transition
                    hover:bg-blue-700
                  "
                >
                  Book Now
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsModal;
