import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import { createService } from "../../features/services/serviceThunks";
import { selectCreateServiceLoading } from "../../features/services/serviceSelectors";

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

const CreateService = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(selectCreateServiceLoading);

  const [showLocationModal, setShowLocationModal] = useState(false);

  // Service has its own location
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
      category: categories[0],
      serviceRadius: 10,
    },
  });

  const selectedDays = watch("availability");

  // ==========================
  // Submit
  // ==========================

  const onSubmit = async (data) => {
    // Location is required
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

      // Backend expects latitude/longitude here
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

    console.log("DATA BEING SENT:", formattedData);
    const result = await dispatch(createService(formattedData));

    if (createService.fulfilled.match(result)) {
      navigate("/become-provider");
    }
  };

  // ==========================
  // Location selected
  // ==========================

  const handleLocationSelect = (location) => {
    setServiceLocation(location);
    setShowLocationModal(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">

      <h1 className="mb-8 text-3xl font-bold">
        Create New Service
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-7"
      >

        {/* Service Title */}

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
            {...register("category")}
            className="mt-4 w-full rounded-lg border p-3"
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
          })}
        />

        {/* Phone Number */}

        <Input
          label="Phone Number"
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

        {/* Service Location */}

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

        {/* Service Radius */}

        <Input
          label="Radius (km)"
          type="number"
          placeholder="10"
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

        {/* Availability */}

        <div>
          <h3 className="mb-3 text-lg font-semibold">
            Availability
          </h3>

          <div className="grid grid-cols-2 gap-3">

            {weekDays.map((day) => (
              <label
                key={day}
                className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  value={day}
                  checked={selectedDays.includes(day)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setValue("availability", [
                        ...selectedDays,
                        day,
                      ]);
                    } else {
                      setValue(
                        "availability",
                        selectedDays.filter(
                          (d) => d !== day
                        )
                      );
                    }
                  }}
                />

                {day}
              </label>
            ))}

          </div>

          {selectedDays.length === 0 && (
            <p className="mt-2 text-sm text-red-500">
              Please select at least one day.
            </p>
          )}
        </div>

        {/* Submit */}

        <Button
          type="submit"
          loading={loading}
          fullWidth
        >
          Create Service
        </Button>

      </form>

      {/* Location Modal */}

      {showLocationModal && (
        <LocationModal
          onClose={() => setShowLocationModal(false)}
          onLocationSelect={handleLocationSelect}
        />
      )}

    </div>
  );
};

export default CreateService;