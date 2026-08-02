import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { verifyEmail } from "../../api/auth.api";

const VerifyEmail = () => {
  const { token } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await verifyEmail(token);

        setVerified(true);
        setMessage(response.message || "Email verified successfully.");
      } catch (error) {
        setVerified(false);

        setMessage(
          error.response?.data?.message ||
            "Email verification failed."
        );
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">
          Verifying your email...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-5">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">

        {verified ? (
          <>
            <FaCheckCircle
              className="text-green-500 mx-auto mb-4"
              size={70}
            />

            <h1 className="text-3xl font-bold mb-3">
              Email Verified
            </h1>

            <p className="text-gray-600 mb-8">
              {message}
            </p>

            <button
              onClick={() => navigate("/login")}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Go to Login
            </button>
          </>
        ) : (
          <>
            <FaTimesCircle
              className="text-red-500 mx-auto mb-4"
              size={70}
            />

            <h1 className="text-3xl font-bold mb-3">
              Verification Failed
            </h1>

            <p className="text-gray-600 mb-8">
              {message}
            </p>

            <Link
              to="/register"
              className="inline-block w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600"
            >
              Register Again
            </Link>
          </>
        )}

      </div>
    </div>
  );
};

export default VerifyEmail;