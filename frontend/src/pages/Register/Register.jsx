import { useState , useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { register as registerUser } from "../../features/auth/authThunks";
import { selectLoading } from "../../features/auth/authSelectors";
import { loginWithGoogle } from "../../api/auth.api";
import { State, City } from "country-state-city";

import Button from "../../components/common/Button.jsx";
import Input from "../../components/common/Input.jsx"
import PasswordInput from "../../components/common/PasswordInput.jsx"


const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(selectLoading);

  const [showPassword, setShowPassword] = useState(false);

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedStateCode, setSelectedStateCode] = useState("");


  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    setStates(
        State.getStatesOfCountry("IN")
    );
  }, []);

  const {
    register,
    handleSubmit,
    // watch,
    setValue,
    formState: { errors },
  } = useForm();

  const handleStateChange = (e) => {

    const stateCode = e.target.value;

    setSelectedStateCode(stateCode);

    const selectedState = states.find(
        state => state.isoCode === stateCode
    );

    setValue("state", selectedState.name);

    setCities(
        City.getCitiesOfState(
            "IN",
            stateCode
        )
    );

    setValue("city", "");
};

  // const password = watch("password");

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
    console.log(data.phoneNumber);

    const result = await dispatch(registerUser(formData));

    if (registerUser.fulfilled.match(result)) {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-blue-600">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Join Fixora today
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          {/* Full Name */}

          {/* <div>
            <label className="font-medium">Full Name</label>

            <input
              type="text"
              placeholder="Enter full name"
              {...register("fullName", {
                required: "Full name is required",
              })}
              className="w-full mt-2 border rounded-lg p-3"
            />

            {errors.fullName && (
              <p className="text-red-500 text-sm">
                {errors.fullName.message}
              </p>
            )}
          </div> */}
      <Input
  label="Full Name"
  type="text"
  placeholder="Enter full name"
  error={errors.fullName?.message}
  {...register("fullName", {
    required: "Full name is required",
  })}
/>

          {/* Username */}

          {/* <div>
            <label className="font-medium">Username</label>

            <input
              type="text"
              placeholder="Enter username"
              {...register("userName", {
                required: "Username is required",
              })}
              className="w-full mt-2 border rounded-lg p-3"
            />

            {errors.userName && (
              <p className="text-red-500 text-sm">
                {errors.userName.message}
              </p>
            )}
          </div> */}
         <Input
  label="userName"
  type="text"
  placeholder="Enter username"
  error={errors.userName?.message}
  {...register("userName", {
    required: "Username is required",
  })}
/>

          {/* Phone Number */}

{/* <div>
  <label className="font-medium">
    Phone Number
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
</div>   */}

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


          {/* Email */}

          {/* <div>
            <label className="font-medium">Email</label>

            <input
              type="email"
              placeholder="Enter email"
              {...register("email", {
                required: "Email is required",
              })}
              className="w-full mt-2 border rounded-lg p-3"
            />

            {errors.email && (
              <p className="text-red-500 text-sm">
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


 {/* State */}

<div>

<label className="font-medium">
State
</label>

<select
    className="w-full mt-2 border rounded-lg p-3"
    onChange={handleStateChange}
>

<option value="">
Select State
</option>

{
states.map((state)=>(
<option
key={state.isoCode}
value={state.isoCode}
>
{state.name}
</option>
))
}

</select>

<input
type="hidden"
{...register("state",{
required:"State is required"
})}
/>

{errors.state && (
<p className="text-red-500 text-sm">
{errors.state.message}
</p>
)}

</div>



      {/* City */}

<div>

<label className="font-medium">
City
</label>

<select
className="w-full mt-2 border rounded-lg p-3"

onChange={(e)=>setValue("city",e.target.value)}

disabled={!selectedStateCode}
>

<option value="">
Select City
</option>

{
cities.map((city)=>(
<option
key={city.name}
value={city.name}
>
{city.name}
</option>
))
}

</select>

<input
type="hidden"
{...register("city",{
required:"City is required"
})}
/>

{errors.city && (
<p className="text-red-500 text-sm">
{errors.city.message}
</p>
)}

</div>

          {/* Password */}

          {/* <div>
            <label className="font-medium">Password</label>

            <div className="relative mt-2">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
                className="w-full border rounded-lg p-3 pr-12"
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
              <p className="text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}
          </div> */}

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

          {/* Confirm Password */}

          {/* <div>
            <label className="font-medium">
              Confirm Password
            </label>

            <div className="relative mt-2">

              <input
                type={
                  showConfirmPassword ? "text" : "password"
                }
                placeholder="Confirm password"
                {...register("confirmPassword", {
                  required: "Confirm your password",
                  validate: (value) =>
                    value === password ||
                    "Passwords do not match",
                })}
                className="w-full border rounded-lg p-3 pr-12"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-4 top-4"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div> */}

          {/* Profile Photo */}

          <div>
            <label className="font-medium">
              Profile Photo
            </label>

            <input
              type="file"
              accept="image/*"
              {...register("profilePhoto")}
              className="w-full mt-2"
            />
          </div>

          {/* Register Button */}
          <Button
            type="submit"
            loading={loading}
            fullWidth
          >
          Register
          </Button>

        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t"></div>
          <span className="mx-3 text-gray-500">
            OR
          </span>
          <div className="flex-grow border-t"></div>
        </div>

        {/* <button
          onClick={loginWithGoogle}
          className="w-full border rounded-lg py-3 flex justify-center items-center gap-3 hover:bg-gray-100"
        >
          <FaGoogle />
          Continue with Google
        </button> */}
        <Button
    variant="google"
    size=""
    onClick={loginWithGoogle}
    leftIcon={<FaGoogle />}
>
    Continue with Google
</Button>

        <p className="text-center mt-6">
          Already have an account?
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

export default Register;




 {/* <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Register"}
          </button> */}