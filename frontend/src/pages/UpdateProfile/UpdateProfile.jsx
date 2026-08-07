import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { getProfile, updateProfile } from "../../features/user/userThunks.js";
import {
  selectProfile,
  selectUserLoading,
} from "../../features/user/userSelectors.js";

import Button from "../../components/common/Button.jsx";
import Input from "../../components/common/Input.jsx";
// import { State, City } from "country-state-city";



const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectProfile);
  const loading = useSelector(selectUserLoading);

  const [preview, setPreview] = useState("");

  // const [states, setStates] = useState([]);
  // const [cities, setCities] = useState([]);
  // const [selectedStateCode, setSelectedStateCode] = useState("");

  // useEffect(() => {
  //   setStates(
  //       State.getStatesOfCountry("IN")
  //   );
  // }, []);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

//    const handleStateChange = (e) => {

//     const stateCode = e.target.value;

//     setSelectedStateCode(stateCode);

//     const selectedState = states.find(
//         state => state.isoCode === stateCode
//     );

//     setValue("state", selectedState.name);

//     setCities(
//         City.getCitiesOfState(
//             "IN",
//             stateCode
//         )
//     );

//     setValue("city", "");
// };

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName || "",
        userName: user.userName || "",
        phoneNumber: user.phoneNumber || "",
        // address: user.address || "",
        // city: user.city || "",
        // state: user.state || "",
      });

      setPreview(user.profilePhoto || "");
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === "profilePhoto") {
        if (data.profilePhoto?.[0]) {
          formData.append("profilePhoto", data.profilePhoto[0]);
        }
      } else {
        formData.append(key, data[key]);
      }
    });

    const result = await dispatch(updateProfile(formData));

    if (updateProfile.fulfilled.match(result)) {
      navigate("/profile");
    }
  };

  const handlePreview = (e) => {
    if (e.target.files[0]) {
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  if (loading && !user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-5">

      <div className="bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-8">
          Update Profile
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >

          <div className="flex flex-col items-center">

            {/* <img
              src={
                preview ||
                "https://via.placeholder.com/150"
              }
              alt="preview"
              className="w-36 h-36 rounded-full object-cover border"
            /> */}
            <label
  htmlFor="profilePhoto"
  className="cursor-pointer group relative"
>

  <img
    src={preview || "https://via.placeholder.com/150"}
    alt="preview"
    className="w-36 h-36 rounded-full object-cover border-4 border-blue-500"
  />

  <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white font-semibold">
    Change Photo
  </div>

</label>

            <input
  id="profilePhoto"
  type="file"
  accept="image/*"
  className="hidden"
  {...register("profilePhoto")}
  onChange={handlePreview}
/>

          </div>

          <Input
            label="Full Name"
            placeholder="Enter full name"
            error={errors.fullName?.message}
            {...register("fullName", {
              required: "Full name is required",
            })}
          />

          <Input
            label="Username"
            placeholder="Enter username"
            error={errors.userName?.message}
            {...register("userName", {
              required: "Username is required",
            })}
          />

          <Input
            label="Phone Number"
            placeholder="Enter phone number"
            error={errors.phoneNumber?.message}
            {...register("phoneNumber", {
              required: "Phone number is required",
            })}
          />

          {/* <Input
            label="Address"
            placeholder="Enter address"
            {...register("address")}
          /> */}

          {/* <Input
            label="City"
            placeholder="Enter city"
            {...register("city")}
          /> */}

          {/* <Input
            label="State"
            placeholder="Enter state"
            {...register("state")}
          /> */}

           {/* State */}

{/* <div>

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

</div> */}

  {/* City */}
{/* <div>

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

</div> */}

          <div className="flex gap-4 pt-4">

            <Button
              type="submit"
              loading={loading}
            >
              Save Changes
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

export default UpdateProfile;