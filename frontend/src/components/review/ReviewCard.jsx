import {
  FaStar,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
} from "react-icons/fa";

import defaultAvatar from "../../assets/default-avatar-profile.png";

const ReviewCard = ({
  review,
  type,
  onEditReview,
  onDeleteReview,
}) => {
  if (!review) {
    return null;
  }

  // ==========================================
  // Review Type
  // ==========================================

  const isMyReview = type === "my-reviews";

  // ==========================================
  // Users
  // ==========================================

  const reviewer = review.reviewedBy;
  const serviceOwner = review.serviceOwner;

  // ==========================================
  // Service
  // ==========================================

  const serviceTitle =
    review.service?.title ||
    review.serviceId?.title ||
    "Service";

  // ==========================================
  // Date
  // ==========================================

  const reviewDate = review.createdAt
    ? new Date(review.createdAt)
    : null;

  const formattedDate =
    reviewDate && !isNaN(reviewDate.getTime())
      ? reviewDate.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "Not available";

  // ==========================================
  // Rating
  // ==========================================

  const rating = Math.min(
    5,
    Math.max(0, Number(review.rating) || 0)
  );

  // ==========================================
  // Person shown on card
  // ==========================================

  const person = isMyReview ? serviceOwner : reviewer;

  const personName =
    person?.fullName ||
    person?.userName ||
    (isMyReview ? "Service Provider" : "Customer");

  const personAvatar = person?.avatar || defaultAvatar;

  // ==========================================
  // Rating Label
  // ==========================================

  const ratingLabel =
    rating >= 4
      ? "Great"
      : rating >= 3
      ? "Good"
      : "Needs Improvement";

  return (
    <article className="group mt-5 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="p-5">

        <div className="flex items-start justify-between gap-4">

          {/* ==================================
              PERSON
          ================================== */}

          <div className="flex min-w-0 items-center gap-3">

            {/* Avatar */}

            <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-gray-100 ring-1 ring-gray-200">

              <img
                src={personAvatar}
                alt={personName}
                className="h-full w-full object-cover"
              />

            </div>

            {/* Person Info */}

            <div className="min-w-0">

              <p className="truncate text-sm font-semibold text-gray-800">
                {personName}
              </p>

              <p className="mt-0.5 text-xs text-gray-500">
                {isMyReview
                  ? "Service provider"
                  : "Customer"}
              </p>

            </div>

          </div>

          {/* ==================================
              ACTIONS
          ================================== */}

          {isMyReview && (
            <div className="flex shrink-0 items-center gap-1">

              {/* Edit */}

              <button
                type="button"
                onClick={() => onEditReview?.(review)}
                title="Edit review"
                aria-label="Edit review"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-all duration-200 hover:bg-gray-100 hover:text-gray-700 active:scale-95"
              >
                <FaEdit size={13} />
              </button>

              {/* Delete */}

              <button
                type="button"
                onClick={() => onDeleteReview?.(review)}
                title="Delete review"
                aria-label="Delete review"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-all duration-200 hover:bg-red-50 hover:text-red-500 active:scale-95"
              >
                <FaTrash size={13} />
              </button>

            </div>
          )}

        </div>


        {/* ======================================
            SERVICE
        ====================================== */}

        <div className="mt-5">

          <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            Service
          </p>

          <h3 className="mt-1 truncate text-base font-semibold text-gray-800">
            {serviceTitle}
          </h3>

        </div>


        {/* ======================================
            RATING
        ====================================== */}

        <div className="mt-4 flex items-center justify-between">

          {/* Stars */}

          <div className="flex items-center gap-1">

            <div className="flex items-center gap-0.5">

              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={14}
                  className={
                    star <= rating
                      ? "text-yellow-400"
                      : "text-gray-200"
                  }
                />
              ))}

            </div>

            <span className="ml-1 text-sm font-semibold text-gray-700">
              {rating.toFixed(1)}
            </span>

            <span className="text-xs text-gray-400">
              / 5
            </span>

          </div>

          {/* Rating Badge */}

          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
              rating >= 4
                ? "bg-green-50 text-green-600"
                : rating >= 3
                ? "bg-yellow-50 text-yellow-600"
                : "bg-red-50 text-red-500"
            }`}
          >
            {ratingLabel}
          </span>

        </div>


        {/* ======================================
            REVIEW
        ====================================== */}

        <div className="mt-5 rounded-xl bg-gray-50 px-4 py-3.5">

          <p className="text-sm leading-6 text-gray-600">
            {review.review ? (
              <>
                <span className="mr-1 text-lg font-semibold text-gray-300">
                  “
                </span>

                {review.review}

                <span className="ml-1 text-lg font-semibold text-gray-300">
                  ”
                </span>
              </>
            ) : (
              <span className="italic text-gray-400">
                No review provided.
              </span>
            )}
          </p>

        </div>

      </div>


      {/* ======================================
          FOOTER
      ====================================== */}

      <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/50 px-5 py-3.5">

        {/* Date */}

        <div className="flex items-center gap-2 text-xs text-gray-400">

          <FaCalendarAlt size={11} />

          <span>
            {formattedDate}
          </span>

        </div>

        {/* Context */}

        <span className="text-[11px] text-gray-400">
          {isMyReview
            ? "Your review"
            : "Customer review"}
        </span>

      </div>

    </article>
  );
};

export default ReviewCard;