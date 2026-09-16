import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  verifyEmail,
  resendVerificationEmail,
} from "../../features/auth/authThunks";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const email = localStorage.getItem("verificationEmail");

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Verification email not found. Please register again.");
      navigate("/register");
      return;
    }

    if (!otp) {
      alert("Please enter the OTP.");
      return;
    }

    if (otp.length !== 6) {
      alert("OTP must be 6 digits.");
      return;
    }

    try {
      setLoading(true);

      const result = await dispatch(
        verifyEmail({
          email,
          otp,
        })
      );

      if (verifyEmail.fulfilled.match(result)) {
        // Backend has already set accessToken and refreshToken cookies
        localStorage.removeItem("verificationEmail");

        navigate("/");
      } else {
        alert(result.payload || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Verify email error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      alert("Verification email not found. Please register again.");
      navigate("/register");
      return;
    }

    try {
      setResending(true);

      const result = await dispatch(
        resendVerificationEmail(email)
      );

      if (resendVerificationEmail.fulfilled.match(result)) {
        alert("A new OTP has been sent to your email.");
        setOtp("");
      } else {
        alert(result.payload || "Unable to resend OTP.");
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Verify Your Email
          </h1>

          <p className="text-gray-500 mt-2">
            Enter the 6-digit OTP sent to your email.
          </p>

          {email && (
            <p className="text-sm text-gray-600 mt-3">
              {email}
            </p>
          )}
        </div>

        <form onSubmit={handleVerify}>
          <div className="mb-5">
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Enter OTP
            </label>

            <input
              id="otp"
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setOtp(value);
              }}
              placeholder="Enter 6-digit OTP"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6E42E5] focus:border-transparent text-center text-lg tracking-[0.4em]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-[#6E42E5] text-white font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <button
          type="button"
          onClick={handleResend}
          disabled={resending}
          className="w-full mt-4 py-3 rounded-lg border border-[#6E42E5] text-[#6E42E5] font-medium hover:bg-purple-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {resending ? "Sending..." : "Resend OTP"}
        </button>

      </div>
    </div>
  );
};

export default VerifyEmail;