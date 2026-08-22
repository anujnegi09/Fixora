import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaStar,
  FaCalendarAlt,
  FaBolt,
} from "react-icons/fa";
import Button from "../common/Button";

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  if (!service) return null;

  // ==============================
  // Booking Options
  // ==============================

  const bookingOptions = service.bookingOptions || [];

  const supportsInstant = bookingOptions.includes("instant");
  const supportsScheduled = bookingOptions.includes("scheduled");

  // ==============================
  // Available Days
  // ==============================

  const availableDays =
    service.availability?.days
      ?.filter((day) => day.available)
      .map((day) => day.day) || [];

  // ==============================
  // Book Now
  // ==============================

  const handleBookNow = () => {
    navigate(`/booking/${service._id}`);
  };

  return (
    <div
    className="
    flex
    min-h-[640px]
    flex-col
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
      "
    >
      {/* ==========================
          HEADER
      =========================== */}

      <div className="relative border-b border-gray-100 px-5 py-6 pb-3">

        {/* Category */}

        <span
          className="
            absolute
            right-3
            top-3
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
          {service.category || "Service"}
        </span>

        {/* Service Name */}

        <h2 className="mt-3 pr-20 text-xl font-bold text-gray-800">
          {service.title}
        </h2>
      </div>

      {/* ==========================
          PROVIDER
      =========================== */}

      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-2">

        <p className="text-lg font-semibold text-gray-800">
          {service.userId?.fullName || "Service Provider"}
        </p>

        <img
          src={
            service.userId?.avatar ||
            "/default-avatar-profile.png"
          }
          alt={service.userId?.fullName || "Provider"}
          className="
            h-14
            w-14
            rounded-full
            border
            border-gray-200
            object-cover
          "
        />
      </div>

      {/* ==========================
          SERVICE INFORMATION
      =========================== */}

      <div className="flex-1 space-y-4 p-5">

        {/* Rating */}

        <div className="flex items-center gap-2">

          <FaStar className="text-yellow-500" />

          <span className="font-medium text-gray-700">
            {service.averageRating?.toFixed(1) || "0.0"}
          </span>

          <span className="text-sm text-gray-500">
            ({service.totalReviews || 0} Reviews)
          </span>
        </div>

        {/* Description */}

        {service.description && (
          <p className="h-6 overflow-hidden text-ellipsis line-clamp-1 text-sm leading-6 text-gray-600">
            {service.description}
          </p>
        )}

        {/* ==========================
            BOOKING OPTIONS
        =========================== */}

        {(supportsInstant || supportsScheduled) && (
          <div className="border-t border-gray-100 pt-3">

            <p className="mb-2 text-xs font-medium text-gray-500">
              Booking
            </p>

            {/* <div className="flex flex-wrap gap-2"> */}
            <div className="flex items-center gap-2 whitespace-nowrap">

              {supportsInstant && (
                <span
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    bg-green-50
                    px-3
                    py-1.5
                    text-xs
                    font-semibold
                    text-green-700
                  "
                >
                  <FaBolt />
                  Instant Booking
                </span>
              )}

              {supportsScheduled && (
                <span
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    bg-blue-50
                    px-3
                    py-1.5
                    text-xs
                    font-semibold
                    text-blue-700
                  "
                >
                  <FaCalendarAlt />
                  Scheduled Booking
                </span>
              )}
            </div>
          </div>
        )}

        {/* ==========================
            PRICE
        =========================== */}

        <div className="flex items-center justify-between border-t border-gray-100 pt-3">

          <div>
            <p className="text-xs text-gray-500">
              Price
            </p>

            <p className="text-lg font-bold text-gray-800">
              ₹{service.price}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-500">
              Service Radius
            </p>

            <p className="font-semibold text-gray-700">
              {service.serviceRadius} km
            </p>
          </div>
        </div>

        {/* ==========================
            LOCATION
        =========================== */}

        <div className="flex items-start gap-3 border-t border-gray-100 pt-3">

          <FaMapMarkerAlt className="mt-1 shrink-0 text-red-500" />

          <div>
            <p className="text-sm font-medium text-gray-700">
              {service.location?.city},{" "}
              {service.location?.state}
            </p>

            {service.location?.address && (
              <p className="mt-1 line-clamp-1 text-xs text-gray-500">
                {service.location.address}
              </p>
            )}
          </div>
        </div>

        {/* ==========================
            AVAILABILITY
        =========================== */}

        {availableDays.length > 0 && (
          <div className="min-h-[60px] overflow-hidden border-t border-gray-100 pt-3">

            <p className="mb-2 text-xs font-medium text-gray-500">
              Available Days
            </p>

            <div className="flex flex-wrap gap-1.5">

              {availableDays.map((day) => (
                <span
                  key={day}
                  className="
                    rounded-full
                    bg-gray-100
                    px-2.5
                    py-1
                    text-xs
                    font-medium
                    text-gray-600
                  "
                >
                  {day.slice(0, 3)}
                </span>
              ))}

            </div>
          </div>
        )}
      </div>

      {/* ==========================
          BOOK NOW
      =========================== */}

      <div className="mt-auto shrink-0 border-t border-gray-100 bg-gray-50 p-4 h-[80px]">

        <Button
    type="button"
    variant="primary"
    size="sm"
    fullWidth
    onClick={handleBookNow}
    className="py-2.5 text-sm font-semibold shadow-sm hover:shadow-md active:scale-95"
  >
    Book Now
  </Button>

      </div>
    </div>
  );
};

