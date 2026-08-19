import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaBolt,
  FaRupeeSign,
  FaCheckCircle,
  FaTrash,
  FaEdit,
} from "react-icons/fa";

import { updateBookingStatus } from "../../features/bookings/bookingThunks";

import Button from "../common/Button";
import defaultAvatar from "../../assets/default-avatar-profile.png";

const BookingCard = ({ booking,type,onCompleteBooking,onViewBooking,onUpdateBooking,onDeleteBooking,}) => {
  const dispatch = useDispatch();

  const [updatingBookingId, setUpdatingBookingId] = useState(null);

  if (!booking) {
    return null;
  }

  // ==========================================
  // Accept Booking
  // ==========================================

  const handleAccept = async () => {
    try {
      setUpdatingBookingId(booking._id);

      await dispatch(
        updateBookingStatus({
          bookingId: booking._id,
          status: "confirmed",
        })
      ).unwrap();
    } catch (error) {
      console.error("Failed to accept booking:", error);
    } finally {
      setUpdatingBookingId(null);
    }
  };

  // ==========================================
  // Reject Booking
  // ==========================================

  const handleReject = async () => {
    try {
      setUpdatingBookingId(booking._id);

      await dispatch(
        updateBookingStatus({
          bookingId: booking._id,
          status: "rejected",
        })
      ).unwrap();
    } catch (error) {
      console.error("Failed to reject booking:", error);
    } finally {
      setUpdatingBookingId(null);
    }
  };

  // ==========================================
  // Cancel Booking
  // ==========================================

  const handleCancel = async () => {
    try {
      setUpdatingBookingId(booking._id);

      await dispatch(
        updateBookingStatus({
          bookingId: booking._id,
          status: "cancelled",
        })
      ).unwrap();
    } catch (error) {
      console.error("Failed to cancel booking:", error);
    } finally {
      setUpdatingBookingId(null);
    }
  };

  // ==========================================
  // Complete Booking
  // ==========================================

  const handleCompleteBooking = () => {
    onCompleteBooking(booking);
  };

  // ==========================================
  // Determine Booking Type
  // ==========================================

  const isInstant = booking.bookingType === "instant";

  // ==========================================
  // Start Time
  // ==========================================

  const startTime = booking.startTime
    ? new Date(booking.startTime)
    : null;

  const formattedDate = startTime
    ? startTime.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Not available";

  const formattedTime = startTime
    ? startTime.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "Not available";

  // ==========================================
  // Status Styling
  // ==========================================

  const statusStyles = {
    pending: "bg-yellow-50 text-yellow-700",
    confirmed: "bg-green-50 text-green-700",
    completed: "bg-blue-50 text-blue-700",
    cancelled: "bg-red-50 text-red-700",
    rejected: "bg-red-50 text-red-700",
  };

  const statusClass =
    statusStyles[booking.status] || "bg-gray-100 text-gray-600";

  // ==========================================
  // Person
  // ==========================================

  const person =
    type === "my-bookings"
      ? booking.serviceOwner
      : booking.bookedBy;

  return (
    <div className="overflow-hidden mt-5 rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">

      {/* ======================================
          Header
      ====================================== */}

      <div className="border-b border-gray-100 p-5">
  <div className="flex items-start justify-between gap-3">

    {/* Service Information */}

    <div className="min-w-0">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        Service
      </p>

      <h2 className="mt-1 truncate text-lg font-bold text-gray-800">
        {booking.serviceId?.title ||
          booking.service?.title ||
          "Service"}
      </h2>
    </div>

    {/* Right Side */}

    <div className="flex shrink-0 items-center gap-2">

      {/* Edit */}

      {booking.status === "pending" && type === "my-bookings" && (
        <button
          type="button"
          onClick={() => onUpdateBooking(booking)}
          title="Edit booking"
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition hover:bg-gray-200 active:scale-95"
        >
          <FaEdit size={14} />
        </button>
      )}

      {/* Delete */}

      <button
        type="button"
        onClick={() => onDeleteBooking(booking)}
        // onClick={() => onDeleteBooking(booking._id)}
        title="Delete booking"
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-100 active:scale-95"
      >
        <FaTrash size={14} />
      </button>

      {/* Status */}

      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusClass}`}
      >
        {booking.status || "Pending"}
      </span>

    </div>

  </div>
</div>
      {/* <div className="border-b border-gray-100 p-5">
        <div className="flex items-start justify-between gap-3">

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Service
            </p>

            <h2 className="mt-1 text-lg font-bold text-gray-800">
              {booking.serviceId?.title ||
                booking.service?.title ||
                "Service"}
            </h2>
          </div>

          {/* Status */}

          {/* <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusClass}`}
          >
            {booking.status || "Pending"}
          </span>
        </div>
      </div> */} 

      {/* ======================================
          Booking Information
      ====================================== */}

      <div className="space-y-4 p-5">

        {/* Person */}

        <div className="flex items-center gap-3">

          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-gray-200 bg-gray-100">
            <img
              src={person?.avatar || defaultAvatar}
              alt={person?.fullName || "User"}
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <p className="text-xs text-gray-500">
              {type === "my-bookings"
                ? "Service Provider"
                : "Customer"}
            </p>

            <p className="font-medium text-gray-800">
              {person?.fullName ||
                person?.userName ||
                "Unknown User"}
            </p>
          </div>
        </div>

        {/* Booking Type */}

        <div className="flex items-center justify-between border-t border-gray-100 pt-4">

          <div className="flex items-center gap-2">

            {isInstant ? (
              <FaBolt className="text-yellow-500" />
            ) : (
              <FaCalendarAlt className="text-blue-500" />
            )}

            <div>
              <p className="text-xs text-gray-500">
                Booking Type
              </p>

              <p className="font-medium text-gray-700">
                {isInstant
                  ? "Instant Booking"
                  : "Scheduled Booking"}
              </p>
            </div>

          </div>
        </div>

        {/* Date & Time */}

        <div className="grid grid-cols-2 gap-3 border-t border-gray-100 pt-4">

          {/* Date */}

          <div className="flex items-center gap-2">

            <FaCalendarAlt className="shrink-0 text-gray-400" />

            <div>
              <p className="text-xs text-gray-500">
                Date
              </p>

              <p className="text-sm font-medium text-gray-700">
                {formattedDate}
              </p>
            </div>

          </div>

          {/* Time */}

          <div className="flex items-center gap-2">

            <FaClock className="shrink-0 text-gray-400" />

            <div>
              <p className="text-xs text-gray-500">
                Time
              </p>

              <p className="text-sm font-medium text-gray-700">
                {formattedTime}
              </p>
            </div>

          </div>

        </div>

        {/* Location */}

        {(booking.serviceId?.location ||
          booking.service?.location) && (
          <div className="flex items-start gap-3 border-t border-gray-100 pt-4">

            <FaMapMarkerAlt className="mt-1 shrink-0 text-red-500" />

            <div>
              <p className="text-xs text-gray-500">
                Location
              </p>

              <p className="text-sm font-medium text-gray-700">
                {(booking.serviceId?.location ||
                  booking.service?.location)?.city ||
                  "Unknown City"}
                {", "}
                {(booking.serviceId?.location ||
                  booking.service?.location)?.state ||
                  "Unknown State"}
              </p>
            </div>

          </div>
        )}

        {/* Price */}

        <div className="flex items-center justify-between border-t border-gray-100 pt-4">

          <div>
            <p className="text-xs text-gray-500">
              Price
            </p>

            <p className="flex items-center text-lg font-bold text-gray-800">
              <FaRupeeSign size={13} />

              {booking.price ||
                booking.serviceId?.price ||
                booking.service?.price ||
                0}
            </p>
          </div>

        </div>

      </div>

      {/* ======================================
          Actions
      ====================================== */}

      <div className="border-t border-gray-100 bg-gray-50 p-4">

        {type === "my-bookings" ? (

          /* ==================================
             My Bookings
          ================================== */

          <div className="grid grid-cols-2 gap-2">
            <Button
                type="button"
                variant="primary"
                size="md"
                fullWidth
                onClick={() => onViewBooking(booking)}
              >
                view more
              </Button>

            {["pending", "confirmed"].includes(
              booking.status
            ) && (
              <Button
                type="button"
                variant="dangerLight"
                size="sm"
                onClick={handleCancel}
                loading={
                  updatingBookingId === booking._id
                }
                loadingText="Cancelling..."
              >
                Cancel
              </Button>
            )}

          </div>

        ) : (

          /* ==================================
             Service Bookings
          ================================== */

          <div className="grid grid-cols-2 gap-2">

            {/* Pending */}

            {booking.status === "pending" && (
              <>
                <Button
                  type="button"
                  variant="success"
                  size="sm"
                  onClick={handleAccept}
                  loading={
                    updatingBookingId === booking._id
                  }
                  loadingText="Accepting..."
                >
                  Accept
                </Button>

                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  onClick={handleReject}
                  loading={
                    updatingBookingId === booking._id
                  }
                  loadingText="Updating..."
                >
                  Reject
                </Button>
              </>
            )}

            {/* Confirmed */}

            {booking.status === "confirmed" && (
              <Button
                type="button"
                variant="primary"
                size="md"
                fullWidth
                leftIcon={<FaCheckCircle />}
                onClick={handleCompleteBooking}
              >
                Complete
              </Button>
            )}

            {/* View Booking */}

            {booking.status !== "pending" && (
              <Button
                type="button"
                variant="primary"
                size="md"
                fullWidth
                onClick={() => onViewBooking(booking)}
              >
                view more
              </Button>
            )}

          </div>
        )}

      </div>

    </div>
  );
};

