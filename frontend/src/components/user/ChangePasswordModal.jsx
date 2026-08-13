import {useEffect } from "react";
import {useForm} from "react-hook-form";
import {useDispatch ,useSelector} from "react-redux";

import Button from "../common/Button";
import PasswordInput from "../common/PasswordInput";

import {changePassword} from "../../features/user/userThunks.js";
import {selectChangePasswordLoading,  } from "../../features/user/userSelectors.js";

import { IoClose } from "react-icons/io5";

const ChangePasswordModal = ({ onClose }) =>{
    const dispatch = useDispatch();

    const loading = useSelector(selectChangePasswordLoading);

    const {
        register,
        handleSubmit,
        watch,
        formState : {errors},
    } = useForm();

    useEffect(() => {
      document.body.style.overflow = "hidden";
    
      return () => {
        document.body.style.overflow = "";
      };
    }, []);

    const newPassword = watch("newPassword");
    const onSubmit = async (data) =>{
        const result = await dispatch(changePassword(data));

        if (changePassword.fulfilled.match(result)) {
            onClose();
        }
    };

    return(
        <div className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-black/50
        px-4
        py-6
        backdrop-blur-sm"
        >
            {/* modal */}
            <div className="relative
          max-h-[90vh]
          w-full
          max-w-lg
          overflow-y-auto
          rounded-2xl
          bg-white
          p-6
          shadow-2xl">

            {/* close button */}

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
                  hover:text-gray-800">
                    <IoClose size={24} />   
            </button>

            {/* header */}
            <div className="mb-6 pr-10">
                <h1 className="text-2xl font-bold text-gray-800">
                    Change Password
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                   Update your account password securely.
                </p>
            </div>

            {/*form */}
            <form 
            onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              minLength :{
                value : 6,
                message :"Password must be at Least 6 Charactors",
              },
            })}
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm new password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value)=>
                value === newPassword || "Password do not match",
            })}
          />

          <div className="flex gap-4 pt-4">
            <Button type="submit" loading={loading} fullWidth>
              Change Password
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
            </form>
          </div>
        </div>
    )
}

export default ChangePasswordModal;
