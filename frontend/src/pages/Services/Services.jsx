import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showErrorToast } from "../../utils/customtoast";
import { getAllServices } from "../../features/services/serviceThunks";
import Loading from "../../components/common/Loading.jsx";
import { FaMapMarkerAlt } from "react-icons/fa";

import {
  selectServices,
  selectServiceLoading,
  selectServiceError,
} from "../../features/services/serviceSelectors";

import { selectUserLocation } from "../../features/user/userSelectors";
import { selectIsAuthenticated } from "../../features/auth/authSelectors";
import { updateLocation } from "../../features/user/userThunks";

import ServiceCard from "../../components/service/ServiceCard";
import ServicePagination from "../../components/service/Pagination";
import ServiceSearchHeader from "../../components/service/ServiceSearchHeader";
import LocationModal from "../../components/location/LocationModal";

const Services = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const services = useSelector(selectServices);
  const loading = useSelector(selectServiceLoading);
  const error = useSelector(selectServiceError);

  const selectedLocation = useSelector(selectUserLocation);
  const latitude = selectedLocation?.coordinates?.coordinates?.[1];
  const longitude = selectedLocation?.coordinates?.coordinates?.[0];

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);

  const [showLocationModal, setShowLocationModal] = useState(false);

  const hasLocation = latitude !== undefined && longitude !== undefined;
  // Reset page whenever search/filter changes

  useEffect(() => {
    setPage(1);
  }, [search, category, sortBy]);

  // Fetch services
  useEffect(() => {
    if (!isAuthenticated || !hasLocation) return;
    dispatch(
      getAllServices({
        search,
        category,
        sortBy,
        page,
        latitude,
        longitude,
      }),
    );
  }, [
    dispatch,
    isAuthenticated,
    hasLocation,
    search,
    category,
    sortBy,
    page,
    latitude,
    longitude,
  ]);

  const handleLocationSelect = async (location) => {
    if (!isAuthenticated) {
      showErrorToast("Please login first to save your location.");
      return;
    }
    try {
      await dispatch(updateLocation(location)).unwrap();
      setShowLocationModal(false);
    } catch (error) {
      console.error("Failed to update location:", error);
      showErrorToast(
        typeof error === "string" ? error : "Failed to update your location.",
      );
    }
  };
  return (
    <div className="my-2 mx-auto max-w-7xl px-5 py-24 scrollbar-hide">
      <ServiceSearchHeader
        location={
          selectedLocation?.city
            ? `${selectedLocation.city}, ${selectedLocation.state}`
            : "Select Location"
        }
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onLocationClick={() => {
          if (!isAuthenticated) {
            showErrorToast("Please login first to select your location.");
            return;
          }
          setShowLocationModal(true);
        }}
        isLocationOpen={showLocationModal}
      />

      {showLocationModal && (
        <LocationModal
          onClose={() => setShowLocationModal(false)}
          onLocationSelect={handleLocationSelect}
        />
      )}

      {!isAuthenticated ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="max-w-md text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
              <FaMapMarkerAlt className="text-2xl text-blue-600" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800">Login Required</h2>

            <p className="mt-2 text-gray-500">
              Please login first to see services and professionals near you.
            </p>
          </div>
        </div>
      ) : !hasLocation ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="max-w-md text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
              <FaMapMarkerAlt className="text-2xl text-blue-600" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800">
              Select Your Location
            </h2>

            <p className="mt-2 text-gray-500">
              Please select your location first so we can show you services and
              professionals near you.
            </p>

            <button
              type="button"
              onClick={() => setShowLocationModal(true)}
              className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
            >
              Select Location
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Loading */}
          {loading && <Loading fullscreen text="loading services" />}

          {/* Error */}
          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-red-600">{error}</div>
          )}

          {/* Empty */}
          {!loading && services.length === 0 && (
            <div className="py-16 text-center">
              <h2 className="text-2xl font-semibold">No Services Found</h2>

              <p className="mt-2 text-gray-500">
                Try changing your location or search filters.
              </p>
            </div>
          )}

          {/* Services */}
          {!loading && services.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {services.length > 0 && (
            <div className="mt-10">
              <ServicePagination currentPage={page} onPageChange={setPage} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Services;
