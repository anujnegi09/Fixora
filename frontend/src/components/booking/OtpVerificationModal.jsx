import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTimes, FaCheckCircle } from "react-icons/fa";

import { verifyCompletionOTP } from "../../features/bookings/bookingThunks";
import { selectVerifyOtpLoading } from "../../features/bookings/bookingSelectors";

const OtpVerificationModal = ({
  bookingId,
  onVerified,
  onCancel,
  title = "Verify Completion",
  message = "Ask the customer for the 6-digit OTP sent to their notification and enter it below to complete the booking.",
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  const dispatch = useDispatch();

  const verifyOtpLoading = useSelector(selectVerifyOtpLoading);

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");

    setOtp(value);
    setOtpError("");
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      setOtpError("Please enter the 6-digit OTP.");
      return;
    }

    try {
      setOtpError("");

      await dispatch(
        verifyCompletionOTP({
          bookingId,
          otp,
        })
      ).unwrap();

      // OTP verified successfully
      onVerified();
    } catch (error) {
      setOtpError(
        error?.message || "Invalid OTP. Please try again."
      );
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100">
              <FaCheckCircle className="text-blue-600" />
            </div>

            <h2 className="text-xl font-semibold text-gray-800">
              {title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onCancel}
            disabled={verifyOtpLoading}
            className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Message */}
        <p className="mt-5 text-sm leading-6 text-gray-600">
          {message}
        </p>

        {/* OTP Input */}
        <div className="mt-5">
          <label
            htmlFor="completion-otp"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Enter OTP
          </label>

          <input
            id="completion-otp"
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={otp}
            onChange={handleOtpChange}
            placeholder="Enter 6-digit OTP"
            autoFocus
            disabled={verifyOtpLoading}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-center text-xl font-semibold tracking-[0.4em] outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
          />

          {/* Error */}
          {otpError && (
            <p className="mt-2 text-center text-sm font-medium text-red-600">
              {otpError}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-7 flex justify-end gap-3">
          {/* Cancel */}
          <button
            type="button"
            onClick={onCancel}
            disabled={verifyOtpLoading}
            className="rounded-lg border border-gray-300 px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {cancelText}
          </button>

          {/* Confirm */}
          <button
            type="button"
            onClick={handleVerifyOTP}
            disabled={verifyOtpLoading || otp.length !== 6}
            className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {verifyOtpLoading ? "Verifying..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationModal;




// import { FaTimes, FaCheckCircle } from "react-icons/fa";

// const OtpVerificationModal = ({
//   title = "Verify Completion",
//   message = "Ask the customer for the 6-digit OTP sent to their notification and enter it below to complete the booking.",
//   confirmText = "Confirm",
//   cancelText = "Cancel",
//   otp,
//   setOtp,
//   otpError,
//   setOtpError,
//   verifyOtpLoading = false,
//   onConfirm,
//   onCancel,
// }) => {
//   return (
//     <div
//       className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
//       onClick={onCancel}
//     >
//       <div
//         className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header */}
//         <div className="flex items-start justify-between">
//           <div className="flex items-center gap-3">
//             <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100">
//               <FaCheckCircle className="text-blue-600" />
//             </div>

//             <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
//           </div>

//           <button
//             type="button"
//             onClick={onCancel}
//             disabled={verifyOtpLoading}
//             className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             <FaTimes size={18} />
//           </button>
//         </div>

//         {/* Message */}
//         <p className="mt-5 text-sm leading-6 text-gray-600">{message}</p>

//         {/* OTP Input */}
//         <div className="mt-5">
//           <label
//             htmlFor="completion-otp"
//             className="mb-2 block text-sm font-medium text-gray-700"
//           >
//             Enter OTP
//           </label>

//           <input
//             id="completion-otp"
//             type="text"
//             inputMode="numeric"
//             maxLength={6}
//             value={otp}
//             onChange={(e) => {
//               const value = e.target.value.replace(/\D/g, "");
//               setOtp(value);
//               setOtpError("");
//             }}
//             placeholder="Enter 6-digit OTP"
//             className="w-full rounded-lg border border-gray-300 px-4 py-3 text-center text-xl font-semibold tracking-[0.4em] outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//             autoFocus
//           />

//           {/* Error */}
//           {otpError && (
//             <p className="mt-2 text-center text-sm font-medium text-red-600">
//               {otpError}
//             </p>
//           )}
//         </div>

//         {/* Buttons */}
//         <div className="mt-7 flex justify-end gap-3">
//           <button
//             type="button"
//             onClick={onCancel}
//             disabled={verifyOtpLoading}
//             className="rounded-lg border border-gray-300 px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             {cancelText}
//           </button>

//           <button
//             type="button"
//             onClick={onConfirm}
//             disabled={verifyOtpLoading || otp.length !== 6}
//             className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
//           >
//             {verifyOtpLoading ? "Verifying..." : confirmText}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OtpVerificationModal;