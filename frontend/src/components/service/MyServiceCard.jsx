import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaEdit,
  FaTrash,
  FaMapMarkerAlt,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";

import {
  deleteService,
  toggleServiceVisibility,
} from "../../features/services/serviceThunks";

import {
  selectDeleteServiceLoading,
  selectUpdateServiceLoading,
} from "../../features/services/serviceSelectors";

import ConfirmModal from "../common/ConfirmModal";
import UpdateServiceModal from "./UpdateServiceModal";

const MyServiceCard = ({ service }) => {
  const dispatch = useDispatch();

  const deleteLoading = useSelector(selectDeleteServiceLoading);
  const updateLoading = useSelector(selectUpdateServiceLoading);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  if (!service) {
    return null;
  }

  // ==========================
  // Delete Service
  // ==========================

  const handleDelete = async () => {
    try {
      await dispatch(deleteService(service._id)).unwrap();

      setShowDeleteModal(false);
    } catch (error) {
      console.error("Failed to delete service:", error);
    }
  };

  // ==========================
  // Toggle Visibility
  // ==========================

  const handleToggleVisibility = async () => {
    try {
      await dispatch(toggleServiceVisibility(service._id)).unwrap();
    } catch (error) {
      console.error("Failed to update service visibility:", error);
    }
  };

  // ==========================
  // Edit Service
  // ==========================

  const handleEdit = () => {
    setShowUpdateModal(true);
  };

  return (
    <>
      {/* <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"> */}
      <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-[#FFFFFF] p-5 shadow-sm transition hover:shadow-md">
        {/* Service Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
              {service.category || "Service"}
            </span>

            <h2 className="mt-3 text-xl font-bold text-gray-800">
              {service.title}
            </h2>
          </div>

          {/* Visibility Status */}
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
              service.isVisible
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {service.isVisible ? "Visible" : "Hidden"}
          </span>
        </div>

        {/* Description */}
        {service.description && (
          <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-600">
            {service.description}
          </p>
        )}
        {/* Booking Options */}
        <div className="mt-4 flex flex-wrap items-center gap-2">


          {service.bookingOptions?.includes("instant") && (
            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
              Instant Booking
            </span>
          )}

          {service.bookingOptions?.includes("scheduled") && (
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              Scheduled Booking
            </span>
          )}
        </div>

        {/* Service Information */}
        <div className="mt-5  space-y-4">
          {/* Location */}
          <div className="flex items-start gap-3">
            <FaMapMarkerAlt className="mt-1 shrink-0 text-red-500" />

            <div>
              <p className="font-medium text-gray-700">
                {service.location?.city || "Unknown City"},{" "}
                {service.location?.state || "Unknown State"}
              </p>

              {service.location?.address && (
                <p className="mt-1 text-xs text-gray-500">
                  {service.location.address}
                </p>
              )}
            </div>
          </div>

          {/* Price + Radius */}
          <div className=" flex items-center justify-between border-t border-gray-100 pt-4">
            <div>
              <p className="text-xs text-gray-500">Price</p>

              <p className="text-lg font-bold text-gray-800">
                ₹{service.price}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-gray-500">Service Radius</p>

              <p className="font-semibold text-gray-700">
                {service.serviceRadius} km
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-gray-100 pt-4">

          
          {/* Edit */}
          <button
            type="button"
            onClick={handleEdit}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            <FaEdit />
            Edit
          </button>

          {/* Visibility */}
          <button
            type="button"
            onClick={handleToggleVisibility}
            disabled={updateLoading}
            className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
              service.isVisible
                ? "bg-orange-50 text-orange-600 hover:bg-orange-100"
                : "bg-green-50 text-green-600 hover:bg-green-100"
            }`}
          >
            {service.isVisible ? (
              <>
                <FaToggleOff />
                Hide
              </>
            ) : (
              <>
                <FaToggleOn />
                Show
              </>
            )}
          </button>

          {/* Delete */}
          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            disabled={deleteLoading}
            className="flex items-center justify-center gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaTrash />
            Delete
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <ConfirmModal
          title="Delete Service?"
          message={`Are you sure you want to delete "${service.title}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
          loading={deleteLoading}
        />
      )}

      {showUpdateModal && (
        <UpdateServiceModal
          service={service}
          onClose={() => setShowUpdateModal(false)}
        />
      )}
    </>
  );
};

export default MyServiceCard;