export default BookingCard;


// ### One important note
// I added `rejected` to `statusStyles` because your card can have a rejected status, and otherwise it falls back to gray:
// rejected: "bg-red-50 text-red-700",
// The **OTP modal is intentionally completely absent** from this component now. The next step is to modify your **`BookingsPage`** so it owns `selectedBooking`, `showOtpModal`, `requestCompletion()`, and the single `OtpVerificationModal`.






// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   FaCalendarAlt,
//   FaClock,
//   FaMapMarkerAlt,
//   FaBolt,
//   FaRupeeSign,
//   FaCheckCircle,
// } from "react-icons/fa";

// import {
//   updateBookingStatus,
//   requestCompletion,
// } from "../../features/bookings/bookingThunks";
// import {
//   selectBookingStatusLoading,
//   selectCompletionLoading,
// } from "../../features/bookings/bookingSelectors";

// import Button from "../common/Button";
// import defaultAvatar from "../../assets/default-avatar-profile.png";

// const BookingCard = ({ booking, type, onCompleteBooking }) => {
//   const dispatch = useDispatch();
//   const statusLoading = useSelector(selectBookingStatusLoading);
//   const completionLoading = useSelector(selectCompletionLoading);
//   const [updatingBookingId, setUpdatingBookingId] = useState(null);

