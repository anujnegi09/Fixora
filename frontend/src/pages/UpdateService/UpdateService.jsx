import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import {
  getServiceById,
  updateService,
} from "../../features/services/serviceThunks";

import {
  selectService,
  selectServiceLoading,
  selectUpdateServiceLoading,
  selectServiceError,
} from "../../features/services/serviceSelectors";

import LocationModal from "../../components/location/LocationModal";
import ServiceSearchHeader from "../../components/service/ServiceSearchHeader";

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

const UpdateService = () => {
  const { serviceId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const service = useSelector(selectService);
  const loading = useSelector(selectServiceLoading);
  const updateLoading = useSelector(selectUpdateServiceLoading);
  const error = useSelector(selectServiceError);

  // =========================================
  // SERVICE LOCATION
  // =========================================

  const [serviceLocation, setServiceLocation] = useState(null);

  const [showLocationModal, setShowLocationModal] = useState(false);

  // =========================================
  // FORM
  // =========================================

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      availability: [],
      category: "",
      serviceRadius: 10,
    },
  });

  const selectedDays = watch("availability", []);

  // =========================================
  // GET SERVICE
  // =========================================

  useEffect(() => {
    if (serviceId) {
      dispatch(getServiceById(serviceId));
    }
  }, [dispatch, serviceId]);

  // =========================================
  // SET SERVICE DATA
  // =========================================

  useEffect(() => {
    if (!service) return;

    setValue("title", service.title || "");
    setValue("category", service.category || "");
    setValue("description", service.description || "");
    setValue("price", service.price || "");
    setValue("phoneNumber", service.phoneNumber || "");
    setValue("serviceRadius", service.serviceRadius || 10);

    // =========================================
    // EXISTING SERVICE LOCATION
    // =========================================

    if (service.location) {
      let latitude = null;
      let longitude = null;

    
        // Your Service model stores:

        // coordinates: {
        //   type: "Point",
        //   coordinates: [longitude, latitude]
        // };
      
      if (
        service.location.coordinates &&
        Array.isArray(service.location.coordinates.coordinates)
      ) {
        longitude = Number(
          service.location.coordinates.coordinates[0]
        );

        latitude = Number(
          service.location.coordinates.coordinates[1]
        );
      }

      /*
        This fallback is useful if your API
        directly returns latitude/longitude.
      */

      if (
        latitude === null &&
        service.location.latitude !== undefined
      ) {
        latitude = Number(service.location.latitude);
      }

      if (
        longitude === null &&
        service.location.longitude !== undefined
      ) {
        longitude = Number(service.location.longitude);
      }

      setServiceLocation({
        address: service.location.address || "",
        city: service.location.city || "",
        state: service.location.state || "",
        pincode: service.location.pincode || "",
        latitude,
        longitude,
      });
    }

    // =========================================
    // AVAILABILITY
    // =========================================

    const availableDays =
      service.availability?.days
        ?.filter((day) => day.available)
        ?.map((day) => day.day) || [];

    setValue("availability", availableDays);
  }, [service, setValue]);

  // =========================================
  // LOCATION SELECTED FROM MODAL
  // =========================================

  const handleLocationSelect = (location) => {
    console.log("NEW SERVICE LOCATION:", location);

    setServiceLocation(location);

    setShowLocationModal(false);
  };

  // =========================================
  // SUBMIT
  // =========================================

  const onSubmit = async (data) => {
    if (!serviceLocation) {
      alert("Please select a service location.");
      return;
    }

    const formattedData = {
      title: data.title,
      category: data.category,
      description: data.description,
      phoneNumber: data.phoneNumber,
      price: data.price,
      serviceRadius: data.serviceRadius,

      // =========================================
      // SERVICE LOCATION
      // =========================================
location: {
  address: serviceLocation.address,
  city: serviceLocation.city,
  state: serviceLocation.state,
  pincode: serviceLocation.pincode,

  coordinates: {
    type: "Point",
    coordinates: [
      Number(serviceLocation.longitude),
      Number(serviceLocation.latitude),
    ],
  },
},

      // =========================================
      // AVAILABILITY
      // =========================================

      availability: {
        days: weekDays.map((day) => ({
          day,
          available: data.availability?.includes(day) || false,
        })),
      },
    };

    console.log(
      "UPDATED SERVICE DATA:",
      formattedData
    );

    const result = await dispatch(
      updateService({
        serviceId,
        serviceData: formattedData,
      })
    );

    if (updateService.fulfilled.match(result)) {
      navigate("/become-provider");
    }
  };

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-10">

        <div className="rounded-2xl bg-white p-8 text-center shadow-lg">

          <p className="text-lg font-medium text-blue-600">
            Loading service...
          </p>

        </div>

      </div>
    );
  }

  // =========================================
  // ERROR
  // =========================================

  if (error) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-10">

        <div className="rounded-2xl bg-white p-8 text-center shadow-lg">

          <p className="text-red-500">
            {error}
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/become-provider")
            }
            className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-white"
          >
            Back
          </button>

        </div>

      </div>
    );
  }

  // =========================================
  // UI
  // =========================================

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">

      <div className="rounded-2xl bg-white p-8 shadow-lg">

        <h1 className="mb-8 text-3xl font-bold">
          Update Service
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-7"
        >

          {/* ================================= */}
          {/* TITLE + CATEGORY */}
          {/* ================================= */}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            {/* Title */}

            <Input
              label="Service Title"
              placeholder="Enter service title"
              error={errors.title?.message}
              {...register("title", {
                required:
                  "Service title is required",
              })}
            />

            {/* Category */}

            <div>

              <label className="font-medium">
                Category
              </label>

              <select
                {...register("category", {
                  required:
                    "Category is required",
                })}
                className="
                  mt-4
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  p-3
                  outline-none
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500
                "
              >

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

          </div>

          {/* ================================= */}
          {/* DESCRIPTION */}
          {/* ================================= */}

          <div>

            <label className="mb-2 block font-medium">
              Description
            </label>

            <textarea
              rows="4"
              placeholder="Describe your service..."
              className="
                w-full
                resize-none
                rounded-lg
                border
                border-gray-300
                p-3
                outline-none
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-500
              "
              {...register("description", {
                required:
                  "Description is required",
              })}
            />

            {errors.description && (
              <p className="mt-1 text-sm text-red-500">
                {errors.description.message}
              </p>
            )}

          </div>

          {/* ================================= */}
          {/* PRICE + PHONE */}
          {/* ================================= */}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            <Input
              label="Price (₹)"
              type="number"
              placeholder="Enter service price"
              error={errors.price?.message}
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
              })}
            />

            <Input
              label="Phone Number"
              type="tel"
              placeholder="Enter phone number"
              error={errors.phoneNumber?.message}
              {...register("phoneNumber", {
                required:
                  "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message:
                    "Enter a valid 10-digit phone number",
                },
              })}
            />

          </div>

          {/* ================================= */}
          {/* LOCATION + RADIUS */}
          {/* ================================= */}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

            {/* Location */}

            <div className="md:col-span-2">

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
                    Pincode:{" "}
                    {serviceLocation.pincode}
                  </p>

                </div>
              )}

            </div>

            {/* Radius */}

            <Input
              label="Radius (km)"
              type="number"
              placeholder="10"
              error={errors.serviceRadius?.message}
              {...register("serviceRadius", {
                required:
                  "Service radius is required",
                valueAsNumber: true,
                min: {
                  value: 1,
                  message:
                    "Minimum radius is 1 km",
                },
                max: {
                  value: 100,
                  message:
                    "Maximum radius is 100 km",
                },
              })}
            />

          </div>

          {/* ================================= */}
          {/* AVAILABILITY */}
          {/* ================================= */}

          <div>

            <h3 className="mb-3 text-lg font-semibold">
              Availability
            </h3>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

              {weekDays.map((day) => (

                <label
                  key={day}
                  className="
                    flex
                    cursor-pointer
                    items-center
                    gap-2
                    rounded-lg
                    border
                    p-3
                    hover:bg-gray-50
                  "
                >

                  <input
                    type="checkbox"
                    value={day}
                    checked={selectedDays.includes(day)}
                    onChange={(e) => {

                      if (e.target.checked) {

                        setValue(
                          "availability",
                          [
                            ...selectedDays,
                            day,
                          ]
                        );

                      } else {

                        setValue(
                          "availability",
                          selectedDays.filter(
                            (selectedDay) =>
                              selectedDay !== day
                          )
                        );

                      }

                    }}
                  />

                  {day}

                </label>

              ))}

            </div>

          </div>

          {/* ================================= */}
          {/* BUTTONS */}
          {/* ================================= */}

          <div className="flex gap-4">

            <button
              type="button"
              onClick={() =>
                navigate("/become-provider")
              }
              className="
                w-1/2
                rounded-lg
                border
                border-gray-300
                py-3
                transition
                hover:bg-gray-50
              "
            >
              Cancel
            </button>

            <Button
              type="submit"
              loading={updateLoading}
              fullWidth
            >
              Update Service
            </Button>

          </div>

        </form>

      </div>

      {/* ================================= */}
      {/* LOCATION MODAL */}
      {/* ================================= */}

      {showLocationModal && (
        <div
          className="
            fixed
            inset-0
            z-[999]
            flex
            items-center
            justify-center
            bg-black/40
            p-4
            backdrop-blur-sm
          "
        >

          <LocationModal
            onClose={() =>
              setShowLocationModal(false)
            }
            onLocationSelect={
              handleLocationSelect
            }
          />

        </div>
      )}

    </div>
  );
};

export default UpdateService;