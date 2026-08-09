import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { completeProfileApi } from "../../api/user.api.js";

import Button from "../../components/common/Button.jsx";
import Input from "../../components/common/Input.jsx";

const CompleteProfile = () => {
  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleImagePreview = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("phoneNumber", data.phoneNumber);
      // formData.append("address", data.address || "");
      // formData.append("city", data.city || "");
      // formData.append("state", data.state || "");

      if (data.profileImage?.[0]) {
        formData.append("profileImage", data.profileImage[0]);
      }

      const response = await completeProfileApi(formData);

      toast.success(response.message || "Profile completed successfully.");

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to complete profile.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600">
          Complete Your Profile
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Just a few more details to finish setting up your account.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Phone Number */}

          {/* <div>
            <label className="font-medium">
              Phone Number <span className="text-red-500">*</span>
            </label>

            <input
              type="tel"
              placeholder="Enter phone number"
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Enter a valid 10-digit phone number",
                },
              })}
              className="w-full mt-2 border rounded-lg p-3"
            />

            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div> */}
          <Input
            label="Phone Number"
            type="tel"
            placeholder="Enter phone number"
            error={errors.phoneNumber?.message}
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^[6-9]\d{9}$/,
                message: "Enter a valid 10-digit phone number",
              },
            })}
          />
          {/* Profile Image */}

          <div>
            <label className="font-medium">Profile Picture (Optional)</label>

            <input
              type="file"
              accept="image/*"
              {...register("profileImage")}
              onChange={handleImagePreview}
              className="w-full mt-2"
            />

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 h-28 w-28 rounded-full object-cover border"
              />
            )}
          </div>

          {/* Address */}

          {/* <div>
            <label className="font-medium">
              Address
            </label>

            <textarea
              rows={3}
              placeholder="Enter your address"
              {...register("address")}
              className="w-full mt-2 border rounded-lg p-3"
            />
          </div> */}

          {/* City */}

          {/* <div>
            <label className="font-medium">
              City
            </label>

            <input
              type="text"
              placeholder="Enter city"
              {...register("city")}
              className="w-full mt-2 border rounded-lg p-3"
            />
          </div> */}

          {/* State */}

          {/* <div>
            <label className="font-medium">
              State
            </label>

            <input
              type="text"
              placeholder="Enter state"
              {...register("state")}
              className="w-full mt-2 border rounded-lg p-3"
            />
          </div> */}

          {/* <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting
              ? "Saving..."
              : "Complete Profile"}
          </button> */}
          <Button type="submit" loading={isSubmitting} fullWidth>
            Complete Profile
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
