import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaStar, FaUser } from "react-icons/fa";

const ServiceCard = ({ service }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 hover:shadow-lg transition duration-300">

      {/* Service Name */}

      <h2 className="text-xl font-bold text-gray-800 mb-3">
        {service?.serviceName}
      </h2>

      {/* Category */}

      <div className="mb-2">
        <span className="font-semibold text-gray-700">
          Category:
        </span>{" "}
        <span className="text-gray-600">
          {service?.category}
        </span>
      </div>

      {/* Provider */}

      <div className="flex items-center gap-2 mb-2 text-gray-700">
        <FaUser />
        <span>{service?.providerName}</span>
      </div>

      {/* Rating */}

      <div className="flex items-center gap-2 mb-2">
        <FaStar className="text-yellow-500" />

        <span>
          {service?.averageRating?.toFixed(1) || "0.0"}
        </span>

        <span className="text-gray-500">
          ({service?.totalReviews || 0} Reviews)
        </span>
      </div>

      {/* Price */}

      <div className="mb-2">
        <span className="font-semibold">
          Price:
        </span>{" "}
        ₹{service?.price}
      </div>

      {/* City */}

      <div className="flex items-center gap-2 mb-5">
        <FaMapMarkerAlt className="text-red-500" />

        <span>
          {service?.city}
        </span>
      </div>

      {/* Button */}

      <Link
        to={`/services/${service?._id}`}
        className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        View Details
      </Link>

    </div>
  );
};

export default ServiceCard;