import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  selectMyServices,
  selectServiceLoading,
  selectServiceError,
} from "../../features/services/serviceSelectors.js";

import { getMyServices } from "../../features/services/serviceThunks.js";

import EmptyState from "../../components/common/EmptyState.jsx";
import MyServiceCard from "../../components/service/MyServiceCard.jsx";

const BecomeProvider = () => {
  const dispatch = useDispatch();

  const myServices = useSelector(selectMyServices);
  const loading = useSelector(selectServiceLoading);
  const error = useSelector(selectServiceError);

  // Fetch user's services when page loads
  useEffect(() => {
    dispatch(getMyServices());
  }, [dispatch]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-28">
      {/* Heading */}

      <div className="mb-28 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#0F172A]">Become a Provider</h1>

          <p className="mt-2 text-gray-500">
            Manage all your services from one place.
          </p>
        </div>

        {/* Create Service */}

        <Link
          to="/create-service"
          className="
        inline-flex
        items-center
        gap-2
        rounded-lg
        bg-red-800
        px-5
        py-2.5
        text-sm
        font-semibold
        text-white
        shadow-md
        transition-all
        duration-200
        hover:bg-red-700
        hover:shadow-lg
        active:scale-95
        focus:outline-none
        focus:ring-2
        focus:ring-red-800
        focus:ring-offset-2
      "
        >
          <span className="text-lg">+</span>
          Create Service
        </Link>
      </div>

      {/* Loading */}

      {loading && (
        <div className="py-12 text-center">
          <p className="text-lg font-medium text-blue-600">
            Loading your services...
          </p>
        </div>
      )}

      {/* Error */}

      {!loading && error && (
        <div className="rounded-lg bg-red-50 p-4 text-center text-red-600">
          {error}
        </div>
      )}

      {/* Empty */}

      {!loading && !error && myServices.length === 0 && (
        <EmptyState
          title="No Services Yet"
          message="Create your first service and start receiving bookings."
          buttonText="Create Service"
        />
      )}

      {/* Services */}

      {!loading && myServices.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {myServices.map((service) => (
            <MyServiceCard key={service._id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BecomeProvider;



// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

// import {selectMyServices, selectServiceLoading} from "../../features/services/serviceSelectors.js";
// import {getMyServices } from "../../features/services/serviceThunks.js";
// import EmptyState from "../../components/common/EmptyState.jsx";
// import MyServiceCard from "../../components/service/MyServiceCard.jsx"

// const BecomeProvider = () => {
//   const myServices = useSelector(selectMyServices);

//   const loading = useSelector(selectServiceLoading);

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-10 mt-20">

//       {/* Heading */}

//       <div className="flex items-center justify-between mb-8">

//         <div>

//           <h1 className="text-4xl font-bold">
//             Become a Provider
//           </h1>

//           <p className="text-gray-500 mt-2">
//             Manage all your services from one place.
//           </p>

//         </div>

//         <Link
//   to="/create-service"
//   className="
//     inline-flex
//     items-center
//     gap-2
//     rounded-lg
//     bg-red-800
//     px-5
//     py-2.5
//     text-sm
//     font-semibold
//     shadow-md
//     transition-all
//     duration-200
//     hover:bg-white-700
//     hover:shadow-lg
//     active:scale-97
//     text-white
//     // focus:outline-none
//     // focus:ring-1
//     // focus:ring-black
//   "
// >
//   <span className="text-lg leading-none">+</span>
//   <span>Create Service</span>
// </Link>

//       </div>

//       {/* Loading */}

//       {loading && (
//         <p>Loading...</p>
//       )}

//       {/* Empty */}

//       {!loading &&
//         myServices.length === 0 && (
//           <EmptyState
//             title="No Services Yet"
//             message="Create your first service and start receiving bookings."
//             buttonText="Create Service"
//           />
//         )}

//       {/* Cards */}

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

//         {myServices.map((service) => (
//           <MyServiceCard
//             key={service._id}
//             service={service}
//           />
//         ))}

//       </div>

//     </div>
//   );
// };

// export default BecomeProvider;
