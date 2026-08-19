import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaBolt,
  FaRupeeSign,
  FaTimes,
  FaUser,
} from "react-icons/fa";

import defaultAvatar from "../../assets/default-avatar-profile.png";

const BookingDetailModal = ({ booking, onClose }) => {
  if (!booking) return null;

  const isInstant = booking.bookingType === "instant";

  const startTime = booking.startTime
    ? new Date(booking.startTime)
    : null;

  const endTime = booking.endTime
    ? new Date(booking.endTime)
    : null;

  const formattedDate = startTime
    ? startTime.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Not available";

  const formattedStartTime = startTime
    ? startTime.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "Not available";

  const formattedEndTime = endTime
    ? endTime.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : null;

  const person =
    booking.bookedBy?.fullName
      ? booking.bookedBy
      : booking.serviceOwner;

  const location =
    booking.serviceId?.location ||
    booking.service?.location;

  const statusStyles = {
    pending: "bg-yellow-50 text-yellow-700",
    confirmed: "bg-green-50 text-green-700",
    completed: "bg-blue-50 text-blue-700",
    cancelled: "bg-red-50 text-red-700",
    rejected: "bg-red-50 text-red-700",
  };

  const statusClass =
    statusStyles[booking.status] ||
    "bg-gray-100 text-gray-600";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}

        <div className="flex items-start justify-between border-b border-gray-100 p-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Booking Details
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-800">
              {booking.serviceId?.title ||
                booking.service?.title ||
                "Service"}
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              Booking ID: {booking._id}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>

        {/* Body */}

        <div className="space-y-6 p-6">

          {/* Status */}

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">
              Status
            </span>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusClass}`}
            >
              {booking.status || "Pending"}
            </span>
          </div>

          {/* Person */}

          <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
            <p className="mb-3 text-sm font-semibold text-gray-700">
              {booking.bookedBy?.fullName
                ? "Customer"
                : "Service Provider"}
            </p>

            <div className="flex items-center gap-3">
              <div className="h-12 w-12 overflow-hidden rounded-full border border-gray-200 bg-white">
                <img
                  src={
                    person?.avatar ||
                    defaultAvatar
                  }
                  alt={
                    person?.fullName ||
                    "User"
                  }
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <p className="font-semibold text-gray-800">
                  {person?.fullName ||
                    person?.userName ||
                    "Unknown User"}
                </p>

                {person?.email && (
                  <p className="text-sm text-gray-500">
                    {person.email}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Booking Type */}

          <div className="grid gap-4 sm:grid-cols-2">

            <div className="flex items-center gap-3 rounded-xl border border-gray-100 p-4">
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

            <div className="flex items-center gap-3 rounded-xl border border-gray-100 p-4">
              <FaRupeeSign className="text-green-600" />

              <div>
                <p className="text-xs text-gray-500">
                  Price
                </p>

                <p className="font-semibold text-gray-800">
                  ₹
                  {booking.price ??
                    booking.serviceId?.price ??
                    booking.service?.price ??
                    0}
                </p>
              </div>
            </div>

          </div>

          {/* Date & Time */}

          <div className="rounded-xl border border-gray-100 p-4">
            <p className="mb-4 text-sm font-semibold text-gray-700">
              Schedule
            </p>

            <div className="grid gap-4 sm:grid-cols-2">

              <div className="flex items-center gap-3">
                <FaCalendarAlt className="text-gray-400" />

                <div>
                  <p className="text-xs text-gray-500">
                    Date
                  </p>

                  <p className="font-medium text-gray-700">
                    {formattedDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaClock className="text-gray-400" />

                <div>
                  <p className="text-xs text-gray-500">
                    Start Time
                  </p>

                  <p className="font-medium text-gray-700">
                    {formattedStartTime}
                  </p>
                </div>
              </div>

              {formattedEndTime && (
                <div className="flex items-center gap-3">
                  <FaClock className="text-gray-400" />

                  <div>
                    <p className="text-xs text-gray-500">
                      End Time
                    </p>

                    <p className="font-medium text-gray-700">
                      {formattedEndTime}
                    </p>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Location */}

          {location && (
            <div className="flex items-start gap-3 rounded-xl border border-gray-100 p-4">
              <FaMapMarkerAlt className="mt-1 text-red-500" />

              <div>
                <p className="text-xs text-gray-500">
                  Location
                </p>

                <p className="font-medium text-gray-700">
                  {location.city ||
                    "Unknown City"}
                  {location.state &&
                    `, ${location.state}`}
                </p>
              </div>
            </div>
          )}

          {/* Notes */}

          {booking.notes && (
            <div className="rounded-xl border border-gray-100 p-4">
              <p className="text-xs text-gray-500">
                Notes
              </p>

              <p className="mt-1 text-sm leading-6 text-gray-700">
                {booking.notes}
              </p>
            </div>
          )}

        </div>

        {/* Footer */}

        <div className="border-t border-gray-100 bg-gray-50 p-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg bg-gray-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-900"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailModal;