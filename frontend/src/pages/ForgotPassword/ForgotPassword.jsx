import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { forgotPassword } from "../../features/auth/authThunks";
import {
  selectForgotPasswordLoading,
} from "../../features/auth/authSelectors";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const loading = useSelector(selectForgotPasswordLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  
  const onSubmit = async (data) => {
    const result = await dispatch(forgotPassword({email :data.email}));

    if (forgotPassword.fulfilled.match(result)) {
      reset();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-5">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-blue-600">
          Forgot Password
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Enter your registered email address.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          <div>

            <label className="font-medium">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
              })}
              className="w-full mt-2 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading
              ? "Sending..."
              : "Send Reset Link"}
          </button>

        </form>

        <p className="text-center mt-6">

          Remember your password?

          <Link
            to="/login"
            className="ml-1 text-blue-600 hover:underline"
          >
            Login
          </Link>

        </p>

      </div>
    </div>
  );
};

export default ForgotPassword;