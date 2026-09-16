import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import authBg from "../../assets/background-image.png";
import { register as registerUser } from "../../features/auth/authThunks";
import { selectLoading } from "../../features/auth/authSelectors";
import { loginWithGoogle } from "../../api/auth.api";

import Button from "../../components/common/Button.jsx";
import Input from "../../components/common/Input.jsx";
import PasswordInput from "../../components/common/PasswordInput.jsx";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(selectLoading);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("fullName", data.fullName);
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("password", data.password);

    const result = await dispatch(registerUser(formData));
    if (registerUser.fulfilled.match(result)) {
      localStorage.setItem("verificationEmail", data.email);
      navigate("/verify-email");
    }
  };

  return (
    <div
      className="min-h-screen bg-slate-100 flex items-center justify-start px-4 py-10"
      style={{ backgroundImage: `url(${authBg})` }}
    >
      <div className=" w-full max-w-3xl bg-white rounded-[2rem] shadow-xl translate-x-35 overflow-hidden">
        {/* Form side */}
        <div className="w-full px-6 py-10 sm:px-10">
          <h1 className="text-3xl font-bold text-slate-900">Create account</h1>

          <p className="text-slate-500 mt-1 mb-8">
            Set up your Fixora profile to start booking or offering services.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                type="text"
                placeholder="Enter full name"
                error={errors.fullName?.message}
                {...register("fullName", {
                  required: "Full name is required",
                })}
              />

              <Input
                label="Username"
                type="text"
                placeholder="Enter username"
                error={errors.userName?.message}
                {...register("userName", {
                  required: "Username is required",
                })}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
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

              <Input
                label="Email"
                type="email"
                name="email"
                placeholder="Enter your email"
                error={errors.email?.message}
                {...register("email", {
                  required: "Email is required",
                })}
              />
            </div>

            <PasswordInput
              label="Password"
              placeholder="Create a password"
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />

            <Button type="submit" loading={loading} fullWidth>
              Register
            </Button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-slate-200"></div>

            <span className="mx-3 text-slate-400 text-sm">or</span>

            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <Button
            variant="google"
            onClick={loginWithGoogle}
            leftIcon={<FaGoogle />}
          >
            Continue with Google
          </Button>

          <p className="text-center mt-6 text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-violet-600 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
