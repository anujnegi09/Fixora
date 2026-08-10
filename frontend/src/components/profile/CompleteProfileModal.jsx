import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { completeProfileApi } from "../../api/user.api.js";

import Button from "../common/Button.jsx";
import Input from "../common/Input.jsx";

const CompleteProfileModal = () => {
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

      if (data.profileImage?.[0]) {
        formData.append("avatar", data.profileImage[0]);
      }

      const response = await completeProfileApi(formData);

      toast.success(
        response.message || "Profile completed successfully."
      );

      // You can refresh auth/user data here if needed.
      window.location.reload();

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to complete profile."
      );
    }
  };

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
        backdrop-blur-sm
        px-4
      "
    >
      <div
        className="
          w-full
          max-w-md
          rounded-2xl
          bg-white
          p-6
          shadow-2xl
        "
      >
        {/* Header */}

        <h2 className="text-center text-2xl font-bold text-gray-800">
          Complete Your Profile
        </h2>

        <p className="mt-2 mb-8 text-center text-sm text-gray-500">
          Just a few more details to finish setting up your account.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Phone Number */}

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
            <label className="font-medium text-gray-700">
              Profile Picture{" "}
              <span className="text-sm text-gray-400">
                (Optional)
              </span>
            </label>

            <input
              type="file"
              accept="image/*"
              {...register("profileImage")}
              onChange={handleImagePreview}
              className="mt-2 w-full"
            />

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="
                  mt-4
                  h-24
                  w-24
                  rounded-full
                  border
                  border-gray-200
                  object-cover
                "
              />
            )}
          </div>

          {/* Submit */}

          <Button
            type="submit"
            loading={isSubmitting}
            fullWidth
          >
            Complete Profile
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfileModal;