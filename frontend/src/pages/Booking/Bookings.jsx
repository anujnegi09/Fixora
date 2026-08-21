import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import {
  getMyBookings,
  getBookingsForMyServices,
  requestCompletion,
  getBookingById,
  deleteBooking,
} from "../../features/bookings/bookingThunks";

import {
  selectMyBookings,
  selectServiceBookings,
  selectBooking,
  selectBookingLoading,
  selectBookingError,
  selectUpdateBookingLoading,
  selectDeleteBookingLoading,
} from "../../features/bookings/bookingSelectors";

import BookingTabs from "../../components/booking/BookingTabs";
import BookingCard from "../../components/booking/BookingCard";
import OtpVerificationModal from "../../components/booking/OtpVerificationModal";
import BookingDetailModal from "../../components/booking/BookingDetailModal";
import UpdateBookingModal from "../../components/booking/UpdateBookingModal";
import DeleteBookingModal from "../../components/booking/DeleteBookingModal";

const Bookings = () => {
  const dispatch = useDispatch();


  // ==========================================
  // UI STATE
  // ==========================================

  const [activeTab, setActiveTab] = useState("my-bookings");
  const [searchParams] = useSearchParams();

  const [selectedBooking, setSelectedBooking] = useState(null);

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // ==========================================
  // REDUX STATE
  // ==========================================

  const myBookings = useSelector(selectMyBookings);
  const serviceBookings = useSelector(selectServiceBookings);

  const booking = useSelector(selectBooking);

  const loading = useSelector(selectBookingLoading);
  const error = useSelector(selectBookingError);

  const updateBookingLoading = useSelector(
    selectUpdateBookingLoading
  );

  const deleteBookingLoading = useSelector(
    selectDeleteBookingLoading
  );

  // ==========================================
  // FETCH BOOKINGS
  // ==========================================

  useEffect(() => {
    dispatch(getMyBookings());
    dispatch(getBookingsForMyServices());
  }, [dispatch]);

  // ==========================================
  // VIEW BOOKING
  // ==========================================

  const handleViewBooking = async (booking) => {
    try {
      setSelectedBooking(booking);

      await dispatch(
        getBookingById(booking._id)
      ).unwrap();

      setShowDetailModal(true);
    } catch (error) {
      console.error("Failed to fetch booking:", error);
    }
  };

  // ==========================================
  // UPDATE BOOKING
  // ==========================================

  const handleUpdateBooking = async (booking) => {
    try {
      setSelectedBooking(booking);

      await dispatch(
        getBookingById(booking._id)
      ).unwrap();

      setShowUpdateModal(true);
    } catch (error) {
      console.error("Failed to fetch booking:", error);
    }
  };

  // ==========================================
  // DELETE BOOKING
  // ==========================================

  const handleDeleteBooking = (booking) => {
    setSelectedBooking(booking);
    setShowDeleteModal(true);
  };

  // ==========================================
  // CONFIRM DELETE
  // ==========================================

  const handleConfirmDelete = async () => {
    if (!selectedBooking?._id) return;

    try {
      await dispatch(
        deleteBooking(selectedBooking._id)
      ).unwrap();

      // Close modal
      setShowDeleteModal(false);
      setSelectedBooking(null);

      // Refresh bookings
      dispatch(getMyBookings());
      dispatch(getBookingsForMyServices());
    } catch (error) {
      console.error("Failed to delete booking:", error);
    }
  };

  // ==========================================
  // COMPLETE BOOKING
  // ==========================================

  const handleCompleteBooking = async (booking) => {
    try {
      await dispatch(
        requestCompletion(booking._id)
      ).unwrap();

      setSelectedBooking(booking);
      setShowOtpModal(true);
    } catch (error) {
      console.error(
        "Failed to request completion:",
        error
      );
    }
  };

  // ==========================================
  // AFTER UPDATE
  // ==========================================

  const handleBookingUpdated = () => {
    setShowUpdateModal(false);
    setSelectedBooking(null);

    // Refresh both lists
    dispatch(getMyBookings());
    dispatch(getBookingsForMyServices());
  };

  // ==========================================
  // CURRENT BOOKINGS
  // ==========================================

  const bookings =
    activeTab === "my-bookings"
      ? myBookings
      : serviceBookings;

// ==========================================
  // for redirect user between tabs from notification page
  // ==========================================
  useEffect(() => {
  const tab = searchParams.get("tab");

  if (tab === "my-bookings" || tab === "service-bookings") {
    setActiveTab(tab);
  }
}, [searchParams]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-28">

      {/* ======================================
          PAGE HEADER
      ====================================== */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Bookings
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your bookings and service requests.
        </p>
      </div>

      {/* ======================================
          BOOKING TABS
      ====================================== */}

      <BookingTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* ======================================
          LOADING
      ====================================== */}

      {loading && (
        <div className="py-16 text-center">
          <p className="text-lg font-medium text-blue-600">
            Loading bookings...
          </p>
        </div>
      )}

      {/* ======================================
          ERROR
      ====================================== */}

      {!loading && error && (
        <div className="rounded-lg bg-red-50 p-4 text-center text-red-600">
          {error}
        </div>
      )}

      {/* ======================================
          EMPTY STATE
      ====================================== */}

      {!loading &&
        !error &&
        bookings.length === 0 && (
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

      {/* ======================================
          BOOKING LIST
      ====================================== */}

      {!loading &&
        !error &&
        bookings.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {bookings.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                type={activeTab}

                onCompleteBooking={
                  handleCompleteBooking
                }

                onViewBooking={
                  handleViewBooking
                }

                onUpdateBooking={
                  handleUpdateBooking
                }

                onDeleteBooking={
                  handleDeleteBooking
                }
              />
            ))}

          </div>
        )}

      {/* ======================================
          OTP VERIFICATION MODAL
      ====================================== */}

      {showOtpModal && selectedBooking && (
        <OtpVerificationModal
          bookingId={selectedBooking._id}

          onCancel={() => {
            setShowOtpModal(false);
            setSelectedBooking(null);
          }}

          onVerified={() => {
            setShowOtpModal(false);
            setSelectedBooking(null);

            // Refresh booking lists
            dispatch(getMyBookings());
            dispatch(getBookingsForMyServices());
          }}
        />
      )}

      {/* ======================================
          BOOKING DETAIL MODAL
      ====================================== */}

      {showDetailModal && (
        <BookingDetailModal
          booking={booking || selectedBooking}
          loading={loading}

          onClose={() => {
            setShowDetailModal(false);
            setSelectedBooking(null);
          }}

          onUpdate={() => {
            setShowDetailModal(false);

            if (booking || selectedBooking) {
              setSelectedBooking(
                booking || selectedBooking
              );
            }

            setShowUpdateModal(true);
          }}
        />
      )}

      {/* ======================================
          UPDATE BOOKING MODAL
      ====================================== */}

      {showUpdateModal && (
        <UpdateBookingModal
          booking={booking || selectedBooking}
          loading={updateBookingLoading}

          onClose={() => {
            setShowUpdateModal(false);
            setSelectedBooking(null);
          }}

          onUpdated={handleBookingUpdated}
        />
      )}

      {/* ======================================
          DELETE BOOKING MODAL
      ====================================== */}

      {showDeleteModal && selectedBooking && (
        <DeleteBookingModal
          booking={selectedBooking}
          loading={deleteBookingLoading}

          onClose={() => {
            setShowDeleteModal(false);
            setSelectedBooking(null);
          }}

          onConfirm={handleConfirmDelete}
        />
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
//   requestCompletion,
//   getBookingById,
//   updateBookingDetails,
//   deleteBooking,
// } from "../../features/bookings/bookingThunks";

// import {
//   selectMyBookings,
//   selectServiceBookings,
//   selectBooking,
//   selectBookingLoading,
//   selectBookingError,
//   selectUpdateBookingLoading,
//   selectDeleteBookingLoading
// } from "../../features/bookings/bookingSelectors";

// import BookingTabs from "../../components/booking/BookingTabs";
// import BookingCard from "../../components/booking/BookingCard";
// import OtpVerificationModal from "../../components/booking/OtpVerificationModal";
// import BookingDetailModal from "../../components/booking/BookingDetailModal";
// import UpdateBookingModal from "../../components/booking/UpdateBookingModal";
// import DeleteBookingModal from "../../components/booking/DeleteBookingModal";

// const Bookings = () => {
//   const dispatch = useDispatch();

//   // Active tab (controlled by BookingTabs)
//   const [activeTab, setActiveTab] = useState("my-bookings");
//   const [showOtpModal, setShowOtpModal] = useState(false);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [showDetailModal, setShowDetailModal] = useState(false);
//  const [showUpdateModal, setShowUpdateModal] = useState(false);
// const [showDeleteModal, setShowDeleteModal] = useState(false);

//   const booking = useSelector(selectBooking);
//   const myBookings = useSelector(selectMyBookings);
//   const serviceBookings = useSelector(selectServiceBookings);
//   const loading = useSelector(selectBookingLoading);
//   const error = useSelector(selectBookingError);
 

//   useEffect(() => {
//     dispatch(getMyBookings());
//     dispatch(getBookingsForMyServices());
//   }, [dispatch]);

//   const handleViewBooking = async (booking) => {
//   try {
//     setSelectedBooking(booking);

//     await dispatch(
//       getBookingById(booking._id)
//     ).unwrap();

//     setShowDetailModal(true);
//   } catch (error) {
//     console.error("Failed to fetch booking:", error);
//   }
// };

// const handleUpdateBooking = async (booking) => {
//   try {
//     setSelectedBooking(booking);

//     await dispatch(
//       getBookingById(booking._id)
//     ).unwrap();

//     setShowUpdateModal(true);
//   } catch (error) {
//     console.error("Failed to fetch booking:", error);
//   }
// };

// const handleDeleteBooking = (booking) => {
//   setSelectedBooking(booking);
//   setShowDeleteModal(true);
// };

//   const handleCompleteBooking = async (booking) => {
//     try {
//       // Request OTP from backend
//       await dispatch(requestCompletion(booking._id)).unwrap();

//       // Store the booking whose OTP we are verifying
//       setSelectedBooking(booking);

//       // Open OTP modal
//       setShowOtpModal(true);
//     } catch (error) {
//       console.error("Failed to request completion:", error);
//     }
//   };

//   const bookings = activeTab === "my-bookings" ? myBookings : serviceBookings;

//   return (
//     <div className="mx-auto max-w-7xl px-5 py-28">
//       {/* Page Header */}
//       <div className="mb-8">
//         <h1 className="text-4xl font-bold text-gray-800">Bookings</h1>
//         <p className="mt-2 text-gray-500">
//           Manage your bookings and service requests.
//         </p>
//       </div>

//       {/* Booking Tabs */}
//       <BookingTabs activeTab={activeTab} setActiveTab={setActiveTab} />

//       {/* Loading */}
//       {loading && (
//         <div className="py-16 text-center">
//           <p className="text-lg font-medium text-blue-600">
//             Loading bookings...
//           </p>
//         </div>
//       )}

//       {/* Error */}
//       {!loading && error && (
//         <div className="rounded-lg bg-red-50 p-4 text-center text-red-600">
//           {error}
//         </div>
//       )}

//       {/* Empty State */}
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

//       {/* Booking List */}
//       {!loading && !error && bookings.length > 0 && (
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {bookings.map((booking) => (
//             <BookingCard
//               key={booking._id}
//               booking={booking}
//               type={activeTab}
//               onCompleteBooking={handleCompleteBooking}
//                 onViewBooking={handleViewBooking}
//   onUpdateBooking={handleUpdateBooking}
//   onDeleteBooking={handleDeleteBooking}
//             />
//           ))}
//         </div>
//       )}
//       {showOtpModal && selectedBooking && (
//         <OtpVerificationModal
//           bookingId={selectedBooking._id}
//           onCancel={() => {
//             setShowOtpModal(false);
//             setSelectedBooking(null);
//           }}
//           onVerified={() => {
//             setShowOtpModal(false);
//             setSelectedBooking(null);
//           }}
//         />
//       )}
//       {showDetailModal && (
//   <BookingDetailModal
//     booking={booking}
//     loading={bookingLoading}
//     onClose={() => {
//       setShowDetailModal(false);
//       setSelectedBookingId(null);
//     }}
//     onUpdate={() => {
//       setShowDetailModal(false);

//       if (booking) {
//         setEditingBooking(booking);
//       }

//       setShowUpdateModal(true);
//     }}
//   />
// )}
// {showUpdateModal && (
//   <UpdateBookingModal
//     booking={editingBooking}
//     loading={updateBookingLoading}
//     onClose={() => {
//       setShowUpdateModal(false);
//       setEditingBooking(null);
//     }}
//   />
// )}
// {showDeleteModal && (
//   <DeleteBookingModal
//     booking={deletingBooking}
//     loading={deleteBookingLoading}
//     onClose={() => {
//       setShowDeleteModal(false);
//       setDeletingBooking(null);
//     }}
//     onConfirm={handleConfirmDelete}
//   />
// )}
//     </div>
//   );
// };

// export default Bookings;

//////////////////////////////////////////////////////////////////////////////////

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
