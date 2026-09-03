import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ReviewTabs from "../../components/review/ReviewTabs";
import ReviewCard from "../../components/review/ReviewCard";
import ConfirmDeleteReviewModal from "../../components/review/ConfirmDeleteReviewModal";
import EditReviewModal from "../../components/review/EditReviewModal";

import {
  getMyReviews,
  getMyServiceReviews,
  updateReview,
  deleteReview
} from "../../features/reviews/reviewThunks";

import {
  selectMyReviews,
  selectMyServiceReviews,
  selectReviewLoading,
} from "../../features/reviews/reviewSelectors";

const Reviews = () => {

  const [selectedReview, setSelectedReview] = useState(null);

const [showDeleteModal, setShowDeleteModal] = useState(false);

const [showEditModal, setShowEditModal] = useState(false);

const [isDeleting, setIsDeleting] = useState(false);

const [isUpdating, setIsUpdating] = useState(false); 

  const dispatch = useDispatch();

  // ==========================================
  // UI STATE
  // ==========================================

  const [activeTab, setActiveTab] = useState("my-reviews");

  // ==========================================
  // REDUX STATE
  // ==========================================

  const myReviews = useSelector(selectMyReviews);
  const myServiceReviews = useSelector(selectMyServiceReviews);

  const loading = useSelector(selectReviewLoading);

  // ==========================================
  // FETCH REVIEWS
  // ==========================================

  useEffect(() => {
    dispatch(getMyReviews());
    dispatch(getMyServiceReviews());
  }, [dispatch]);

  // ==========================================
  // CURRENT REVIEWS
  // ==========================================

  const reviews =
    activeTab === "my-reviews"
      ? myReviews
      : myServiceReviews;



  const handleDeleteReview = async () => {
  if (!selectedReview?._id) return;

  try {
    setIsDeleting(true);

    await dispatch(deleteReview(selectedReview._id)).unwrap();

    setShowDeleteModal(false);
    setSelectedReview(null);

    // Refresh reviews after successful delete
    await dispatch(getMyReviews()).unwrap();
    await dispatch(getMyServiceReviews()).unwrap();

  } catch (error) {
    console.error("Delete review failed:", error);
  } finally {
    setIsDeleting(false);
  }
};

const handleUpdateReview = async ({
  reviewId,
  rating,
  review,
}) => {
  try {
    setIsUpdating(true);

    // Update API / thunk will go here
    await dispatch(
      updateReview({
        reviewId,
         reviewData: {
          rating,
          review,
        },
      })
    ).unwrap();

    setShowEditModal(false);
    setSelectedReview(null);

    // Refresh reviews after successful update
    await dispatch(getMyReviews()).unwrap();
    await dispatch(getMyServiceReviews()).unwrap();

  } catch (error) {
    console.error("Update review failed:", error);
  } finally {
    setIsUpdating(false);
  }
};

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-28">

        <div className="flex min-h-[300px] items-center justify-center">

          <p className="text-lg font-medium text-blue-600">
            Loading reviews...
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-28">

      {/* ======================================
          PAGE HEADER
      ====================================== */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-gray-800">
          Reviews
        </h1>

        <p className="mt-2 text-gray-500">
          Manage the reviews you have given and received.
        </p>

      </div>

      {/* ======================================
          REVIEW TABS
      ====================================== */}

      <ReviewTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* ======================================
          EMPTY STATE
      ====================================== */}

      {!reviews || reviews.length === 0 && (
        <div className="rounded-xl border border-gray-200 bg-white py-16 text-center shadow-sm">

          <h2 className="text-xl font-semibold text-gray-800">

            {activeTab === "my-reviews"
              ? "No Reviews Yet"
              : "No Service Reviews Yet"}

          </h2>

          <p className="mt-2 text-gray-500">

            {activeTab === "my-reviews"
              ? "You haven't reviewed any services yet."
              : "Your services haven't received any reviews yet."}

          </p>

        </div>
      )}

      {/* ======================================
          REVIEW LIST
      ====================================== */}

      {reviews && reviews.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              type={activeTab}

              onEditReview={(review) => {
                setSelectedReview(review);
                setShowEditModal(true);
              }}

              onDeleteReview={(review) => {
                setSelectedReview(review);
                setShowDeleteModal(true);
              }}
            />
          ))}

        </div>
      )}
      <ConfirmDeleteReviewModal
  isOpen={showDeleteModal}
  review={selectedReview}
  onClose={() => {
    setShowDeleteModal(false);
    setSelectedReview(null);
  }}
  onConfirm={handleDeleteReview}
  isDeleting={isDeleting}
/>

<EditReviewModal
  isOpen={showEditModal}
  review={selectedReview}
  onClose={() => {
    setShowEditModal(false);
    setSelectedReview(null);
  }}
  onSave={handleUpdateReview}
  isUpdating={isUpdating}
/>

    </div>
  );
};

export default Reviews;