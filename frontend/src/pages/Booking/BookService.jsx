import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  FaMapMarkerAlt,
  FaStar,
  FaPhone,
  FaBolt,
  FaCalendarAlt,
  FaRupeeSign,
} from "react-icons/fa";

import { getServiceById } from "../../features/services/serviceThunks";

import {
  selectService,
  selectServiceLoading,
  selectServiceError,
} from "../../features/services/serviceSelectors";

import { createBooking } from "../../features/bookings/bookingThunks";
import DefaultAvatar from "../../assets/default-avatar-profile.png";

const BookService = () => {
  const { serviceId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const service = useSelector(selectService);
  const loading = useSelector(selectServiceLoading);
  const error = useSelector(selectServiceError);

  // ==============================
  // Booking State
  // ==============================

  const [bookingType, setBookingType] = useState("");

  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");

  const [notes, setNotes] = useState("");

  const [bookingLoading, setBookingLoading] = useState(false);

  const [formError, setFormError] = useState("");

  // ==============================
  // Fetch Service
  // ==============================

  useEffect(() => {
    if (serviceId) {
      dispatch(getServiceById(serviceId));
    }
  }, [dispatch, serviceId]);

  // ==============================
  // Set Default Booking Type
  // ==============================

  useEffect(() => {
    if (!service?.bookingOptions) return;

    const options = service.bookingOptions;

    if (options.includes("instant")) {
      setBookingType("instant");
    } else if (options.includes("scheduled")) {
      setBookingType("scheduled");
    }
  }, [service]);

  // ==============================
  // Available Days
  // ==============================

  const availableDays =
    service?.availability?.days?.filter((day) => day.available) || [];

  const availableDayNames = availableDays.map((day) => day.day);

  // ==============================
  // Check Selected Date
  // ==============================

  const isDateAvailable = (dateValue) => {
    if (!dateValue || availableDayNames.length === 0) {
      return false;
    }

    const date = new Date(`${dateValue}T00:00:00`);

    const dayName = date.toLocaleDateString("en-US", {
      weekday: "long",
    });

    return availableDayNames.includes(dayName);
  };

  // ==============================
  // Submit Booking
  // ==============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormError("");

    // --------------------------
    // Instant Booking
    // --------------------------

    if (bookingType === "instant") {
      try {
        setBookingLoading(true);

        // Your createBooking thunk can be dispatched here.

        await dispatch(
          createBooking({
            serviceId: service._id,
            bookingType: "instant",
            startTime: new Date().toISOString(),
            notes,
          }),
        ).unwrap();

        // navigate("/bookings");
      } catch (error) {
        setFormError(error?.message || "Failed to create booking");
      } finally {
        setBookingLoading(false);
      }

      return;
    }

    // --------------------------
    // Scheduled Booking
    // --------------------------

    if (bookingType === "scheduled") {
      if (!bookingDate) {
        setFormError("Please select a booking date.");
        return;
      }

      if (!bookingTime) {
        setFormError("Please select a booking time.");
        return;
      }

      if (!isDateAvailable(bookingDate)) {
        setFormError("The provider is not available on the selected day.");
        return;
      }

      try {
        setBookingLoading(true);

        const selectedDateTime = new Date(`${bookingDate}T${bookingTime}`);

        //   Send this Date to your backend.

        await dispatch(
          createBooking({
            serviceId: service._id,
            bookingType: "scheduled",
            startTime: selectedDateTime.toISOString(),
            notes,
          }),
        ).unwrap();

        // navigate("/bookings");
      } catch (error) {
        setFormError(error?.message || "Failed to create booking");
      } finally {
        setBookingLoading(false);
      }
    }
  };

  // ==============================
  // Loading
  // ==============================

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-5 py-32 text-center">
        <p className="text-lg font-medium text-blue-600">
          Loading service details...
        </p>
      </div>
    );
  }

  // ==============================
  // Error
  // ==============================

  if (error || !service) {
    return (
      <div className="mx-auto max-w-5xl px-5 py-32 text-center">
        <p className="text-lg font-medium text-red-500">
          {error || "Service not found"}
        </p>

        <button
          type="button"
          onClick={() => navigate("/services")}
          className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Back to Services
        </button>
      </div>
    );
  }

  const supportsInstant = service.bookingOptions?.includes("instant");
  const supportsScheduled = service.bookingOptions?.includes("scheduled");

  return (
    <div className="mx-auto max-w-6xl px-5 pt-14 pb-28">
      {/* ==============================
          PAGE HEADER
      ============================== */}

      <div className="mb-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-4 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          ← Back to Services
        </button>

        <h1 className="text-3xl font-bold text-gray-800">Book Service</h1>

        <p className="mt-2 text-gray-500">
          Review the service details and choose your booking option.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* ==========================================
            SERVICE DETAILS
        ========================================== */}

        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
            {/* Service Header */}

            <div className="border-b border-gray-100 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                    {service.category || "Service"}
                  </span>

                  <h2 className="mt-3 text-2xl font-bold text-gray-800">
                    {service.title}
                  </h2>
                </div>

                <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1.5 text-sm font-medium text-yellow-700">
                  <FaStar className="text-yellow-500" />

                  {service.averageRating?.toFixed(1) || "0.0"}
                </div>
              </div>

              {/* Provider */}
              <div className="mt-5 flex items-center gap-3">
                <img
                  src={service.userId?.avatar || DefaultAvatar }
                  alt={service.userId?.fullName || "Service Provider"}
                  className="h-12 w-12 rounded-full border object-cover"
                />

                <div>
                  <p className="font-semibold text-gray-800">
                    {service.userId?.fullName || "Service Provider"}
                  </p>

                  <p className="text-sm text-gray-500">
                    {service.totalReviews || 0} reviews
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}

            <div className="p-6">
              <h3 className="font-semibold text-gray-800">Description</h3>

              <p className="mt-2 leading-7 text-gray-600">
                {service.description || "No description available."}
              </p>
            </div>

            {/* Service Information */}

            <div className="grid gap-4 px-6 pb-6 sm:grid-cols-2">
              {/* Price */}

              <div className="rounded-xl bg-gray-50 p-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <FaRupeeSign />

                  <span className="text-sm">Price</span>
                </div>

                <p className="mt-1 text-xl font-bold text-gray-800">
                  ₹{service.price}
                </p>
              </div>

              {/* Radius */}

              <div className="rounded-xl bg-gray-50 p-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <FaMapMarkerAlt />

                  <span className="text-sm">Service Radius</span>
                </div>

                <p className="mt-1 text-xl font-bold text-gray-800">
                  {service.serviceRadius} km
                </p>
              </div>
            </div>

            {/* Booking Options Provided by Service Provider */}
            <div className="flex flex-nowrap items-center mt-1 border-t border-gray-100 pt-2">
              <p className="text-sm font-medium text-gray-500 pl-8 pr-8 pb-2">
                Booking Options :
              </p>

              <div className="mt-2 flex flex-nowrap items-center gap-2 pb-3">
                {service?.bookingOptions?.includes("instant") && (
                  <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-yellow-50 px-3 py-1.5 text-sm font-medium text-yellow-700">
                    <FaBolt />
                    Instant Booking
                  </span>
                )}

                {service?.bookingOptions?.includes("scheduled") && (
                  <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700">
                    <FaCalendarAlt />
                    Scheduled Booking
                  </span>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="border-t border-gray-100 p-6">
              <h3 className="text-sm font-semibold text-gray-500">
                Service Location
              </h3>

              <div className="mt-3 flex gap-3">
                <FaMapMarkerAlt className="mt-1 shrink-0 text-red-500" />

                <div>
                  <p className="font-medium text-gray-800">
                    {service.location?.city}
                    {service.location?.state && `, ${service.location.state}`}
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    {service.location?.address}
                  </p>

                  {service.location?.pincode && (
                    <p className="mt-1 text-xs text-gray-500">
                      Pincode: {service.location.pincode}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact */}

            {service.phoneNumber && (
              <div className="border-t border-gray-100 p-6">
                <div className="flex items-center gap-3">
                  <FaPhone className="text-green-600" />

                  <div>
                    <p className="text-xs text-gray-500">Contact</p>

                    <p className="font-medium text-gray-700">
                      {service.phoneNumber}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Availability */}

            {availableDays.length > 0 && (
              <div className="border-t border-gray-100 p-6">
                <h3 className="text-sm font-semibold text-gray-500">
                  Available Days
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">
                  {availableDays.map((day) => (
                    <span
                      key={day.day}
                      className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700"
                    >
                      {day.day}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ==========================================
            BOOKING FORM
        ========================================== */}

        <div className="lg:col-span-2">
          <div className="sticky top-24 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800">Booking Details</h2>

            <p className="mt-1 text-sm text-gray-500">
              Choose how you want to book this service.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {/* ==============================
                  BOOKING TYPE
              ============================== */}

              {(supportsInstant || supportsScheduled) && (
                <div>
                  <label className="mb-3 block text-sm font-medium text-gray-700">
                    Booking Type
                  </label>

                  <div className="grid gap-3">
                    {/* Instant */}

                    {supportsInstant && (
                      <button
                        type="button"
                        onClick={() => setBookingType("instant")}
                        className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                          bookingType === "instant"
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                          <FaBolt />
                        </div>

                        <div>
                          <p className="font-semibold text-gray-800">
                            Instant Booking
                          </p>

                          <p className="text-xs text-gray-500">
                            Request the service immediately
                          </p>
                        </div>
                      </button>
                    )}

                    {/* Scheduled */}

                    {supportsScheduled && (
                      <button
                        type="button"
                        onClick={() => setBookingType("scheduled")}
                        className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                          bookingType === "scheduled"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                          <FaCalendarAlt />
                        </div>

                        <div>
                          <p className="font-semibold text-gray-800">
                            Scheduled Booking
                          </p>

                          <p className="text-xs text-gray-500">
                            Choose your preferred date and time
                          </p>
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* ==============================
                  SCHEDULE DATE
              ============================== */}

              {bookingType === "scheduled" && (
                <>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Select Date
                    </label>

                    <input
                      type="date"
                      value={bookingDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    {bookingDate && !isDateAvailable(bookingDate) && (
                      <p className="mt-2 text-sm text-red-500">
                        Provider is not available on this day.
                      </p>
                    )}
                  </div>

                  {/* Time */}

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Select Time
                    </label>

                    <input
                      type="time"
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </>
              )}

              {/* ==============================
                  NOTES
              ============================== */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Additional Notes
                  <span className="ml-1 text-xs text-gray-400">(Optional)</span>
                </label>

                <textarea
                  rows="4"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describe anything the service provider should know..."
                  className="w-full resize-none rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* ==============================
                  ERROR
              ============================== */}

              {formError && (
                <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  {formError}
                </div>
              )}

              {/* ==============================
                  SUMMARY
              ============================== */}

              <div className="border-t border-gray-100 pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Service Price</span>

                  <span className="text-xl font-bold text-gray-800">
                    ₹{service.price}
                  </span>
                </div>
              </div>

              {/* ==============================
                  SUBMIT
              ============================== */}

              <button
                type="submit"
                disabled={bookingLoading || !bookingType}
                className="
                  w-full
                  rounded-xl
                  bg-blue-600
                  px-5
                  py-3
                  font-semibold
                  text-white
                  shadow-sm
                  transition
                  hover:bg-blue-700
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {bookingLoading ? "Booking..." : "Confirm Booking"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookService;