//   if (!booking) {
//     return null;
//   }

//   const handleAccept = async () => {
//     try {
//       setUpdatingBookingId(booking._id);
//       await dispatch(
//         updateBookingStatus({
//           bookingId: booking._id,
//           status: "confirmed",
//         }),
//       ).unwrap();
//     } catch (error) {
//       console.error("Failed to accept booking:", error);
//     } finally {
//       setUpdatingBookingId(null);
//     }
//   };

//   const handleReject = async () => {
//     try {
//       setUpdatingBookingId(booking._id);
//       await dispatch(
//         updateBookingStatus({
//           bookingId: booking._id,
//           status: "rejected",
//         }),
//       ).unwrap();
//     } catch (error) {
//       console.error("Failed to reject booking:", error);
//     } finally {
//       setUpdatingBookingId(null);
//     }
//   };

//   // ADD HERE
//   const handleCancel = async () => {
//     try {
//       setUpdatingBookingId(booking._id);

//       await dispatch(
//         updateBookingStatus({
//           bookingId: booking._id,
//           status: "cancelled",
//         }),
//       ).unwrap();
//     } catch (error) {
//       console.error("Failed to cancel booking:", error);
//     } finally {
//       setUpdatingBookingId(null);
//     }
//   };

//   const handleCompleteBooking = () => {
//     onCompleteBooking(booking);
//   };

