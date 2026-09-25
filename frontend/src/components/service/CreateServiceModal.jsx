import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import Input from "../common/Input";
import Button from "../common/Button";
import LocationModal from "../location/LocationModal";

import { createService } from "../../features/services/serviceThunks";
import { getMyServices } from "../../features/services/serviceThunks";

import { selectCreateServiceLoading } from "../../features/services/serviceSelectors";

const categories = [
  "Electrician",
  "Plumber",
  "Carpenter",
  "Painter",
  "Cleaner",
  "Mechanic",
  "AC Repair",
  "Tutor",
  "Beautician",
  "Other",
];

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const bookingOptions = [
  {
    value: "instant",
    label: "Instant Booking",
    description: "Customers can book your service immediately.",
  },
  {
    value: "scheduled",
    label: "Scheduled Booking",
    description: "Customers can choose a preferred time.",
  },
];

const CreateServiceModal = ({ onClose }) => {
  const dispatch = useDispatch();

  const loading = useSelector(selectCreateServiceLoading);

  const [showLocationModal, setShowLocationModal] = useState(false);
  const [serviceLocation, setServiceLocation] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      availability: [],
      category: "",
      serviceRadius: "",
      bookingOptions: [],
    },
  });

  const selectedDays = watch("availability");
  const selectedBookingOptions = watch("bookingOptions");

  // ==========================
  // Submit
  // ==========================

  const onSubmit = async (data) => {
    // Location validation
    if (!serviceLocation) {
      alert("Please select a service location.");
      return;
    }

    // Availability validation
    if (!data.availability?.length) {
      return;
    }

    const formattedData = {
      title: data.title,
      category: data.category,
      description: data.description,
      phoneNumber: data.phoneNumber,
      price: data.price,
      serviceRadius: data.serviceRadius,
      bookingOptions: data.bookingOptions,

      location: {
        address: serviceLocation.address,
        city: serviceLocation.city,
        state: serviceLocation.state,
        pincode: serviceLocation.pincode,
        latitude: serviceLocation.latitude,
        longitude: serviceLocation.longitude,
      },

      availability: {
        days: weekDays.map((day) => ({
          day,
          available: data.availability.includes(day),
        })),
      },
    };

    const result = await dispatch(createService(formattedData));

    if (createService.fulfilled.match(result)) {
      // Refresh provider services
      dispatch(getMyServices());

      // Close modal
      onClose();
    }
  };

  // ==========================
  // Location
  // ==========================

  const handleLocationSelect = (location) => {
    setServiceLocation(location);
    setShowLocationModal(false);
  };

  // ==========================
  // Close when clicking overlay
  // ==========================

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && !loading) {
      onClose();
    }
  };

  return (
    <>
      {/* Modal Overlay */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
        onMouseDown={handleOverlayClick}
      >
        {/* Modal */}
        <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
          {/* ================= HEADER ================= */}

          <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">
                Provider Dashboard
              </p>

              <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                Create New Service
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Add your service details and start receiving bookings.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed"
            >
              ×
            </button>
          </div>

          {/* ================= FORM ================= */}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="overflow-y-auto px-6 py-6"
          >
            {/* ==========================================
                1. SERVICE INFORMATION
            ========================================== */}

            <section>
              <div className="mb-5">
                <h3 className="text-lg font-semibold text-slate-900">
                  Service Information
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Tell customers what service you provide.
                </p>
              </div>

              <div className="space-y-5">
                {/* Service Title */}

                <Input
                  label="Service Title"
                  placeholder="e.g. Professional Home Electrician"
                  error={errors.title?.message}
                  {...register("title", {
                    required: "Service title is required",
                  })}
                />

                {/* Category */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Category
                  </label>

                  <select
                    {...register("category", {
                      required: "Please select a category",
                    })}
                    className={`w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 ${
                      errors.category
                        ? "border-red-400"
                        : "border-slate-200"
                    }`}
                  >
                    <option value="">Select a category</option>

                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>

                  {errors.category && (
                    <p className="mt-1.5 text-sm text-red-500">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                {/* Description */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Description
                  </label>

                  <textarea
                    rows={4}
                    placeholder="Describe your service, what you offer, and what customers can expect..."
                    className={`w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100 ${
                      errors.description
                        ? "border-red-400"
                        : "border-slate-200"
                    }`}
                    {...register("description", {
                      required: "Description is required",
                    })}
                  />

                  {errors.description && (
                    <p className="mt-1.5 text-sm text-red-500">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>
            </section>

            <div className="my-8 border-t border-slate-100" />

            {/* ==========================================
                2. PRICING & SERVICE AREA
            ========================================== */}

            <section>
              <div className="mb-5">
                <h3 className="text-lg font-semibold text-slate-900">
                  Pricing & Service Area
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Set your pricing and tell customers where you provide
                  services.
                </p>
              </div>

              <div className="space-y-5">
                {/* Price + Phone */}

                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    label="Price (₹)"
                    type="number"
                    placeholder="e.g. 500"
                    error={errors.price?.message}
                    {...register("price", {
                      required: "Price is required",
                      valueAsNumber: true,
                      min: {
                        value: 1,
                        message: "Price must be greater than 0",
                      },
                    })}
                  />

                  <Input
                    label="Phone Number"
                    placeholder="10-digit phone number"
                    error={errors.phoneNumber?.message}
                    {...register("phoneNumber", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Enter a valid 10-digit phone number",
                      },
                    })}
                  />
                </div>

                {/* Location */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Service Location
                  </label>

                  <button
                    type="button"
                    onClick={() => setShowLocationModal(true)}
                    className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-left transition hover:border-violet-300 hover:bg-violet-50/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                        📍
                      </div>

                      <div>
                        <p className="text-sm font-medium text-slate-800">
                          {serviceLocation?.city
                            ? `${serviceLocation.city}, ${serviceLocation.state}`
                            : "Select service location"}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500">
                          {serviceLocation
                            ? serviceLocation.address
                            : "Choose where you provide this service"}
                        </p>
                      </div>
                    </div>

                    <span className="text-sm font-medium text-violet-600">
                      {serviceLocation ? "Change" : "Select"}
                    </span>
                  </button>

                  {serviceLocation && (
                    <div className="mt-3 rounded-xl bg-slate-50 p-4">
                      <p className="text-sm font-medium text-slate-800">
                        {serviceLocation.city}, {serviceLocation.state}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {serviceLocation.address}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Pincode: {serviceLocation.pincode}
                      </p>
                    </div>
                  )}
                </div>

                {/* Service Radius */}

                <Input
                  label="Service Radius (km)"
                  type="number"
                  placeholder="e.g. 10"
                  error={errors.serviceRadius?.message}
                  {...register("serviceRadius", {
                    required: "Service radius is required",
                    valueAsNumber: true,
                    min: {
                      value: 1,
                      message: "Minimum radius is 1 km",
                    },
                    max: {
                      value: 100,
                      message: "Maximum radius is 100 km",
                    },
                  })}
                />
              </div>
            </section>

            <div className="my-8 border-t border-slate-100" />

            {/* ==========================================
                3. BOOKING & AVAILABILITY
            ========================================== */}

            <section>
              <div className="mb-5">
                <h3 className="text-lg font-semibold text-slate-900">
                  Booking & Availability
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Choose how customers can book your service.
                </p>
              </div>

              <div className="space-y-7">
                {/* Booking Options */}

                <div>
                  <h4 className="mb-3 text-sm font-semibold text-slate-800">
                    Booking Options
                  </h4>

                  <div className="space-y-3">
                    {bookingOptions.map((option) => {
                      const selected = selectedBookingOptions?.includes(
                        option.value,
                      );

                      return (
                        <label
                          key={option.value}
                          className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                            selected
                              ? "border-violet-500 bg-violet-50"
                              : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          <input
                            type="checkbox"
                            value={option.value}
                            className="mt-1 h-4 w-4 accent-violet-600"
                            {...register("bookingOptions", {
                              validate: (value) =>
                                value?.length > 0 ||
                                "Please select at least one booking option",
                            })}
                          />

                          <div>
                            <p className="text-sm font-medium text-slate-800">
                              {option.label}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              {option.description}
                            </p>
                          </div>
                        </label>
                      );
                    })}
                  </div>

                  {errors.bookingOptions && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.bookingOptions.message}
                    </p>
                  )}
                </div>

                {/* Availability */}

                <div>
                  <h4 className="mb-3 text-sm font-semibold text-slate-800">
                    Available Days
                  </h4>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {weekDays.map((day) => {
                      const selected = selectedDays.includes(day);

                      return (
                        <label
                          key={day}
                          className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-3 transition ${
                            selected
                              ? "border-violet-500 bg-violet-50 text-violet-700"
                              : "border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          <input
                            type="checkbox"
                            value={day}
                            checked={selected}
                            className="h-4 w-4 accent-violet-600"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setValue("availability", [
                                  ...selectedDays,
                                  day,
                                ]);
                              } else {
                                setValue(
                                  "availability",
                                  selectedDays.filter((d) => d !== day),
                                );
                              }
                            }}
                          />

                          <span className="text-sm font-medium">{day}</span>
                        </label>
                      );
                    })}
                  </div>

                  {selectedDays.length === 0 && (
                    <p className="mt-2 text-sm text-red-500">
                      Please select at least one day.
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* ================= FOOTER ================= */}

            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <Button type="submit" loading={loading}>
                Create Service
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Location Modal */}

      {showLocationModal && (
        <LocationModal
          onClose={() => setShowLocationModal(false)}
          onLocationSelect={handleLocationSelect}
        />
      )}
    </>
  );
};

export default CreateServiceModal;