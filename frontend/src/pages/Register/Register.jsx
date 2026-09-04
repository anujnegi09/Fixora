import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { register as registerUser } from "../../features/auth/authThunks";
import { selectLoading } from "../../features/auth/authSelectors";
import { loginWithGoogle } from "../../api/auth.api";
import { State, City } from "country-state-city";

import Button from "../../components/common/Button.jsx";
import Input from "../../components/common/Input.jsx";
import PasswordInput from "../../components/common/PasswordInput.jsx";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(selectLoading);

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedStateCode, setSelectedStateCode] = useState("");

  useEffect(() => {
    setStates(State.getStatesOfCountry("IN"));
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleStateChange = (e) => {
    const stateCode = e.target.value;

    setSelectedStateCode(stateCode);

    const selectedState = states.find((state) => state.isoCode === stateCode);

    setValue("state", selectedState.name);

    setCities(City.getCitiesOfState("IN", stateCode));

    setValue("city", "");
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("fullName", data.fullName);
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("password", data.password);
    formData.append("state", data.state);
    formData.append("city", data.city);

    if (data.profilePhoto?.[0]) {
      formData.append("profilePhoto", data.profilePhoto[0]);
    }

    const result = await dispatch(registerUser(formData));

    if (registerUser.fulfilled.match(result)) {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-white rounded-[2rem] shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Form side */}
        <div className="w-full md:w-3/5 px-6 py-10 sm:px-10 mr-10">
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

          <p className="text-center mt-6 text-sm text-slate-600 md:hidden">
            Already have an account?{" "}
            <Link to="/login" className="text-violet-600 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        {/* Welcome side */}
        <div className="hidden md:flex md:w-2/5 relative">
          <div className="absolute inset-0 -ml-10 rounded-l-[100px] bg-gradient-to-br from-violet-600 to-indigo-700 flex flex-col items-center justify-center text-center px-10 text-white">
            <h2 className="text-3xl font-bold">Hello, neighbor!</h2>
            <p className="mt-4 text-violet-100 text-sm leading-relaxed">
              Already booking or offering services on Fixora? Sign back in to
              pick up right where you left off.
            </p>
            <Link
              to="/login"
              className="mt-8 border border-white rounded-lg px-8 py-3 text-sm font-semibold hover:bg-white hover:text-violet-700 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;