//   // ==========================================
//   // Determine booking type
//   // ==========================================

//   const isInstant = booking.bookingType === "instant";

//   // ==========================================
//   // Start Time
//   // ==========================================

//   const startTime = booking.startTime ? new Date(booking.startTime) : null;

//   const formattedDate = startTime
//     ? startTime.toLocaleDateString("en-IN", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       })
//     : "Not available";

//   const formattedTime = startTime
//     ? startTime.toLocaleTimeString("en-IN", {
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: true,
//       })
//     : "Not available";

//   // ==========================================
//   // Status Styling
//   // ==========================================

//   const statusStyles = {
//     pending: "bg-yellow-50 text-yellow-700",
//     confirmed: "bg-green-50 text-green-700",
//     completed: "bg-blue-50 text-blue-700",
//     cancelled: "bg-red-50 text-red-700",
//   };

//   const statusClass =
//     statusStyles[booking.status] || "bg-gray-100 text-gray-600";

//   // ==========================================
//   // Person
//   // ==========================================

//   const person =
//     type === "my-bookings" ? booking.serviceOwner : booking.bookedBy;

//   return (
//     <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
//       {/* ======================================
//           Header
//       ====================================== */}

//       <div className="border-b border-gray-100 p-5">
//         <div className="flex items-start justify-between gap-3">
//           <div>
//             <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
//               Service
//             </p>

//             <h2 className="mt-1 text-lg font-bold text-gray-800">
//               {booking.serviceId?.title || booking.service?.title || "Service"}
//             </h2>
//           </div>

//           {/* Status */}

//           <span
//             className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusClass}`}
//           >
//             {booking.status || "Pending"}
//           </span>
//         </div>
//       </div>

//       {/* ======================================
//           Booking Information
//       ====================================== */}

//       <div className="space-y-4 p-5">
//         {/* Person */}

//         <div className="flex items-center gap-3">
//           <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-gray-200 bg-gray-100">
//             <img
//               src={person?.avatar || defaultAvatar}
//               alt={person?.fullName || "User"}
//               className="h-full w-full object-cover"
//             />
//           </div>
//           {/* <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500">
//             <FaUser size={14} />
//           </div> */}

//           <div>
//             <p className="text-xs text-gray-500">
//               {type === "my-bookings" ? "Service Provider" : "Customer"}
//             </p>

//             <p className="font-medium text-gray-800">
//               {person?.fullName || person?.userName || "Unknown User"}
//             </p>
//           </div>
//         </div>

//         {/* Booking Type */}

//         <div className="flex items-center justify-between border-t border-gray-100 pt-4">
//           <div className="flex items-center gap-2">
//             {isInstant ? (
//               <FaBolt className="text-yellow-500" />
//             ) : (
//               <FaCalendarAlt className="text-blue-500" />
//             )}

//             <div>
//               <p className="text-xs text-gray-500">Booking Type</p>

//               <p className="font-medium text-gray-700">
//                 {isInstant ? "Instant Booking" : "Scheduled Booking"}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Date & Time */}

//         <div className="grid grid-cols-2 gap-3 border-t border-gray-100 pt-4">
//           {/* Date */}

