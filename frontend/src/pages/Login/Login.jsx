import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { login ,checkAuthentication, } from "../../features/auth/authThunks";
import { selectLoading } from "../../features/auth/authSelectors";
import { loginWithGoogle } from "../../api/auth.api";

import Button from "../../components/common/Button.jsx";
import Input from "../../components/common/Input.jsx";
import PasswordInput from "../../components/common/PasswordInput.jsx";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(selectLoading);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmit = async (data) => {
  try {
    console.log("Login started");

    await dispatch(login(data)).unwrap();
    console.log("Login success");

    await dispatch(checkAuthentication()).unwrap();
    console.log("Check auth success");

    navigate("/");
  } catch (error) {
    console.log("ERROR =>", error);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-5">
      <div className="w-full max-w-md rounded-xl bg-white shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-blue-600">
          Fixora
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Welcome Back 👋
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          {/* Email */}

          {/* <div>
            <label className="font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
              })}
              className="mt-2 w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div> */}

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

          {/* Password */}

          {/* <div>

            <label className="font-medium">
              Password
            </label>

            <div className="relative mt-2">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                })}
                className="w-full rounded-lg border p-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
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
  placeholder="Enter your password"
  error={errors.password?.message}
  {...register("password", {
    required: "Password is required",
  })}
/>

          <div className="text-right">

            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline text-sm"
            >
              Forgot Password?
            </Link>

          </div>

          <Button
            type="submit"
            loading={loading}
            fullWidth
          >
            Login
          </Button>

          

        </form>

        <div className="my-6 flex items-center">

          <div className="flex-grow border-t"></div>

          <span className="mx-3 text-gray-500">
            OR
          </span>

          <div className="flex-grow border-t"></div>

        </div>

        <Button
    variant="google"
    size=""
    onClick={loginWithGoogle}
    leftIcon={<FaGoogle />}
>
    Continue with Google
</Button>

        <p className="mt-6 text-center text-sm">

          Don't have an account?

          <Link
            to="/register"
            className="ml-1 text-blue-600 hover:underline"
          >
            Register
          </Link>

        </p>

      </div>
    </div>
  );
};

export default Login;











{/* <button
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Logging In..." : "Login"}
          </button> */}




           {/* <button
          onClick={loginWithGoogle}
          className="flex items-center justify-center gap-3 w-full border rounded-lg py-3 hover:bg-gray-100 transition"
        >
          <FaGoogle />

          Continue with Google
        </button> */}