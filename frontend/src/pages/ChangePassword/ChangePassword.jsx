import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "../../components/common/Button";
import PasswordInput from "../../components/common/PasswordInput";

import { changePassword } from "../../features/user/userThunks";
import { selectChangePasswordLoading } from "../../features/user/userSelectors";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(selectChangePasswordLoading);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const newPassword = watch("newPassword");

  const onSubmit = async (data) => {
    const result = await dispatch(changePassword(data));

    if (changePassword.fulfilled.match(result)) {
      navigate("/profile");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-5">

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">

        <h1 className="text-3xl font-bold text-center mb-2">
          Change Password
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Update your account password securely.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >

          <PasswordInput
            label="Current Password"
            placeholder="Enter current password"
            error={errors.currentPassword?.message}
            {...register("currentPassword", {
              required: "Current password is required",
            })}
          />

          <PasswordInput
            label="New Password"
            placeholder="Enter new password"
            error={errors.newPassword?.message}
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm new password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) =>
                value === newPassword || "Passwords do not match",
            })}
          />

          <div className="flex gap-4 pt-4">

            <Button
              type="submit"
              loading={loading}
              fullWidth
            >
              Change Password
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/profile")}
            >
              Cancel
            </Button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default ChangePassword;