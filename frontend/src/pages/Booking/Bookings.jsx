import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import {
  getMyBookings,
  getBookingsForMyServices,
  requestCompletion,
  getBookingById,
  deleteBooking,
} from "../../features/bookings/bookingThunks";

import {
  selectMyBookings,
  selectServiceBookings,
  selectBooking,
  selectBookingLoading,
  selectBookingError,
  selectUpdateBookingLoading,
  selectDeleteBookingLoading,
} from "../../features/bookings/bookingSelectors";

import { addReview } from "../../features/reviews/reviewThunks";

import { selectAddReviewLoading } from "../../features/reviews/reviewSelectors";

import BookingTabs from "../../components/booking/BookingTabs";
import BookingCard from "../../components/booking/BookingCard";
import OtpVerificationModal from "../../components/booking/OtpVerificationModal";
import BookingDetailModal from "../../components/booking/BookingDetailModal";
import UpdateBookingModal from "../../components/booking/UpdateBookingModal";
import DeleteBookingModal from "../../components/booking/DeleteBookingModal";
import RateReviewModal from "../../components/review/ReviewModal";

const Bookings = () => {
  const dispatch = useDispatch();

  // ==========================================
  // UI STATE
  // ==========================================

  const [activeTab, setActiveTab] = useState("my-bookings");
  const [searchParams] = useSearchParams();

  const [selectedBooking, setSelectedBooking] = useState(null);

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showReviewModal, setShowReviewModal] = useState(false);
  // ==========================================
  // REDUX STATE
  // ==========================================

  const myBookings = useSelector(selectMyBookings);
  const serviceBookings = useSelector(selectServiceBookings);

  const booking = useSelector(selectBooking);

  const loading = useSelector(selectBookingLoading);
  const error = useSelector(selectBookingError);
  const reviewLoading = useSelector(selectAddReviewLoading);

  const updateBookingLoading = useSelector(selectUpdateBookingLoading);

  const deleteBookingLoading = useSelector(selectDeleteBookingLoading);

  // ==========================================
  // FETCH BOOKINGS
  // ==========================================

  useEffect(() => {
    dispatch(getMyBookings());
    dispatch(getBookingsForMyServices());
  }, [dispatch]);

  // ==========================================
  // VIEW BOOKING
  // ==========================================

  const handleViewBooking = async (booking) => {
    try {
      setSelectedBooking(booking);

      await dispatch(getBookingById(booking._id)).unwrap();

      setShowDetailModal(true);
    } catch (error) {
      console.error("Failed to fetch booking:", error);
    }
  };

  // ==========================================
  // UPDATE BOOKING
  // ==========================================

  const handleUpdateBooking = async (booking) => {
    try {
      setSelectedBooking(booking);

      await dispatch(getBookingById(booking._id)).unwrap();

      setShowUpdateModal(true);
    } catch (error) {
      console.error("Failed to fetch booking:", error);
    }
  };

  // ==========================================
  // DELETE BOOKING
  // ==========================================

  const handleDeleteBooking = (booking) => {
    setSelectedBooking(booking);
    setShowDeleteModal(true);
  };

  // ==========================================
  // CONFIRM DELETE
  // ==========================================

  const handleConfirmDelete = async () => {
    if (!selectedBooking?._id) return;

    try {
      await dispatch(deleteBooking(selectedBooking._id)).unwrap();

      // Close modal
      setShowDeleteModal(false);
      setSelectedBooking(null);

      // Refresh bookings
      dispatch(getMyBookings());
      dispatch(getBookingsForMyServices());
    } catch (error) {
      console.error("Failed to delete booking:", error);
    }
  };

  // ==========================================
  // COMPLETE BOOKING
  // ==========================================

  const handleCompleteBooking = async (booking) => {
    try {
      await dispatch(requestCompletion(booking._id)).unwrap();

      setSelectedBooking(booking);
      setShowOtpModal(true);
    } catch (error) {
      console.error("Failed to request completion:", error);
    }
  };

  // ==========================================
  // AFTER UPDATE
  // ==========================================

  const handleBookingUpdated = () => {
    setShowUpdateModal(false);
    setSelectedBooking(null);

    // Refresh both lists
    dispatch(getMyBookings());
    dispatch(getBookingsForMyServices());
  };

  const handleOpenReview = (booking) => {
    setSelectedBooking(booking);
    setShowReviewModal(true);
  };

  const handleSubmitReview = async ({ bookingId, reviewData }) => {
    try {
      await dispatch(
        addReview({
          bookingId,
          reviewData,
        }),
      ).unwrap();

      setShowReviewModal(false);
      setSelectedBooking(null);
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  // ==========================================
  // CURRENT BOOKINGS
  // ==========================================

  const bookings = activeTab === "my-bookings" ? myBookings : serviceBookings;

  // ==========================================
  // for redirect user between tabs from notification page
  // ==========================================
  useEffect(() => {
    const tab = searchParams.get("tab");

    if (tab === "my-bookings" || tab === "service-bookings") {
      setActiveTab(tab);
    }
  }, [searchParams]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-28">
      {/* ======================================
          PAGE HEADER
      ====================================== */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Bookings</h1>

        <p className="mt-2 text-gray-500">
          Manage your bookings and service requests.
        </p>
      </div>

      {/* ======================================
          BOOKING TABS
      ====================================== */}

      <BookingTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* ======================================
          LOADING
      ====================================== */}

      {loading && (
        <div className="py-16 text-center">
          <p className="text-lg font-medium text-blue-600">
            Loading bookings...
          </p>
        </div>
      )}

      {/* ======================================
          ERROR
      ====================================== */}

      {!loading && error && (
        <div className="rounded-lg bg-red-50 p-4 text-center text-red-600">
          {error}
        </div>
      )}

      {/* ======================================
          EMPTY STATE
      ====================================== */}

      {!loading && !error && bookings.length === 0 && (
        <div className="rounded-xl border border-gray-200 bg-white py-16 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">
            {activeTab === "my-bookings"
              ? "No Bookings Yet"
              : "No Service Bookings Yet"}
          </h2>

          <p className="mt-2 text-gray-500">
            {activeTab === "my-bookings"
              ? "You haven't booked any services yet."
              : "You haven't received any booking requests yet."}
          </p>
        </div>
      )}

      {/* ======================================
          BOOKING LIST
      ====================================== */}

      {!loading && !error && bookings.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <BookingCard
              key={booking._id}
              booking={booking}
              type={activeTab}
              onCompleteBooking={handleCompleteBooking}
              onViewBooking={handleViewBooking}
              onUpdateBooking={handleUpdateBooking}
              onDeleteBooking={handleDeleteBooking}
              onOpenReview={handleOpenReview}
            />
          ))}
        </div>
      )}

      {/* ======================================
          OTP VERIFICATION MODAL
      ====================================== */}

      {showOtpModal && selectedBooking && (
        <OtpVerificationModal
          bookingId={selectedBooking._id}
          onCancel={() => {
            setShowOtpModal(false);
            setSelectedBooking(null);
          }}
          onVerified={() => {
            setShowOtpModal(false);
            setSelectedBooking(null);

            // Refresh booking lists
            dispatch(getMyBookings());
            dispatch(getBookingsForMyServices());
          }}
        />
      )}

      {/* ======================================
          BOOKING DETAIL MODAL
      ====================================== */}

      {showDetailModal && (
        <BookingDetailModal
          booking={booking || selectedBooking}
          loading={loading}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedBooking(null);
          }}
          onUpdate={() => {
            setShowDetailModal(false);

            if (booking || selectedBooking) {
              setSelectedBooking(booking || selectedBooking);
            }

            setShowUpdateModal(true);
          }}
        />
      )}

      {/* ======================================
          UPDATE BOOKING MODAL
      ====================================== */}

      {showUpdateModal && (
        <UpdateBookingModal
          booking={booking || selectedBooking}
          loading={updateBookingLoading}
          onClose={() => {
            setShowUpdateModal(false);
            setSelectedBooking(null);
          }}
          onUpdated={handleBookingUpdated}
        />
      )}

      {/* ======================================
          DELETE BOOKING MODAL
      ====================================== */}

      {showDeleteModal && selectedBooking && (
        <DeleteBookingModal
          booking={selectedBooking}
          loading={deleteBookingLoading}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedBooking(null);
          }}
          onConfirm={handleConfirmDelete}
        />
      )}
      {showReviewModal && selectedBooking && (
        <RateReviewModal
          booking={selectedBooking}
          loading={reviewLoading}
          onClose={() => {
            setShowReviewModal(false);
            setSelectedBooking(null);
          }}
          onSubmit={handleSubmitReview}
        />
      )}
    </div>
  );
};

export default Bookings;
