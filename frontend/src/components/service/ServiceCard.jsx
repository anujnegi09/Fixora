import { FaMapMarkerAlt, FaStar } from "react-icons/fa";

const ServiceCard = ({ service, onViewDetails }) => {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-gray-100
        bg-white
        shadow-sm
        transition-all
        duration-300
        ease-out
        hover:-translate-y-1
        hover:shadow-xl
        my-18
      "
    >
      {/* Service Header */}
      <div className="relative border-b border-gray-100 px-5 py-6">
        {/* Category badge - top right */}
        <span
          className="
            absolute
            top-3
            right-3
            rounded-full
            bg-blue-50
            px-3
            py-1
            text-xs
            font-semibold
            uppercase
            tracking-wide
            text-blue-600
          "
        >
          {service?.category || "Service"}
        </span>

        {/* Service Name */}
        <h2 className="mt-3 pr-20 text-xl font-bold text-gray-800">
          {service?.title}
        </h2>
      </div>

      {/* Provider */}
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3">
        {/* Provider Name */}
        <p className="text-lg font-semibold text-gray-800">
          {service?.userId?.fullName || "Service Provider"}
        </p>

        {/* Provider Photo */}
        <img
          src={service?.userId?.avatar || "/default-avatar-profile.png"}
          alt={service?.userId?.fullName || "Provider"}
          className="h-16 w-16 rounded-full border border-gray-200 object-cover"
        />
      </div>

      {/* Service Information */}
      <div className="space-y-4 p-5">
        {/* Rating */}
        <div className="flex items-center gap-2">
          <FaStar className="text-yellow-500" />
          <span className="font-medium text-gray-700">
            {service?.averageRating?.toFixed(1) || "0.0"}
          </span>
          <span className="text-sm text-gray-500">
            ({service?.totalReviews || 0} Reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <div>
            <p className="text-xs text-gray-500">Price</p>
            <p className="text-lg font-bold text-gray-800">
              ₹{service?.price}
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-3 border-t border-gray-100 pt-3 text-sm text-gray-600">
          <FaMapMarkerAlt className="mt-1 shrink-0 text-red-500" />
          <span>
            {service?.location?.city}, {service?.location?.state}
          </span>
        </div>
      </div>

      {/* Action */}
      <div className="border-t border-gray-100 bg-gray-50 p-4">
        <button
          type="button"
          onClick={() => onViewDetails(service._id)}
          className="
            block
            w-full
            rounded-lg
            bg-blue-600
            px-4
            py-2.5
            text-center
            text-sm
            font-semibold
            text-white
            shadow-sm
            transition-all
            duration-200
            hover:bg-blue-700
            hover:shadow-md
            active:scale-95
          "
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;