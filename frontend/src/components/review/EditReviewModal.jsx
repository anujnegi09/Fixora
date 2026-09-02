import { useEffect, useState } from "react";
import { FaStar, FaTimes } from "react-icons/fa";

const EditReviewModal = ({
  isOpen,
  review,
  onClose,
  onSave,
  isUpdating = false,
}) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    if (review) {
      setRating(Number(review.rating) || 0);
      setReviewText(review.review || "");
    }
  }, [review]);

  if (!isOpen || !review) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!rating) {
      return;
    }

    onSave({
      reviewId: review._id,
      rating,
      review: reviewText.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">

      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">

          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Edit Review
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              Update your rating and review
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isUpdating}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 disabled:cursor-not-allowed"
          >
            <FaTimes size={14} />
          </button>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">

          {/* Service */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Service
            </p>

            <p className="mt-1 text-base font-semibold text-gray-800">
              {review.serviceId?.title ||
                review.service?.title ||
                "Service"}
            </p>
          </div>

          {/* Rating */}
          <div className="mt-6">

            <label className="text-sm font-medium text-gray-700">
              Your Rating
            </label>

            <div className="mt-3 flex items-center gap-2">

              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  disabled={isUpdating}
                  className="transition-transform hover:scale-110 disabled:cursor-not-allowed"
                >
                  <FaStar
                    size={26}
                    className={
                      star <= rating
                        ? "text-yellow-400"
                        : "text-gray-200"
                    }
                  />
                </button>
              ))}

              {rating > 0 && (
                <span className="ml-2 text-sm font-semibold text-gray-600">
                  {rating}/5
                </span>
              )}

            </div>

          </div>

          {/* Review */}
          <div className="mt-6">

            <label
              htmlFor="reviewText"
              className="text-sm font-medium text-gray-700"
            >
              Your Review
            </label>

            <textarea
              id="reviewText"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              maxLength={500}
              rows={5}
              placeholder="Write your review..."
              disabled={isUpdating}
              className="mt-2 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#6E42E5] focus:ring-2 focus:ring-[#6E42E5]/10 disabled:bg-gray-50"
            />

            <div className="mt-1 flex justify-end">
              <span className="text-xs text-gray-400">
                {reviewText.length}/500
              </span>
            </div>

          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              disabled={isUpdating}
              className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!rating || isUpdating}
              className="min-w-[100px] rounded-xl bg-[#6E42E5] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default EditReviewModal;