export default ServiceCard;







// import { FaMapMarkerAlt, FaStar } from "react-icons/fa";

// const ServiceCard = ({ service, onViewDetails }) => {
//   return (
//     <div
//       className="
//         group
//         relative
//         overflow-hidden
//         rounded-2xl
//         border
//         border-gray-100
//         bg-white
//         shadow-sm
//         transition-all
//         duration-300
//         ease-out
//         hover:-translate-y-1
//         hover:shadow-xl
//         my-18
//       "
//     >
//       {/* Service Header */}
//       <div className="relative border-b border-gray-100 px-5 py-6">
//         {/* Category badge - top right */}
//         <span
//           className="
//             absolute
//             top-3
//             right-3
//             rounded-full
//             bg-blue-50
//             px-3
//             py-1
//             text-xs
//             font-semibold
//             uppercase
//             tracking-wide
//             text-blue-600
//           "
//         >
//           {service?.category || "Service"}
//         </span>

//         {/* Service Name */}
//         <h2 className="mt-3 pr-20 text-xl font-bold text-gray-800">
//           {service?.title}
//         </h2>
//       </div>

//       {/* Provider */}
//       <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3">
//         {/* Provider Name */}
//         <p className="text-lg font-semibold text-gray-800">
//           {service?.userId?.fullName || "Service Provider"}
//         </p>

//         {/* Provider Photo */}
//         <img
//           src={service?.userId?.avatar || "/default-avatar-profile.png"}
//           alt={service?.userId?.fullName || "Provider"}
//           className="h-16 w-16 rounded-full border border-gray-200 object-cover"
//         />
//       </div>

//       {/* Service Information */}
//       <div className="space-y-4 p-5">
//         {/* Rating */}
//         <div className="flex items-center gap-2">
//           <FaStar className="text-yellow-500" />
//           <span className="font-medium text-gray-700">
//             {service?.averageRating?.toFixed(1) || "0.0"}
//           </span>
//           <span className="text-sm text-gray-500">
//             ({service?.totalReviews || 0} Reviews)
//           </span>
//         </div>

//         {/* Price */}
//         <div className="flex items-center justify-between border-t border-gray-100 pt-3">
//           <div>
//             <p className="text-xs text-gray-500">Price</p>
//             <p className="text-lg font-bold text-gray-800">
//               ₹{service?.price}
//             </p>
//           </div>
//         </div>

//         {/* Location */}
//         <div className="flex items-start gap-3 border-t border-gray-100 pt-3 text-sm text-gray-600">
//           <FaMapMarkerAlt className="mt-1 shrink-0 text-red-500" />
//           <span>
//             {service?.location?.city}, {service?.location?.state}
//           </span>
//         </div>
//       </div>

//       {/* Action */}
//       <div className="border-t border-gray-100 bg-gray-50 p-4">
//         <button
//           type="button"
//           onClick={() => onViewDetails(service._id)}
//           className="
//             block
//             w-full
//             rounded-lg
//             bg-blue-600
//             px-4
//             py-2.5
//             text-center
//             text-sm
//             font-semibold
//             text-white
//             shadow-sm
//             transition-all
//             duration-200
//             hover:bg-blue-700
//             hover:shadow-md
//             active:scale-95
//           "
//         >
//           View Details
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ServiceCard;