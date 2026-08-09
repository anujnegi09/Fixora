import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { resetPassword } from "../../features/auth/authThunks";
import { selectResetPasswordLoading } from "../../features/auth/authSelectors";

import Button from "../../components/common/Button.jsx";
import PasswordInput from "../../components/common/PasswordInput.jsx";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useParams();

  const changePasswordLoading = useSelector(selectResetPasswordLoading);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    const result = await dispatch(
      resetPassword({
        token,
        formData: {
          newPassword: data.password,
          confirmPassword: data.confirmPassword,
        },
      }),
    );

    if (resetPassword.fulfilled.match(result)) {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-5">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600">
          Reset Password
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Enter your new password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Password */}

          {/* <div>

            <label className="font-medium">
              New Password
            </label>

            <div className="relative mt-2">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter new password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
                className="w-full border rounded-lg p-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-4"
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}

          </div> */}

          <PasswordInput
            label="Password"
            placeholder="Create a new password"
            error={errors.password?.message}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />

          {/* Confirm Password */}

          {/* <div>

            <label className="font-medium">
              Confirm Password
            </label>

            <div className="relative mt-2">

              <input
                type={
                  showConfirm
                    ? "text"
                    : "password"
                }
                placeholder="Confirm password"
                {...register(
                  "confirmPassword",
                  {
                    required:
                      "Confirm password is required",
                    validate: (value) =>
                      value === password ||
                      "Passwords do not match",
                  }
                )}
                className="w-full border rounded-lg p-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirm(!showConfirm)
                }
                className="absolute right-4 top-4"
              >
                {showConfirm ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}

          </div> */}

          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register("password", {
              required: "Password is required",
            })}
          />

          <Button type="submit" loading={changePasswordLoading}>
            Change Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate, useParams } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { toast } from "react-hot-toast";

// import { resetPassword } from "../../api/auth.api";

// const ResetPassword = () => {
//   const { token } = useParams();

//   const navigate = useNavigate();

//   const [showPassword, setShowPassword] = useState(false);

//   const [showConfirmPassword, setShowConfirmPassword] =
//     useState(false);

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors, isSubmitting },
//   } = useForm();

//   const password = watch("password");

//   const onSubmit = async (data) => {
//     try {
//       const response = await resetPassword(
//         token,
//         data.password
//       );

//       toast.success(
//         response.message ||
//           "Password reset successfully."
//       );

//       navigate("/login");
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message ||
//           "Password reset failed."
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-5">
//       <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">

//         <h1 className="text-3xl font-bold text-center text-blue-600">
//           Reset Password
//         </h1>

//         <p className="text-center text-gray-500 mt-2 mb-8">
//           Enter your new password.
//         </p>

//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="space-y-5"
//         >

//           {/* Password */}

//           <div>

//             <label className="font-medium">
//               New Password
//             </label>

//             <div className="relative mt-2">

//               <input
//                 type={
//                   showPassword
//                     ? "text"
//                     : "password"
//                 }
//                 placeholder="New Password"
//                 {...register("password", {
//                   required:
//                     "Password is required",
//                   minLength: {
//                     value: 6,
//                     message:
//                       "Minimum 6 characters",
//                   },
//                 })}
//                 className="w-full border rounded-lg p-3 pr-12"
//               />

//               <button
//                 type="button"
//                 onClick={() =>
//                   setShowPassword(
//                     !showPassword
//                   )
//                 }
//                 className="absolute right-4 top-4"
//               >
//                 {showPassword ? (
//                   <FaEyeSlash />
//                 ) : (
//                   <FaEye />
//                 )}
//               </button>

//             </div>

//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.password.message}
//               </p>
//             )}

//           </div>

//           {/* Confirm Password */}

//           <div>

//             <label className="font-medium">
//               Confirm Password
//             </label>

//             <div className="relative mt-2">

//               <input
//                 type={
//                   showConfirmPassword
//                     ? "text"
//                     : "password"
//                 }
//                 placeholder="Confirm Password"
//                 {...register(
//                   "confirmPassword",
//                   {
//                     required:
//                       "Confirm password is required",
//                     validate: (value) =>
//                       value === password ||
//                       "Passwords do not match",
//                   }
//                 )}
//                 className="w-full border rounded-lg p-3 pr-12"
//               />

//               <button
//                 type="button"
//                 onClick={() =>
//                   setShowConfirmPassword(
//                     !showConfirmPassword
//                   )
//                 }
//                 className="absolute right-4 top-4"
//               >
//                 {showConfirmPassword ? (
//                   <FaEyeSlash />
//                 ) : (
//                   <FaEye />
//                 )}
//               </button>

//             </div>

//             {errors.confirmPassword && (
//               <p className="text-red-500 text-sm mt-1">
//                 {
//                   errors.confirmPassword
//                     .message
//                 }
//               </p>
//             )}

//           </div>

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
//           >
//             {isSubmitting
//               ? "Updating..."
//               : "Reset Password"}
//           </button>

//         </form>

//       </div>
//     </div>
//   );
// };

// export default ResetPassword;
