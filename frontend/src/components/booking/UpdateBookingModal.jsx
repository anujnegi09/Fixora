import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCalendarAlt, FaClock, FaTimes } from "react-icons/fa";

import {
  updateBookingDetails,
} from "../../features/bookings/bookingThunks";

import {
  selectUpdateBookingLoading,
  selectBookingError,
} from "../../features/bookings/bookingSelectors";

const UpdateBookingModal = ({ booking, onClose }) => {
  const dispatch = useDispatch();

  const updateLoading = useSelector(
    selectUpdateBookingLoading
  );

  const error = useSelector(selectBookingError);

  const [bookingType, setBookingType] = useState(
    booking?.bookingType || "scheduled"
  );

  const [startTime, setStartTime] = useState("");

  const [notes, setNotes] = useState(
    booking?.notes || ""
  );

  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (!booking) return;

    setBookingType(
      booking.bookingType || "scheduled"
    );

    setNotes(booking.notes || "");

    if (booking.startTime) {
      const date = new Date(booking.startTime);

      const year = date.getFullYear();
      const month = String(
        date.getMonth() + 1
      ).padStart(2, "0");
      const day = String(
        date.getDate()
      ).padStart(2, "0");

      const hours = String(
        date.getHours()
      ).padStart(2, "0");
      const minutes = String(
        date.getMinutes()
      ).padStart(2, "0");

      setStartTime(
        `${year}-${month}-${day}T${hours}:${minutes}`
      );
    }
  }, [booking]);

  if (!booking) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormError("");

    if (
      bookingType === "scheduled" &&
      !startTime
    ) {
      setFormError(
        "Please select a date and time."
      );
      return;
    }

    if (
      bookingType === "scheduled" &&
      new Date(startTime) <= new Date()
    ) {
      setFormError(
        "Booking time must be in the future."
      );
      return;
    }

    try {
      const data = {
        bookingType,
        notes: notes.trim(),
      };

      if (bookingType === "scheduled") {
        data.startTime = new Date(
          startTime
        ).toISOString();
      }

      await dispatch(
        updateBookingDetails({
          bookingId: booking._id,
          bookingData: data,
        })
      ).unwrap();

      onClose();

    } catch (error) {
      setFormError(
        error?.message ||
          "Failed to update booking."
      );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header */}

        <div className="flex items-center justify-between border-b border-gray-100 p-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Edit Booking
            </p>

            <h2 className="mt-1 text-xl font-bold text-gray-800">
              Update Booking
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
          >
            <FaTimes />
          </button>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >

          {/* Service */}

          <div>
            <label className="text-sm font-medium text-gray-700">
              Service
            </label>

            <div className="mt-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-600">
              {booking.serviceId?.title ||
                booking.service?.title ||
                "Service"}
            </div>
          </div>

          {/* Booking Type */}

          <div>
            <label className="text-sm font-medium text-gray-700">
              Booking Type
            </label>

            <div className="mt-2 grid grid-cols-2 gap-3">

              <button
                type="button"
                onClick={() =>
                  setBookingType("instant")
                }
                className={`rounded-lg border px-4 py-3 text-sm font-medium transition ${
                  bookingType === "instant"
                    ? "border-blue-600 bg-blue-50 text-blue-600"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                Instant
              </button>

              <button
                type="button"
                onClick={() =>
                  setBookingType("scheduled")
                }
                className={`rounded-lg border px-4 py-3 text-sm font-medium transition ${
                  bookingType === "scheduled"
                    ? "border-blue-600 bg-blue-50 text-blue-600"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                Scheduled
              </button>

            </div>
          </div>

          {/* Date & Time */}

          {bookingType === "scheduled" && (
            <div>
              <label
                htmlFor="startTime"
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <FaCalendarAlt className="text-blue-500" />
                Date & Time
              </label>

              <div className="relative mt-2">
                <FaClock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  id="startTime"
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) =>
                    setStartTime(e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          )}

          {/* Notes */}

          <div>
            <label
              htmlFor="bookingNotes"
              className="text-sm font-medium text-gray-700"
            >
              Notes
            </label>

            <textarea
              id="bookingNotes"
              rows={4}
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
              placeholder="Add any additional information..."
              className="mt-2 w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Error */}

          {(formError || error) && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {formError || error}
            </div>
          )}

          {/* Actions */}

          <div className="flex gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              disabled={updateLoading}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={updateLoading}
              className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {updateLoading
                ? "Updating..."
                : "Update Booking"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default UpdateBookingModal;