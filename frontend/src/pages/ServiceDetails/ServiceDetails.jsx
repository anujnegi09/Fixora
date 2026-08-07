import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaPhone,
  FaStar,
  FaUser,
  FaCalendarAlt,
  FaRupeeSign,
} from "react-icons/fa";

import { getServiceById } from "../../features/services/serviceThunks";
import {
  selectService,
  selectServiceLoading,
  selectServiceError,
} from "../../features/services/serviceSelectors";

const ServiceDetails = () => {
  const { serviceId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const service = useSelector(selectService);
  const loading = useSelector(selectServiceLoading);
  const error = useSelector(selectServiceError);

  useEffect(() => {
    if (serviceId) {
      dispatch(getServiceById(serviceId));
    }
  }, [dispatch, serviceId]);

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">
          Loading service...
        </p>
      </div>
    );
  }

  // ================= ERROR =================

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5">

        <h2 className="text-2xl font-semibold text-red-500">
          Unable to load service
        </h2>

        <p className="text-gray-500 mt-2">
          {error}
        </p>

        <button
          onClick={() => navigate("/services")}
          className="mt-5 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Services
        </button>

      </div>
    );
  }

  // ================= SERVICE NOT FOUND =================

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">

        <h2 className="text-2xl font-semibold">
          Service not found
        </h2>

        <button
          onClick={() => navigate("/services")}
          className="mt-5 px-5 py-2 bg-blue-600 text-white rounded-lg"
        >
          Back to Services
        </button>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-5 py-10">

      <div className="max-w-5xl mx-auto">

        {/* ================= BACK BUTTON ================= */}

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6"
        >
          <FaArrowLeft />
          Back
        </button>

        {/* ================= MAIN CARD ================= */}

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">

          {/* ================= HEADER ================= */}

          <div className="p-7 border-b">

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">

              <div>

                {/* Category */}

                <span className="inline-block px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 font-medium">
                  {service.category}
                </span>

                {/* Title */}

                <h1 className="text-3xl font-bold text-gray-900 mt-4">
                  {service.title}
                </h1>

                {/* Location */}

                <div className="flex items-center gap-2 text-gray-500 mt-3">
                  <FaMapMarkerAlt />
                  <span>
                    {service.location}
                  </span>
                </div>

              </div>

              {/* Price */}

              <div className="text-right">

                <p className="text-sm text-gray-500">
                  Service Price
                </p>

                <div className="flex items-center justify-end text-2xl font-bold text-blue-600 mt-1">
                  <FaRupeeSign size={18} />
                  {service.price}
                </div>

              </div>

            </div>

          </div>

          {/* ================= CONTENT ================= */}

          <div className="p-7 grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* ================= DESCRIPTION ================= */}

            <div className="md:col-span-2">

              <h2 className="text-xl font-semibold mb-3">
                About this service
              </h2>

              <p className="text-gray-600 leading-7">
                {service.description}
              </p>

              {/* Rating */}

              <div className="mt-7">

                <h2 className="text-xl font-semibold mb-3">
                  Rating
                </h2>

                <div className="flex items-center gap-2">

                  <FaStar className="text-yellow-400" />

                  <span className="font-semibold">
                    {service.rating ?? 0}
                  </span>

                  <span className="text-gray-500">
                    / 5
                  </span>

                </div>

              </div>

              {/* Availability */}

              <div className="mt-7">

                <h2 className="text-xl font-semibold mb-3">
                  Availability
                </h2>

                {service.availability?.days?.length > 0 ? (

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

                    {service.availability.days.map((day) => (

                      <div
                        key={day.day}
                        className={`flex items-center gap-2 p-3 rounded-lg border ${
                          day.available
                            ? "bg-green-50 border-green-200 text-green-700"
                            : "bg-gray-50 border-gray-200 text-gray-400"
                        }`}
                      >

                        <FaCalendarAlt size={14} />

                        <span className="text-sm">
                          {day.day}
                        </span>

                      </div>

                    ))}

                  </div>

                ) : (

                  <p className="text-gray-500">
                    Availability information not provided.
                  </p>

                )}

              </div>

            </div>

            {/* ================= PROVIDER ================= */}

            <div>

              <div className="border rounded-xl p-5">

                <h2 className="text-lg font-semibold mb-5">
                  Service Provider
                </h2>

                <div className="flex items-center gap-3">

                  {service.provider?.profilePhoto ? (

                    <img
                      src={service.provider.profilePhoto}
                      alt="Provider"
                      className="w-14 h-14 rounded-full object-cover"
                    />

                  ) : (

                    <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
                      <FaUser
                        className="text-gray-500"
                        size={22}
                      />
                    </div>

                  )}

                  <div>

                    <p className="font-semibold text-gray-900">
                      {service.provider?.fullName ||
                        service.providerName ||
                        "Provider"}
                    </p>

                    <p className="text-sm text-gray-500">
                      Service Provider
                    </p>

                  </div>

                </div>

                {/* Phone */}

                {service.phoneNumber && (

                  <div className="flex items-center gap-3 mt-5 text-gray-600">

                    <FaPhone />

                    <span>
                      {service.phoneNumber}
                    </span>

                  </div>

                )}

              </div>

              {/* Book Service */}

              <Link
                to={`/book-service/${service._id}`}
                className="mt-5 w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Book Service
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ServiceDetails;