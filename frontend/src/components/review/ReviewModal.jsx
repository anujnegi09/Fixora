import { useState } from "react";
import { FaStar, FaTimes } from "react-icons/fa";
import Button from "../common/Button";

const RateReviewModal = ({
  booking,
  loading = false,
  onClose,
  onSubmit,
}) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = () => {
    if (!rating) return;

    onSubmit({
      bookingId: booking._id,
      reviewData: {
        rating,
        review: review.trim(),
      },
    });
  };

  return (
    <div
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-black/40
        px-4
        backdrop-blur-md
      "
      onClick={onClose}
    >
      <div
        className="
          relative w-full max-w-md
          rounded-2xl
          border border-gray-100
          bg-white
          shadow-2xl
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}

        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="
            absolute right-4 top-4
            flex h-9 w-9
            items-center justify-center
            rounded-full
            text-gray-400
            transition
            hover:bg-gray-100
            hover:text-gray-700
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
          aria-label="Close"
        >
          <FaTimes size={15} />
        </button>

        {/* Header */}

        <div className="px-6 pb-6 pt-8 sm:px-8">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900">
              Rate Your Service
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              How was your experience with this service?
            </p>

            {booking?.serviceId?.title && (
              <p className="mt-1 text-sm font-semibold text-[#6E42E5]">
                {booking.serviceId.title}
              </p>
            )}
          </div>

          {/* Rating */}

          <div className="mt-7">
            <p className="mb-3 text-center text-sm font-semibold text-gray-700">
              Your Rating
            </p>

            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const filled =
                  (hoverRating || rating) >= star;

                return (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    disabled={loading}
                    className="
                      p-1
                      transition
                      duration-150
                      hover:scale-110
                      disabled:cursor-not-allowed
                    "
                    aria-label={`Rate ${star} star${
                      star > 1 ? "s" : ""
                    }`}
                  >
                    <FaStar
                      size={30}
                      className={
                        filled
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  </button>
                );
              })}
            </div>

            <p className="mt-2 text-center text-xs text-gray-400">
              {rating
                ? `${rating} out of 5`
                : "Select a rating"}
            </p>
          </div>

          {/* Review */}

          <div className="mt-6">
            <label
              htmlFor="review"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Your Review
              <span className="ml-1 font-normal text-gray-400">
                (optional)
              </span>
            </label>

            <textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              disabled={loading}
              rows={4}
              maxLength={500}
              placeholder="Share your experience..."
              className="
                w-full
                resize-none
                rounded-xl
                border border-gray-200
                bg-gray-50
                px-4 py-3
                text-sm
                text-gray-800
                outline-none
                transition
                placeholder:text-gray-400
                focus:border-[#6E42E5]
                focus:bg-white
                focus:ring-2
                focus:ring-[#6E42E5]/10
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            />

            <div className="mt-1 text-right text-xs text-gray-400">
              {review.length}/500
            </div>
          </div>

          {/* Actions */}

          <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="
                w-full
                rounded-xl
                border border-gray-200
                bg-white
                px-5 py-3
                text-sm font-semibold
                text-gray-700
                transition
                hover:bg-gray-50
                disabled:cursor-not-allowed
                disabled:opacity-50
                sm:w-auto
              "
            >
              Cancel
            </button>

            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!rating || loading}
              loading={loading}
              loadingText="Submitting..."
              variant="subscription"
              size="md"
              className="w-full sm:w-auto"
            >
              Submit Review
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateReviewModal;