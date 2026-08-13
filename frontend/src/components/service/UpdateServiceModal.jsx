import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";

import Button from "../common/Button.jsx";
import Input from "../common/Input.jsx";
import LocationModal from "../location/LocationModal.jsx";
import ServiceSearchHeader from "../service/ServiceSearchHeader.jsx";

import { updateService } from "../../features/services/serviceThunks.js";
import {
  selectUpdateServiceLoading,
  selectService,
} from "../../features/services/serviceSelectors.js";

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
  "other",
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
    description: "Customer can request the service immediately.",
  },
  {
    value: "scheduled",
    label: "Scheduled Booking",
    description: "Customer can select a future date and time.",
  },
];

const UpdateServiceModal = ({ service, onClose }) => {
  const dispatch = useDispatch();

  const loading = useSelector(selectUpdateServiceLoading);

  const [showLocationModal, setShowLocationModal] = useState(false);

  const [serviceLocation, setServiceLocation] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      category: "",
      description: "",
      phoneNumber: "",
      price: "",
      serviceRadius: "",
      availability: [],
      bookingOptions: [],
    },
  });

  const selectedDays = watch("availability");
  const selectedBookingOptions = watch("bookingOptions");

  // ==========================================
  // Prevent background scrolling
  // ==========================================

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // ==========================================
  // Load existing service data
  // ==========================================

  useEffect(() => {
    if (!service) return;

    const existingDays =
      service.availability?.days
  ?.filter((item) => item.available)
  .map((item) => item.day) || []

    reset({
      title: service.title || "",
      category: service.category || "",
      description: service.description || "",
      phoneNumber: service.phoneNumber || "",
      price: service.price ?? "",
      serviceRadius: service.serviceRadius ?? "",

      availability: existingDays,

      bookingOptions: service.bookingOptions || [],
    });

    // Convert existing GeoJSON location
    if (service.location) {
      setServiceLocation({
        address: service.location.address || "",
        city: service.location.city || "",
        state: service.location.state || "",
        pincode: service.location.pincode || "",

        latitude:
          service.location.coordinates?.coordinates?.[1] ?? null,

        longitude:
          service.location.coordinates?.coordinates?.[0] ?? null,
      });
    }
  }, [service, reset]);

  // ==========================================
  // Location selected
  // ==========================================

  const handleLocationSelect = (location) => {
    setServiceLocation(location);
    setShowLocationModal(false);
  };

  // ==========================================
  // Toggle booking option
  // ==========================================

  const handleBookingOptionChange = (value) => {
    const current = selectedBookingOptions || [];

    if (current.includes(value)) {
      setValue(
        "bookingOptions",
        current.filter((option) => option !== value),
        { shouldValidate: true },
      );
    } else {
      setValue(
        "bookingOptions",
        [...current, value],
        { shouldValidate: true },
      );
    }
  };

  // ==========================================
  // Submit
  // ==========================================

  const onSubmit = async (data) => {
    if (!serviceLocation) {
      alert("Please select a service location.");
      return;
    }

    if (!data.bookingOptions?.length) {
      alert("Please select at least one booking option.");
      return;
    }

    if (!data.availability?.length) {
      alert("Please select at least one available day.");
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

      availability: {
        days: weekDays.map((day) => ({
          day,
          available: data.availability.includes(day),
        })),
      },

      location: {
        address: serviceLocation.address,
        city: serviceLocation.city,
        state: serviceLocation.state,
        pincode: serviceLocation.pincode,
        latitude: serviceLocation.latitude,
        longitude: serviceLocation.longitude,
      },
    };

    const result = await dispatch(
      updateService({
        serviceId: service._id,
        serviceData: formattedData,
      }),
    );

    if (updateService.fulfilled.match(result)) {
      onClose();
    }
  };

  if (!service) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-black/50
        px-4
        py-6
        backdrop-blur-sm
      "
    >
      {/* Modal */}
      <div
        className="
          relative
          max-h-[90vh]
          w-full
          max-w-2xl
          overflow-y-auto
          scrollbar-hide
          rounded-2xl
          bg-white
          p-6
          shadow-2xl
        "
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="
            absolute
            right-4
            top-4
            rounded-full
            p-2
            text-gray-500
            transition
            hover:bg-gray-100
            hover:text-gray-800
          "
        >
          <IoClose size={24} />
        </button>

        {/* Header */}
        <div className="mb-6 pr-10">
          <h1 className="text-2xl font-bold text-gray-800">
            Update Service
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Update your service details, availability and booking options.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Title */}

          <Input
            label="Service Title"
            placeholder="Enter service title"
            error={errors.title?.message}
            {...register("title", {
              required: "Service title is required",
            })}
          />

          {/* Category */}

          <div>
            <label className="font-medium">
              Category
            </label>

            <select
              {...register("category", {
                required: "Category is required",
              })}
              className="mt-2 w-full rounded-lg border p-3"
            >
              <option value="">
                Select Category
              </option>

              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>

            {errors.category && (
              <p className="mt-1 text-sm text-red-500">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Description */}

          <div>
            <label className="mb-2 block font-medium">
              Description
            </label>

            <textarea
              rows="4"
              className="w-full resize-none rounded-lg border p-3"
              placeholder="Describe your service..."
              {...register("description", {
                required: "Description is required",
              })}
            />

            {errors.description && (
              <p className="mt-1 text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Price */}

          <Input
            label="Price (₹)"
            type="number"
            placeholder="Enter price"
            error={errors.price?.message}
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true,
              min: {
                value: 0,
                message: "Price cannot be negative",
              },
            })}
          />

          {/* Phone */}

          <Input
            label="Phone Number"
            type="tel"
            placeholder="Enter phone number"
            error={errors.phoneNumber?.message}
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter a valid 10-digit phone number",
              },
            })}
          />

          {/* Service Radius */}

          <Input
            label="Service Radius (km)"
            type="number"
            placeholder="Enter service radius"
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

          {/* Booking Options */}

          <div>
            <h3 className="mb-3 text-lg font-semibold">
              Booking Options
            </h3>

            <div className="space-y-3">
              {bookingOptions.map((option) => {
                const checked =
                  selectedBookingOptions?.includes(option.value);

                return (
                  <label
                    key={option.value}
                    className={`
                      flex
                      cursor-pointer
                      items-start
                      gap-3
                      rounded-lg
                      border
                      p-4
                      transition
                      ${
                        checked
                          ? "border-blue-500 bg-blue-50"
                          : "hover:bg-gray-50"
                      }
                    `}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        handleBookingOptionChange(option.value)
                      }
                      className="mt-1"
                    />

                    <div>
                      <p className="font-medium">
                        {option.label}
                      </p>

                      <p className="text-sm text-gray-500">
                        {option.description}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>

            {selectedBookingOptions?.length === 0 && (
              <p className="mt-2 text-sm text-red-500">
                Select at least one booking option.
              </p>
            )}
          </div>

          {/* Availability */}

          <div>
            <h3 className="mb-3 text-lg font-semibold">
              Availability
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {weekDays.map((day) => {
                const checked = selectedDays.includes(day);

                return (
                  <label
                    key={day}
                    className="
                      flex
                      cursor-pointer
                      items-center
                      gap-3
                      rounded-lg
                      border
                      p-3
                      hover:bg-gray-50
                    "
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setValue(
                            "availability",
                            [...selectedDays, day],
                            { shouldValidate: true },
                          );
                        } else {
                          setValue(
                            "availability",
                            selectedDays.filter(
                              (d) => d !== day,
                            ),
                            { shouldValidate: true },
                          );
                        }
                      }}
                    />

                    {day}
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

          {/* Location */}

          <div>
            <label className="mb-2 block font-medium">
              Service Location
            </label>

            <ServiceSearchHeader
              location={
                serviceLocation?.city
                  ? `${serviceLocation.city}, ${serviceLocation.state}`
                  : "Select Location"
              }
              onLocationClick={() =>
                setShowLocationModal(true)
              }
              showSearch={false}
              showCategory={false}
              showSort={false}
            />

            {serviceLocation && (
              <div className="mt-3 rounded-lg border bg-gray-50 p-4">
                <p className="font-medium">
                  {serviceLocation.city},{" "}
                  {serviceLocation.state}
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  {serviceLocation.address}
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  Pincode: {serviceLocation.pincode}
                </p>
              </div>
            )}
          </div>

          {/* Buttons */}

          <div className="flex gap-3 pt-3">
            <Button
              type="submit"
              loading={loading}
              fullWidth
            >
              Save Changes
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              fullWidth
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>

      {/* Location Modal */}

      {showLocationModal && (
        <LocationModal
          onClose={() =>
            setShowLocationModal(false)
          }
          onLocationSelect={handleLocationSelect}
        />
      )}
    </div>
  );
};

export default UpdateServiceModal;