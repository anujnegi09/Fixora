// import { Link } from "react-router-dom";
// import { FaMapMarkerAlt, FaStar, FaUser } from "react-icons/fa";

// const ServiceCard = ({ service }) => {
//   return (
//     <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 hover:shadow-lg transition duration-300">

//       {/* Service Name */}

//       <h2 className="text-xl font-bold text-gray-800 mb-3">
//         {service?.serviceName}
//       </h2>

//       {/* Category */}

//       <div className="mb-2">
//         <span className="font-semibold text-gray-700">
//           Category:
//         </span>{" "}
//         <span className="text-gray-600">
//           {service?.category}
//         </span>
//       </div>

//       {/* Provider */}

//       <div className="flex items-center gap-2 mb-2 text-gray-700">
//         <FaUser />
//         <span>{service?.providerName}</span>
//       </div>

//       {/* Rating */}

//       <div className="flex items-center gap-2 mb-2">
//         <FaStar className="text-yellow-500" />

//         <span>
//           {service?.averageRating?.toFixed(1) || "0.0"}
//         </span>

//         <span className="text-gray-500">
//           ({service?.totalReviews || 0} Reviews)
//         </span>
//       </div>

//       {/* Price */}

//       <div className="mb-2">
//         <span className="font-semibold">
//           Price:
//         </span>{" "}
//         ₹{service?.price}
//       </div>

//       {/* City */}

//       <div className="flex items-center gap-2 mb-5">
//         <FaMapMarkerAlt className="text-red-500" />

//         <span>
//           {service?.city}
//         </span>
//       </div>

//       {/* Button */}

//       <Link
//         to={`/services/${service?._id}`}
//         className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
//       >
//         View Details
//       </Link>

//     </div>
//   );
// };

// export default ServiceCard;






import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaStar, FaUser } from "react-icons/fa";

const ServiceCard = ({ service }) => {
  return (
    <div className="overflow-hidden my-25 rounded-xl border border-gray-100 bg-white shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">

      {/* Service Header */}
      <div className="border-b border-gray-100 p-5">

        <div className="flex items-start justify-between gap-4">

          <div>
            {/* Category */}
            <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
              {service?.category || "Service"}
            </span>

            {/* Service Name */}
            <h2 className="mt-3 text-xl font-bold text-gray-800">
              {service?.title}
            </h2>
          </div>

        </div>

         {/* Provider */}
        {/* <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
          <FaUser className="text-gray-400" />
          <span>{service?.userId.fullName}</span>
        </div>  */}

      </div> 

      {/* Provider */}
      {/* Provider */}
<div className="flex items-center justify-between border-t border-gray-100 px-5 py-3">

  {/* Provider Name */}
  <p className="text-lg font-semibold text-gray-800">
    {service?.userId?.fullName || "Service Provider"}
  </p>

  {/* Provider Photo */}
  <img
    src={
      service?.userId?.profilePhoto ||
      "/default-avatar-profile.png"
    }
    alt={service?.userId?.fullName || "Provider"}
    className="h-20 w-20 rounded-full border border-gray-200 object-cover"
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
            <p className="text-xs text-gray-500">
              Price
            </p>

            <p className="text-lg font-bold text-gray-800">
              ₹{service?.price}
            </p>
          </div>

        </div>
  

        {/* City */}
        <div className="flex items-start gap-3 border-t border-gray-100 pt-3 text-sm text-gray-600">

          <FaMapMarkerAlt className="mt-1 shrink-0 text-red-500" />

          <span>
            {service?.location?.address}, {service?.location?.city}, {service?.location?.state}
          </span>

        </div>

      </div>

      {/* Action */}
      <div className="border-t border-gray-100 bg-gray-50 p-4">

        <Link
          to={`/services/${service?._id}`}
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
        </Link>

      </div>

    </div>
  );
};

export default ServiceCard;

