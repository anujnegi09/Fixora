import { useDispatch, useSelector } from "react-redux";
import {
  FaExclamationTriangle,
  FaTrash,
  FaTimes,
} from "react-icons/fa";

import {
  deleteBooking,
} from "../../features/bookings/bookingThunks";

import {
  selectDeleteBookingLoading,
  selectBookingError,
} from "../../features/bookings/bookingSelectors";

const DeleteBookingModal = ({
  booking,
  onClose,
}) => {
  const dispatch = useDispatch();

  const deleteLoading = useSelector(
    selectDeleteBookingLoading
  );

  const error = useSelector(
    selectBookingError
  );

  if (!booking) return null;

  const handleDelete = async () => {
    try {
      await dispatch(
        deleteBooking(booking._id)
      ).unwrap();

      onClose();

    } catch (error) {
      console.error(
        "Failed to delete booking:",
        error
      );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header */}

        <div className="flex items-center justify-between border-b border-gray-100 p-5">
          <h2 className="text-lg font-bold text-gray-800">
            Delete Booking
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={deleteLoading}
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 disabled:opacity-50"
          >
            <FaTimes />
          </button>
        </div>

        {/* Content */}

        <div className="p-6">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
            <FaExclamationTriangle size={22} />
          </div>

          <div className="mt-5 text-center">

            <h3 className="text-lg font-semibold text-gray-800">
              Delete this booking?
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Are you sure you want to delete your booking //for{" "}
              <span className="font-semibold text-gray-700">
                {booking.serviceId?.title ||
                  booking.service?.title ||
                  "this service"}
              </span>
              ?
            </p>

            <p className="mt-2 text-xs text-gray-400">
              This action cannot be undone.
            </p>

          </div>

          {/* Error */}

          {error && (
            <div className="mt-5 rounded-lg bg-red-50 p-3 text-center text-sm text-red-600">
              {error}
            </div>
          )}

        </div>

        {/* Actions */}

        <div className="flex gap-3 border-t border-gray-100 bg-gray-50 p-4">

          <button
            type="button"
            onClick={onClose}
            disabled={deleteLoading}
            className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleteLoading}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FaTrash size={13} />

            {deleteLoading
              ? "Deleting..."
              : "Delete"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default DeleteBookingModal;