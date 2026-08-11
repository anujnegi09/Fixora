import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import {
  updateProfile,
} from "../../features/user/userThunks.js";

import {
  selectProfile,
  selectUserLoading,
} from "../../features/user/userSelectors.js";

import Button from "../common/Button.jsx";
import Input from "../common/Input.jsx";

import { IoClose } from "react-icons/io5";
import { FaCamera } from "react-icons/fa";

const UpdateProfileModal = ({ onClose }) => {
  const dispatch = useDispatch();

  const user = useSelector(selectProfile);
  const loading = useSelector(selectUserLoading);

  const [preview, setPreview] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
  document.body.style.overflow = "hidden";

  return () => {
    document.body.style.overflow = "";
  };
}, []);

  // ==============================
  // Set existing user data
  // ==============================

  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName || "",
        userName: user.userName || "",
        phoneNumber: user.phoneNumber || "",
        avatar: "",
      });

      setPreview(user.avatar || "");
    }
  }, [user, reset]);

  // ==============================
  // Image preview
  // ==============================

  const handlePreview = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // ==============================
  // Submit
  // ==============================
  const onSubmit = async (data) => {

  const formData = new FormData();

  formData.append("fullName", data.fullName);
  formData.append("userName", data.userName);
  formData.append("phoneNumber", data.phoneNumber);

  if (data.avatar?.[0]) {
    formData.append("avatar", data.avatar[0]);
  }

  const result = await dispatch(updateProfile(formData));


  if (updateProfile.fulfilled.match(result)) {
    onClose();
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
          max-w-lg
          overflow-y-auto
          rounded-2xl
          bg-white
          p-6
          shadow-2xl
        "
      >
        {/* Close button */}
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
            Update Profile
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Update your personal information and profile picture.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <label
              htmlFor="avatar"
              className="group relative cursor-pointer"
            >
              <img
                src={
                  preview ||
                  "/default-avatar-profile.png"
                }
                alt="Profile preview"
                className="
                  h-28
                  w-28
                  rounded-full
                  border-4
                  border-blue-500
                  object-cover
                "
              />

              {/* Camera icon */}
              <div
                className="
                  absolute
                  bottom-1
                  right-1
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border-2
                  border-white
                  bg-blue-600
                  text-white
                  transition
                  group-hover:bg-blue-700
                "
              >
                <FaCamera size={15} />
              </div>
            </label>

            <input
              id="avatar"
              type="file"
              accept="image/*"
              className="hidden"
              {...register("avatar", {
                onChange: handlePreview,
              })}
            />

            <p className="mt-2 text-xs text-gray-500">
              Click the image to change your profile picture
            </p>
          </div>

          {/* Full Name */}
          <Input
            label="Full Name"
            placeholder="Enter full name"
            error={errors.fullName?.message}
            {...register("fullName", {
              required: "Full name is required",
            })}
          />

          {/* Username */}
          <Input
            label="Username"
            placeholder="Enter username"
            error={errors.userName?.message}
            {...register("userName", {
              required: "Username is required",
            })}
          />

          {/* Phone Number */}
          <Input
            label="Phone Number"
            type="tel"
            placeholder="Enter phone number"
            error={errors.phoneNumber?.message}
            {...register("phoneNumber", {
              required: "Phone number is required",
            })}
          />

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
    </div>
  );
};

export default UpdateProfileModal;