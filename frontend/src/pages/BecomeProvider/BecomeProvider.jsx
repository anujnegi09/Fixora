import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/common/Loading.jsx";

import {
  selectMyServices,
  selectServiceLoading,
  selectServiceError,
} from "../../features/services/serviceSelectors.js";

import { getMyServices } from "../../features/services/serviceThunks.js";

import { selectIsAuthenticated } from "../../features/auth/authSelectors.js";

import EmptyState from "../../components/common/EmptyState.jsx";
import MyServiceCard from "../../components/service/MyServiceCard.jsx";

import { showErrorToast } from "../../utils/customtoast";

const BecomeProvider = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(selectIsAuthenticated);

  const myServices = useSelector(selectMyServices);
  const loading = useSelector(selectServiceLoading);
  const error = useSelector(selectServiceError);

  // Fetch user's services only when logged in
  useEffect(() => {
    if (!isAuthenticated) return;

    dispatch(getMyServices());
  }, [dispatch, isAuthenticated]);

  // Handle Create Service click
  const handleCreateService = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();

      showErrorToast("Please login first to create a service.");

      return;
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-28">
      {/* Heading */}

      <div className="mb-28 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#0F172A]">
            Become a Provider
          </h1>

          <p className="mt-2 text-gray-500">
            Manage all your services from one place.
          </p>
        </div>

        {/* Create Service */}

        <Link
          to="/create-service"
          onClick={handleCreateService}
          className="
            inline-flex
            items-center
            gap-2
            rounded-lg
            bg-red-800
            px-5
            py-2.5
            text-sm
            font-semibold
            text-white
            shadow-md
            transition-all
            duration-200
            hover:bg-red-700
            hover:shadow-lg
            active:scale-95
            focus:outline-none
            focus:ring-2
            focus:ring-red-800
            focus:ring-offset-2
          "
        >
          <span className="text-lg">+</span>
          Create Service
        </Link>
      </div>

      {/* Login Required */}

      {!isAuthenticated ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 px-6 py-20 text-center">
          <h2 className="text-2xl font-semibold text-[#0F172A]">
            Login Required
          </h2>

          <p className="mt-3 max-w-md text-gray-500">
            Please login first to manage your services and become a provider.
          </p>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="
              mt-6
              rounded-lg
              bg-blue-600
              px-6
              py-2.5
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-blue-700
              active:scale-95
            "
          >
            Login
          </button>
        </div>
      ) : (
        <>
          {/* Loading */}

          {loading && <Loading fullscreen text="Loading your services" />}

          {/* Error */}

          {!loading && error && (
            <div className="rounded-lg bg-red-50 p-4 text-center text-red-600">
              {error}
            </div>
          )}

          {/* Empty */}

          {!loading && !error && myServices.length === 0 && (
            <EmptyState
              title="No Services Yet"
              message="Create your first service and start receiving bookings."
              buttonText="Create Service"
            />
          )}

          {/* Services */}

          {!loading && myServices.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {myServices.map((service) => (
                <MyServiceCard key={service._id} service={service} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BecomeProvider;