//           <div className="flex items-center gap-2">
//             <FaCalendarAlt className="shrink-0 text-gray-400" />

//             <div>
//               <p className="text-xs text-gray-500">Date</p>

//               <p className="text-sm font-medium text-gray-700">
//                 {formattedDate}
//               </p>
//             </div>
//           </div>

//           {/* Time */}

//           <div className="flex items-center gap-2">
//             <FaClock className="shrink-0 text-gray-400" />

//             <div>
//               <p className="text-xs text-gray-500">Time</p>

//               <p className="text-sm font-medium text-gray-700">
//                 {formattedTime}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Location */}

//         {(booking.serviceId?.location || booking.service?.location) && (
//           <div className="flex items-start gap-3 border-t border-gray-100 pt-4">
//             <FaMapMarkerAlt className="mt-1 shrink-0 text-red-500" />

//             <div>
//               <p className="text-xs text-gray-500">Location</p>

//               <p className="text-sm font-medium text-gray-700">
//                 {(booking.serviceId?.location || booking.service?.location)
//                   ?.city || "Unknown City"}
//                 {", "}
//                 {(booking.serviceId?.location || booking.service?.location)
//                   ?.state || "Unknown State"}
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Price */}

//         <div className="flex items-center justify-between border-t border-gray-100 pt-4">
//           <div>
//             <p className="text-xs text-gray-500">Price</p>

//             <p className="flex items-center text-lg font-bold text-gray-800">
//               <FaRupeeSign size={13} />
//               {booking.price ||
//                 booking.serviceId?.price ||
//                 booking.service?.price ||
//                 0}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* ======================================
//           Actions
//       ====================================== */}

//       <div className="border-t border-gray-100 bg-gray-50 p-4">
//         {type === "my-bookings" ? (
//           <div className="grid grid-cols-2 gap-2">
//             <button
//               type="button"
//               className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-95"
//             >
//               View Booking
//             </button>

//             {["pending", "confirmed"].includes(booking.status) && (
//               <Button
//                 type="button"
//                 variant="dangerLight"
//                 size="sm"
//                 onClick={handleCancel}
//                 loading={updatingBookingId === booking._id}
//                 loadingText="Cancelling..."
//               >
//                 Cancel
//               </Button>
//               // <button
//               //   type="button"
//               //   onClick={handleCancel}
//               //   disabled={updatingBookingId === booking._id}
//               //   className="rounded-lg bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
//               // >
//               //   {updatingBookingId === booking._id
//               //     ? "Cancelling..."
//               //     : "Cancel Booking"}
//               // </button>
//             )}
//           </div>
//         ) : (
//           // <button
//           //   type="button"
//           //   className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-95"
//           // >
//           //   View Booking
//           // </button>
//           <div className="grid grid-cols-2 gap-2">
//             {booking.status === "pending" && (
//               <>
//                 <Button
//                   type="button"
//                   variant="success"
//                   size="sm"
//                   onClick={handleAccept}
//                   loading={updatingBookingId === booking._id}
//                   loadingText="Accepting..."
//                 >
//                   Accept
//                 </Button>

//                 <Button
//                   type="button"
//                   variant="danger"
//                   size="sm"
//                   onClick={handleReject}
//                   loading={updatingBookingId === booking._id}
//                   loadingText="Updating..."
//                 >
//                   Reject
//                 </Button>
//               </>
//             )}
//             {booking.status === "confirmed" && (
//               <Button
//                 type="button"
//                 variant="primary"
//                 size="md"
//                 fullWidth
//                 leftIcon={<FaCheckCircle />}
//                 onClick={handleCompleteBooking}
//               >
//                 Complete Booking
//               </Button>
//             )}

//             {booking.status !== "pending" && (
//               <button
//                 type="button"
//                 className="col-span-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-95"
//               >
//                 View Booking
//               </button>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookingCard;