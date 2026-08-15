import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getMyBookings,
  getBookingsForMyServices,
} from "../../features/bookings/bookingThunks";

import {
  selectMyBookings,
  selectServiceBookings,
  selectBookingLoading,
  selectBookingError,
} from "../../features/bookings/bookingSelectors";

import BookingTabs from "../../components/booking/BookingTabs";
import BookingCard from "../../components/booking/BookingCard";

const Bookings = () => {
  const dispatch = useDispatch();

  // Active tab (controlled by BookingTabs)
  const [activeTab, setActiveTab] = useState("my-bookings");

  const myBookings = useSelector(selectMyBookings);
  const serviceBookings = useSelector(selectServiceBookings);
  const loading = useSelector(selectBookingLoading);
  const error = useSelector(selectBookingError);

  useEffect(() => {
    dispatch(getMyBookings());
    dispatch(getBookingsForMyServices());
  }, [dispatch]);

  const bookings = activeTab === "my-bookings" ? myBookings : serviceBookings;

  return (
    <div className="mx-auto max-w-7xl px-5 py-28">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Bookings</h1>
        <p className="mt-2 text-gray-500">
          Manage your bookings and service requests.
        </p>
      </div>

      {/* Booking Tabs */}
      <BookingTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Loading */}
      {loading && (
        <div className="py-16 text-center">
          <p className="text-lg font-medium text-blue-600">
            Loading bookings...
          </p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-lg bg-red-50 p-4 text-center text-red-600">
          {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && bookings.length === 0 && (
        <div className="rounded-xl border border-gray-200 bg-white py-16 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">
            {activeTab === "my-bookings"
              ? "No Bookings Yet"
              : "No Service Bookings Yet"}
          </h2>

          <p className="mt-2 text-gray-500">
            {activeTab === "my-bookings"
              ? "You haven't booked any services yet."
              : "You haven't received any booking requests yet."}
          </p>
        </div>
      )}

      {/* Booking List */}
      {!loading && !error && bookings.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <BookingCard key={booking._id} booking={booking} type={activeTab} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   getMyBookings,
//   getBookingsForMyServices,
// } from "../../features/bookings/bookingThunks";

// import {
//   selectMyBookings,
//   selectServiceBookings,
//   selectBookingLoading,
//   selectBookingError,
// } from "../../features/bookings/bookingSelectors";

// import BookingTabs from "../../components/booking/BookingTabs"

// const Bookings = () => {
//   const dispatch = useDispatch();

//   // ===============================
//   // Active Tab
//   // ===============================

//   const [activeTab, setActiveTab] = useState("my-bookings");

//   // ===============================
//   // Redux
//   // ===============================

//   const myBookings = useSelector(selectMyBookings);
//   const serviceBookings = useSelector(selectServiceBookings);

//   const loading = useSelector(selectBookingLoading);
//   const error = useSelector(selectBookingError);

//   // ===============================
//   // Fetch Bookings
//   // ===============================

//   useEffect(() => {
//     dispatch(getMyBookings());
//     dispatch(getBookingsForMyServices());
//   }, [dispatch]);

//   // ===============================
//   // Current Bookings
//   // ===============================

//   const bookings =
//     activeTab === "my-bookings"
//       ? myBookings
//       : serviceBookings;

//   return (
//     <div className="mx-auto max-w-7xl px-5 py-28">

//       {/* =================================
//           Page Header
//       ================================= */}

//       <div className="mb-8">
//         <h1 className="text-4xl font-bold text-gray-800">
//           Bookings
//         </h1>

//         <p className="mt-2 text-gray-500">
//           Manage your bookings and service requests.
//         </p>
//       </div>

//       {/* =================================
//           Booking Navigation
//       ================================= */}

//       {/* <div className="mb-8 border-b border-gray-200">
//         <div className="flex gap-8">

//           {/* My Bookings */}

//           {/* <button
//             type="button"
//             onClick={() => setActiveTab("my-bookings")}
//             className={`relative pb-3 text-sm font-semibold transition ${
//               activeTab === "my-bookings"
//                 ? "text-blue-600"
//                 : "text-gray-500 hover:text-gray-800"
//             }`}
//           >
//             My Bookings

//             {activeTab === "my-bookings" && (
//               <span className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-600" />
//             )}
//           </button>

//           {/* Service Bookings */}

//           {/* <button
//             type="button"
//             onClick={() => setActiveTab("service-bookings")}
//             className={`relative pb-3 text-sm font-semibold transition ${
//               activeTab === "service-bookings"
//                 ? "text-blue-600"
//                 : "text-gray-500 hover:text-gray-800"
//             }`}
//           >
//             Service Bookings

//             {activeTab === "service-bookings" && (
//               <span className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-600" />
//             )}
//           </button>

//         </div> */}
//           {/* </div>  */}

//       <BookingTabs
//   activeTab={activeTab}
//   setActiveTab={setActiveTab}
// />

//       {/* =================================
//           Loading
//       ================================= */}

//       {loading && (
//         <div className="py-16 text-center">
//           <p className="text-lg font-medium text-blue-600">
//             Loading bookings...
//           </p>
//         </div>
//       )}

//       {/* =================================
//           Error
//       ================================= */}

//       {!loading && error && (
//         <div className="rounded-lg bg-red-50 p-4 text-center text-red-600">
//           {error}
//         </div>
//       )}

//       {/* =================================
//           Empty State
//       ================================= */}

//       {!loading && !error && bookings.length === 0 && (
//         <div className="rounded-xl border border-gray-200 bg-white py-16 text-center shadow-sm">

//           <h2 className="text-xl font-semibold text-gray-800">
//             {activeTab === "my-bookings"
//               ? "No Bookings Yet"
//               : "No Service Bookings Yet"}
//           </h2>

//           <p className="mt-2 text-gray-500">
//             {activeTab === "my-bookings"
//               ? "You haven't booked any services yet."
//               : "You haven't received any booking requests yet."}
//           </p>

//         </div>
//       )}

//       {/* =================================
//           Booking List
//           We'll add BookingCard here next
//       ================================= */}

//       {!loading && !error && bookings.length > 0 && (
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

//           {bookings.map((booking) => (
//             <div
//               key={booking._id}
//               className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
//             >
//               <p className="font-semibold text-gray-800">
//                 Booking
//               </p>

//               <p className="mt-2 text-sm text-gray-500">
//                 Booking ID: {booking._id}
//               </p>
//             </div>
//           ))}

//         </div>
//       )}

//     </div>
//   );
// };

// export default Bookings;
