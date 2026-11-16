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
    <div className="min-h-screen flex items-center justify-center bg-[#f7f9fc] px-4 py-10">
      <div className="w-full max-w-md rounded-[2rem] border border-slate-100 bg-white p-8 shadow-2xl shadow-slate-900/10">

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#0d1b2a]">
            Verify Your Email
          </h1>

          <p className="mt-2 text-slate-500">
            Enter the 6-digit OTP sent to your email.
          </p>

          {email && (
            <p className="mt-3 text-sm text-slate-600">
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
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-lg tracking-[0.4em] outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <button
          type="button"
          onClick={handleResend}
          disabled={resending}
          className="mt-4 w-full rounded-xl border border-blue-200 py-3 font-semibold text-blue-700 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {resending ? "Sending..." : "Resend OTP"}
        </button>

      </div>
    </div>
  );
};

export default VerifyEmail;
